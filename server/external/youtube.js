const {google} = require('googleapis');
let config = require('../../config');

const oauth2Client = new google.auth.OAuth2(
  config.youtube.client_id,
  config.youtube.client_secret,
  config.youtube.redirect_uri,
);

const getChannels = async () => {
    const model = require('../../common/index');
    let tokens = model().get('base.oauth_tokens');
    let docTokens = await tokens.find({'user_id': '5dec9d3297553c1adc83f905'});

    oauth2Client.setCredentials(docTokens[0]);
    const youtube = google.youtube({
        version: 'v3',
        auth: oauth2Client
    });

    const res = await youtube.subscriptions.list({
        part: 'id,snippet',
        mine: true
    });
    console.log(res.code);
    return res.data;
}

module.exports = {
    getChannels
};
