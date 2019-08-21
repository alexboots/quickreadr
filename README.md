# Read Quickr

Speed reading site built with [React](https://reactjs.org/) + [gatsby](https://www.gatsbyjs.org/) + [Grommet](https://v2.grommet.io/)

Live: https://readquickr.com/
I bought the wrong url so thats why the repo is quickreadr and the url is readquickr

Todo:
* Break things down into smaller components
* Add ability to scroll back through text
* Save text feature? (could save text to localhost display saved articles)
* Add icons
* Meditate
* Breath
* Laydown
* Relax
* Go to sleep


[![Netlify Status](https://api.netlify.com/api/v1/badges/b654c94e-08a6-4b79-b443-7837581b1d8d/deploy-status)](https://app.netlify.com/sites/gatsby-starter-netlify-cms-ci/deploys)

### Access Locally
```
$ git clone https://github.com/[GITHUB_USERNAME]/[REPO_NAME].git
$ cd [REPO_NAME]
$ yarn
$ npm run develop
```
To test the CMS locally, you'll need run a production build of the site:
```
$ npm run build
$ npm run serve
```

## Debugging
Windows users might encounter ```node-gyp``` errors when trying to npm install.
To resolve, make sure that you have both Python 2.7 and the Visual C++ build environment installed.
```
npm config set python python2.7
npm install --global --production windows-build-tools
```

[Full details here](https://www.npmjs.com/package/node-gyp 'NPM node-gyp page')
