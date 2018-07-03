import fetch from 'node-fetch';

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
const GithubGraphQL = {
  getRepos() {
    const query = `
    {
      search(first: 10, type: REPOSITORY, query: "created:<2008-06-30 sort:updated") {
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
      first: 3
    }

    return fetch('https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({query, variables})
    })
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch((e) => {
      console.log(e)
    })
  }
};

export { FortuneCookie };