const fs = require('fs');
const { google } = require('googleapis');

const CREDENTIALS_PATH = "./credentials.json";
const TOKEN_PATH = "./token.json";
// const CREDENTIALS_PATH = "Newsletter/credentials.json";
// const TOKEN_PATH = "Newsletter/token.json";

function buildGmailClient() {
    let credentials_file = CREDENTIALS_PATH;
    let token_file = TOKEN_PATH;

    const credentials = fs.readFileSync(credentials_file);
    const token = fs.readFileSync(token_file);
    const oauthClient = buildOAuthClient(makeCredentials(credentials, token));

    return google.gmail({ version: 'v1', auth: oauthClient });
}

function makeCredentials(credentials, token) {
    return {
        params: JSON.parse(credentials).installed,
        token: JSON.parse(token),
    };
}

function buildOAuthClient(credentials) {
    const oAuth2Client = new google.auth.OAuth2(
        credentials.params.client_id,
        credentials.params.client_secret,
        credentials.params.redirect_uris[0]
    );
    oAuth2Client.setCredentials(credentials.token);
    return oAuth2Client;
}

module.exports = buildGmailClient;