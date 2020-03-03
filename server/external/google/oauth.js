const {youtube} = require('../../../config');
const {google} = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  youtube.client_id,
  youtube.client_secret,
  youtube.redirect_uri,
);

const scopes = [
  'https://www.googleapis.com/auth/youtube.readonly',
];

// урл для запроса кода авторизации
// const url = oauth2Client.generateAuthUrl({
//  // 'online' (default) or 'offline' (gets refresh_token)
//  access_type: 'offline',
//  scope: scopes
// });
// console.log(url);
// return;

const code = '4/xAGH8JsCPoFdtoBo5q0mUxBEaxJxtLMBJSSk-fTSTNhd8FLZFjsZrHXBpeUWif9cHiqOh3dY4QVtEM935gHQRKc';

// получение токенов по коду авторизации
async function getTokens() {
  const {tokens} = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  console.log(tokens);
}
getTokens().catch(console.error);

return;

// так хэндлим обновление токенов
oauth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    // store the refresh_token in my database!
    console.log(tokens.refresh_token);
    oauth2Client.setCredentials({
       refresh_token: `STORED_REFRESH_TOKEN`
    });
  }
  console.log(tokens.access_token);
});

// установим авторизацию глобально ...
google.options({
  auth: oauth2Client
});
// ... или для конкретного сервиса
const drive = google.drive({
  version: 'v2',
  auth: oauth2Client
});
