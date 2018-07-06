import fetch from 'node-fetch'
const dotenv = require('dotenv').config()

// see https://stackoverflow.com/questions/44610310/node-fetch-post-request-using-graphql-query
// and see https://stackoverflow.com/questions/34385499/how-to-create-json-object-node-js
const GithubGraphQLSearch = {
  getRepos(args) {
    const query = `
    query($number_of_repos:Int!) {
      search(first: $number_of_repos, type: REPOSITORY, query: "created:<2008-06-30 sort:updated") {
        nodes {
          ... on Repository {
            name
            id
            owner {
              login
              avatarUrl
              ... on User {
                name
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
    }`

    const variables = {
      number_of_repos: args.count
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
        id : repoIteration.id,
        owner : passedOwner
      }
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
      return {
        count: args.count,
        repos: () => results.map(dataTransformer)
      } 
    })
    .catch((e) => {
      console.log(e)
    })
  }
};




export { GithubGraphQLSearch };