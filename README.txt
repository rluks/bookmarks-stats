Setting up Firefox extension development in Typescript on Windows

Install NodeJS LTS
https://nodejs.org/en/

Note: npm installations need cmd with admin rights.

Install web-ext
https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/
npm install --global web-ext

Install Typescript:
npm install -g typescript

Install web-ext-types
https://github.com/kelseasy/web-ext-types
TypeScript type definitions for WebExtensions, based on MDN's documentation.
via cmd in the extension folder:
npm install
(as it is defined in package-lock.json)
or like this:
npm install --save-dev web-ext-types
(not sure if there is any difference)

Install windows-build-tools
https://www.npmjs.com/package/windows-build-tools/v/3.0.0-beta.3
On Windows? Want to compile native Node modules? 
Install the build tools with this one-liner:
npm install --global --production windows-build-tools 
(takes a while to install)(it takes a long long time)
(do I need this?)

For compiling TypeScript to JavaScript 
type in cmd in the extension folder:
tsc -w 

I'm getting 4 errors but the extension works fine
src/background.ts:17:5 - error TS2304: Cannot find name '_'.

17     _.debounce(countBookmarks, bounceDelay, {'leading': true,
       ~

src/background.ts:75:41 - error TS2304: Cannot find name '_'.

75 browser.bookmarks.onCreated.addListener(_.debounce(onBookmarkCreated, bounceDelay, {'leading': true,
                                           ~

src/background.ts:78:41 - error TS2304: Cannot find name '_'.

78 browser.bookmarks.onRemoved.addListener(_.debounce(onBookmarkRemoved, bounceDelay, {'leading': true,
                                           ~

src/script.ts:178:25 - error TS2304: Cannot find name 'Chart'.

178   var myLineChart = new Chart(ctx, {
                            ~~~~~

[9:35:24 PM] Found 4 errors. Watching for file changes.

For launching extension type in cmd:
web-ext run
