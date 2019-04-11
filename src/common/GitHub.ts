import * as req from "request-promise-native";

export class GitHub {
  async getRepos(): Promise<any> {
    return req.get("http://localhost:31056/repo")
      .then(function (data: JSON) {
        return data;
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}
