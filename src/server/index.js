const express = require('express'),
      app     = express(),
      db      = require('./db'),
      port    = 4000;

app.listen(port);
console.log("Listening on port", port);
