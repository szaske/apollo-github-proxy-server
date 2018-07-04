import fetch from 'node-fetch'
const dotenv = require('dotenv').config()


// 3rd party example
const FortuneCookie = {
  getOne() {
    return fetch('http://fortunecookieapi.herokuapp.com/v1/cookie')
      .then(res => res.json())
      .then(res => {
        return res[0].fortune.message;
      });
  },
};

// see https://stackoverflow.com/questions/44610310/node-fetch-post-request-using-graphql-query
// and see https://stackoverflow.com/questions/34385499/how-to-create-json-object-node-js
const GithubGraphQL = {
  getRepos() {
    const query = `
    {
      search(first: 40, type: REPOSITORY, query: "created:<2008-06-30 sort:updated") {
        nodes {
          ... on Repository {
            name
            owner {
              login
              avatarUrl
              ... on User {
                followers(first: 5) {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
    `

    const variables = {
    }

    const dataTransformer = (repoIteration) => {
      // map logic goes here
    
      // reduce follower info to a single string
      var passedFollowers = () => {
        if(repoIteration.owner.followers==null){
          return "none"
        } else {
          return (repoIteration.owner.followers.nodes)
            .map(function(follower){
              return follower.name
            }).join(", ")+"..."
        }
      } 

      // get owner info
      var passedOwner = {
        login : repoIteration.owner.login,
        avatarUrl : repoIteration.owner.avatarUrl,
        followers : passedFollowers
      }

      return {
        name : repoIteration.name,
        owner : passedOwner
      }

      const followers = data.data.search.nodes.owner.followers.nodes;
      const owner = {
        login : data.data.search.nodes.owner.login,
        avatarUrl : data.data.search.nodes.owner.avatarUrl
      };
    }

    return fetch('https://api.github.com/graphql', {
      method: 'post',
      headers: {
        Authorization: `bearer ${
          process.env.GITHUB_TOKEN
        }`,
      },
      body: JSON.stringify({query, variables})
    })
    .then(response => response.json())
    .then(data => {      
      var results = data.data.search.nodes 
      return results.map(dataTransformer)
    })
    .catch((e) => {
      console.log(e)
    })
  }
};

export { FortuneCookie, GithubGraphQL };