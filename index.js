const express = require('express');
const path = require('path');
const port = process.env.PORT || 1337;
const app = express();

const rootDirectory = path.join(__dirname, 'build');

// serve static assets normally
app.use(express.static(rootDirectory));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
  response.sendFile(path.resolve(rootDirectory, 'index.html'));
});

app.listen(port, function callback(error) {
  
  if(error) {
    return console.error(error);
  }

  console.log('Server is running on ', port);

});