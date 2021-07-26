const https = require('https');
const path = require('path');
const fs = require('fs');

const screepsConfigurationFile = './screeps.json';
const sourceCodeDirectory = './output';

const config = JSON.parse(fs.readFileSync(screepsConfigurationFile).toString());

const modules = fs
  .readdirSync(sourceCodeDirectory)
  .map(name => fs.realpathSync(path.resolve(sourceCodeDirectory, name)))
  .filter(entry => fs.statSync(entry).isFile())
  .filter(filePath => filePath.toLowerCase().endsWith('.js'))
  .reduce((result, filePath) => {
    const fileContent = fs.readFileSync(filePath).toString();
    const fileName = path.basename(filePath).replace(/\.js$/, '');
    result[fileName] = fileContent;
    return result;
  }, {});

const req = https.request({
  hostname: config.hostname,
  port: config.port,
  path: '/api/user/code',
  method: 'POST',
  auth: config.email ? config.email + ':' + config.password : undefined,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

req.write(
  JSON.stringify({
    branch: config.branch,
    modules
  })
);

req.end();
