Alexa-Bassdrive
============

Currently checks Electronic Warfare for updates to The Overfiends archives.

Demo
--------

https://bassdrive-archive.herokuapp.com

Usage
---------
Current support for this app is:

* UpdateCheck - Check for updates on the archive.
    * "Alexa, open bass drive and check for updates".

Development
------------------
```bash
$ git clone <repo url> /path/to/dump/repo
$ cd /path/to/repo

# Set environment variable for development temporarily in Mac OSX/Linux
$ export NODE_ENV=development
# or temporarily on Windows
$ set NODE_ENV=development
# or permanently on MAC OSX
$ echo "export NODE_ENV=development" >> vim ~/.profile
# or permanently on Linux
$ echo "export NODE_ENV=development" >> vim ~/.bashrc

# Install server-side dependencies
$ npm install

# Development server startup
$ grunt

# Open browser to http://localhost:3000

# Start coding! :D
```

License
----------
* [MIT](http://brutalhonesty.mit-license.org/)
* [TL;DR](https://tldrlegal.com/license/mit-license)


