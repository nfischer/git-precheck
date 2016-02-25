#!/usr/bin/env node
require('shelljs/global');
yaml = require('js-yaml');
fs   = require('fs');

// Change to the root of the repo
while (!test('-d', '.git/') && pwd().toString() !== '/')
  cd('..');

if (pwd().toString === '/') {
  console.error('This is not a git repo');
  exit(1);
}

var isNode = test('-f', 'package.json');
var isC = test('-f', 'Makefile');
var hasTravis = test('-f', '.travis.yml');

// -- No errors (for a while) --
config.fatal = true;

// Install dependencies
if (isNode) {
  echo('Installing node dependencies');
  exec('npm install');
}

// Install dependencies
var ci = {};
var ciFile;
if (hasTravis)
  ciFile = '.travis.yml';
// TODO(nate): add support for appveyor

if (ciFile) {
  echo('Extracting build steps from ' + ciFile);
  try {
    ci = yaml.safeLoad(fs.readFileSync(ciFile, 'utf8'));
  } catch (e) {
    console.error('Unable to read ' + ciFile);
  }
}

if (!ci.script) {
  echo('Warning: could not find any build steps. Using defaults.');
  if (isNode)
    ci.script = ['npm test'];
  else if (isC)
    ci.script = ['./configure', 'make', 'make test'];
  else // last resort
    ci.script = [];
}

// -- Now let's catch the errors and report them --
config.fatal = false;

var results = {};
ci.script.forEach(function (cmd) {
  if (!cmd)
    return;
  if (cmd.match(/^#.*$/))
    return;
  results[cmd] = exec(cmd).code;
});

var ret_code = 0;
echo('\nSummary of build steps:');
for (var cmd in results) {
  var checkmark = '\u221A';
  var frownyface = '\u2639';
  var unicode_indicator = results[cmd] === 0 ? checkmark : frownyface;
  echo(unicode_indicator + '  $ ' + cmd);
  ret_code += results[cmd];
}
exit(ret_code);
