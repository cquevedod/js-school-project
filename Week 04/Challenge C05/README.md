# Challenge 05
### BookShelf

### Mustache library was used to render the books dynamically. The rest of things were made with Vanilla JS.

**Info about files** 
JSON model is stored in `books.json` 

The Script to get the info from the API is `getBookInfo.js`

The Script to render the books is `renderBook.js`, Mustache library was used in this file.

**Steps to compile files**

- First, Please do a `npm install` in order to install all the dependencies needed.

- If you want get the data from API, compile and watch the js and sass files into dist folder, make a `npm run build`

- You can make `npm run get-info` or `node ./getBookInfo.js` to request the data from the Google Books API.

- If you want only generate the dist folder with compiled files do a `npm run gulp`. If you prefer compile the only js files do a `gulp js` or `gulp sass` for sass files.

- You can watch js and sass files with `gulp watch`

Sass files are located in src/styles

The Es5 file referenced in index.html is app.min.js

### Info about Books data

After make `npm run build` books will rendered in the bookshelf. Ten books about FANTASY and DRAMA. 

If you dont have an APi key, the script was made to work without it. But if you want work with an API key, please replace in getBookInfo.js, this code snippet between six and ten: 

`let topics = ["FANTASY", "DRAMA"];
function concatenate(url, ...themes) {
  return themes.map(element => ``${url}${element}``);
}`

and put the following code snippet with your API key 

`let key = "";
function concatenate(url, ...themes) {
  return themes.map(element => ``${url}${element}&maxResults=30&key=${key}``);
}`

Please just remove the extra backsticks.

ES6 code and Sass files were transpiled using Babel. Gulp was used for monitoring those files. 



