Git Precommit
=============

Installation
------------

First, make sure you have a functioning version of NodeJS installed.

Symlink `git-precommit.js` to a folder in your path (i.e. `~/bin`). Make sure to
run `npm install` inside the git repo before continuing!

Usage
-----

You can use this from within any git directory to run basic-prechecks before
making a commit:

```Bash
$ git-precommit.js
Installing node dependencies
Extracting build steps from travis

> shelljs@0.5.3 test /home/...
> node scripts/run-tests

# output of your commands...

Summary of build steps:
√  $ npm test
√  $ node scripts/generate-docs.js
√  $ git diff --quiet # make sure no files have changed
```

What commands does it choose to run? Well, it aims to run whatever Travis CI
would attempt to run. How does it decide? Read below...

Setting up the git alias
------------------------

But wait, there's more! This is even cooler when you sync it into git:

```Bash
# Setting it up...
$ git config --global alias.precommit '!git-precommit.js'
# or if you want to save some typing...
$ git config --global alias.pc '!git-precommit.js'

# This allows you to use it like..
$ git precheck
$ git pc
```

Integrating within vim
----------------------

But wait, there's *even more*! If you're a
[fugitive](https://github.com/tpope/vim-fugitive) user, then you get
vim-integration *for free*. You can run prechecks from within vim using:

```Vim
:Git precommit " or if you were smart and made the short alias...
:Git pc
```

If you're not a fugitive user (but really, why not?) then you can use it like
this:

```Vim
:!git-precommit.js " or...
:!git precommit    " or...
:!git pc
```

Travis CI Compatibility
-----------------------

Yup! It works with Travis as well. If you have a `.travis.yml` file in your
repo, it will attempt to read the `script` steps from the file and execute those
sequentially, just like Travis would. Now you can know if your PR will pass
**before** you push it :+1:

Windows Compatibility???
------------------------

Alright, so Windows compatibility isn't my biggest priority. I mainly run off
Ubuntu Linux. But this all runs in NodeJS (via
[ShellJS](https://github.com/shelljs/shelljs), so this should hypothetically be
compatible with Windows too! And it it isn't, drop me a line and let me know.

Bugs?
-----

If you find any bugs (believe me, they're in there), please feel free to submit
a PR or file a Github issue. And if you find the tool useful, let me know!
