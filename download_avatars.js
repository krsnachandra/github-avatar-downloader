const request = require('request');
const secret = require('./secrets.js');
const fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

const args = process.argv.slice(2);

function getRepoContributors(repoOwner, repoName, cb) {
  if (args.length === 0) {
    console.log('Make sure to include the owner and repository in your request! (node download_avatars.js <owner> <repo>)');
  } else {
    var options = {
      url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
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
}

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath));
}

function printAvatarURLs(contribArr) {
  contribArr.forEach(function(contributor) {
    downloadImageByURL(contributor['avatar_url'], './avatars/' + contributor.login + '.jpeg');
  });
}

getRepoContributors(args[0], args[1], printAvatarURLs);