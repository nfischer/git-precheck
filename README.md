git-precheck
============

Installation
------------

```bash
$ npm install -g git-precheck
```

Usage
-----

You can use this from within any git directory to run basic pre-checks before
making a commit:

```Bash
$ git precheck
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

Integrating within vim
----------------------

But wait, there's more! If you're a
[fugitive](https://github.com/tpope/vim-fugitive) user, then you get
vim-integration *for free*. You can run prechecks from within vim using:

```Vim
:Git precheck " or if you were smart and made the short alias...
```

If you're not a fugitive user (but really, why not?) then you can use it like
this:

```Vim
:!git precheck
```

Travis CI Compatibility
-----------------------

Yup! It works with Travis as well. If you have a `.travis.yml` file in your
repo, it will attempt to read the `script` steps from the file and execute those
sequentially, just like Travis would. Now you can know if your PR will pass
**before** you push it :+1:

Windows Compatibility???
------------------------

Windows compatibility isn't my biggest priority, but it should still be there.
If it isn't, drop me a line and let me know.
