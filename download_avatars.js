const request = require('request');

const secret = require('./secrets.js');



console.log('Welcome to the GitHub Avatar Downloader!');
// console.log(secret.GITHUB_TOKEN);

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secret.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    let parsedBody = JSON.parse(body);
    cb(parsedBody);
  });
}

function printAvatarURLs(contribArr) {
  contribArr.forEach(function(contributor) {
    console.log(contributor['avatar_url']);
  })
};

getRepoContributors("jquery", "jquery", printAvatarURLs);
  // console.log("Errors:", err);
  // console.log("Result:", result);
