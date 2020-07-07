const {google} = require('googleapis');
let config = require('../../config');

const oauth2Client = new google.auth.OAuth2(
  config.youtube.client_id,
  config.youtube.client_secret,
  config.youtube.redirect_uri,
);

const getSubscriptions = async () => {
    const model = require('../../common/index');
    let tokens = model().get('base.oauth_tokens');
    let docTokens = await tokens.find({'user_id': '5dec9d3297553c1adc83f905'});

    oauth2Client.setCredentials(docTokens[0]);
    const youtube = google.youtube({
        version: 'v3',
        auth: oauth2Client
    });

    let totalCount = 0;
    let perPage = 50;
    let data = [];
    let pageToken = null;
    do {
        let params = {
            part: 'id,snippet',
            mine: true,
            maxResults: perPage
        };
        // пагинация
        if (pageToken) {
            params.pageToken = pageToken;
        }

        let res = await youtube.subscriptions.list(params);
        pageToken = res.data.nextPageToken || null;
        totalCount = totalCount || res.data.pageInfo.totalResults;
        data = data.concat(res.data.items);

    } while (totalCount > data.length);

    return data;
};

module.exports = {
    getSubscriptions
};
