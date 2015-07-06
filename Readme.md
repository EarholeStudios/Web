# Earhole Studios

Welcome to the source code for [Earhole Studios.com](http://earholestudios.com). It's boring and deeply technical, but never fear. This document will guide you through the jungle of HTML, CSS, and JavaScript with a calm hand and relaxed attitude.

Shall we begin?

## Prerequisites

You'll need to install Node.js and Git (if you don't already have it) before working on the website. To get started, install [Homebrew](http://brew.sh) on your Mac. Then, run the following commands:

```
brew install node
brew install git
```

## Developing

Once that's handled (and you can successfully run the ```node``` command in your terminal), clone this repository and install the required dependencies. Again, here is an example of how you might handle this in the terminal:

```
git clone git@github.com/earholestudios/web.git
cd web
npm install
gulp clean
gulp dev
```

```gulp clean``` will scrub the ```build/``` directory and remove any previous files that might have been deployed to the web server. ```gulp dev``` generates a new copy of the files that comprise the site.

Now, open your browser and navigate to [localhost:9292](http://localhost:9292), where you will see the Earhole website, displayed on a local HTTP server.

Then in a separate tab, open the source code in your preferred editor (like [Atom](http://atom.io)).

**NOTE:**

Before building the site, you will need a Server API Key for the YouTube API. Visit the [Google Developer Console](https://console.developers.google.com/project) for more information.

Once you have a YouTube API key, create a file in the root directory of this project named ```.env```. Add your API key to it:

```
YOUTUBE_API_KEY=YourAPIKey
```

After saving, you can re-run ```gulp dev``` to build the site (including the Reel page, which will now have content).

## Deploying

Once you're finished making edits, run:

```
gulp clean
gulp build
```

Again, ```gulp clean``` will remove any stale data from the ```build/``` directory. Then, ```gulp build``` generates a fresh copy of the site, complete with any changes that you've made, ready for deployment.

## Documentation

All HTML files in the ```src/``` directory use [Nunjucks](https://mozilla.github.io/nunjucks), an template system from Mozilla, to output HTML into the ```build/``` directory. The language used in these files should be self-explanatory, but if not, additional resources are located at the URL linked above.

[Acetate](http://acetate.io) constructs the various pages of the website, and is configured using ```config/acetate.js```.

## License

&copy; Copyright 2015 Earhole Studios. All rights reserved. Unauthorized duplication or usage is strictly prohibited.
