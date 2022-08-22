# NodeJS_GetMail
# Library used: axios.js, qs.js
API need 3 params: client_id; client_secret; refresh_token
Client_id, client_secret get from Google Cloud to generate AccessToken for query

Refresh_token get from Oath2Auth Manually by approve request App accees to your Google account

This library have 2 files: auth.ts, GmailAPI.ts in folder 'lib'

Doc refer:
1. Rest API Gmail
https://developers.google.com/gmail/api/reference/rest

2. OAuth 2.0 Google
https://developers.google.com/identity/protocols/oauth2
