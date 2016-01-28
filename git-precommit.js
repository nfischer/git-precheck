#!/usr/bin/env node
require('shelljs/global');

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
var buildSteps;

// -- No errors (for a while) --
config.fatal = true;

// Install dependencies
if (isNode) {
  echo('Installing node dependencies');
  exec('npm install');
}

// Install dependencies
if (hasTravis) {
  echo('Extracting build steps from travis');
  buildSteps = cat('.travis.yml').replace(/^(.|\n)*script: *\n/, '').replace(/\n[a-z](.|\n)*/, '').split('\n');
  buildSteps = buildSteps.map(function(step) {
    return step.replace(/^ *- */, '').trim();
  });
}

if (!buildSteps) {
  echo('Warning: could not find any build steps. Using defaults.');
  if (isNode)
    buildSteps = ['npm test'];
  else if (isC)
    buildSteps = ['./configure', 'make', 'make test'];
  else // last resort
    buildSteps = [];
}

// -- Now let's catch the errors and report them -- 
config.fatal = false;

var results = {};
buildSteps.forEach(function (cmd) {
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
