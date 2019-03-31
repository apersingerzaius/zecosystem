import * as req from "request-promise-native";
import config from"../config/default.json";

export class GitHub {
  options = {
    uri: 'https://api.github.com/orgs/zaiusinc/repos?page=1&per_page=100',
    qs: {
      access_token: config.token
    },
    headers: {
      'User-Agent': 'Request-Promise',
      'Accept': 'application/vnd.github.v3+json'
    },
    json: true // Automatically parses the JSON string in the response
  };

  async getRepos(): Promise<void> {
    console.log(config);
    let r1 = "";
    await req(this.options)
      .then(function (repos) {
        console.log('How many repos? %', repos.length);
        console.log(repos[0]);
      })
      .catch(function (err) {
        console.log(err);
      });
    console.log(r1)
  }
}