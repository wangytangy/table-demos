import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
  <MuiThemeProvider><App /></MuiThemeProvider>,
  document.getElementById('root')
);


// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('./worker/sw.js')
//     .then((registration) => {
//       console.log('service worker registered!');
//     })
//     .catch((err) => {
//       console.log('service worker registration failed', err);
//     })
// }
