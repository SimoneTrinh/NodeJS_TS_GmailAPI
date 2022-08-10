var axios = require("axios");
var qs = require("qs");

class GmailAPI {
  accessToken = "";
  constructor() {
    this.accessToken = this.getAccessToken();
  }
  //Public accessToken variables

  getAccessToken = async () => {
    var data = qs.stringify({
      client_id:
        "1014068986602-cm6ltthr3krtkeh40on43u8dopuk5i66.apps.googleusercontent.com",
      client_secret: "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",
      refresh_token:
        "1//0eoj3D2VLQMmoCgYIARAAGA4SNwF-L9IrvAmwhb-1C9RXS_tCmzjPE4MhOEk-zl_2Ol63N2f4UsjflMZ10tcV-3G_6ScAIM7_ryE",
      grant_type: "refresh_token",
    });
    var config = {
      method: "post",
      url: "https://accounts.google.com/o/oauth2/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    let accessToken = "";
    await axios(config)
      .then(function (response) {
        accessToken = response.data.access_token;
        console.log("Access token: " + accessToken);
      })
      .catch(function (error) {
        console.log(error);
      });
    return accessToken;
  };
  //Get access token each time need to request (must run first)

  searchMail = async (searchItem) => {
    var config = {
      method: "get",
      url:
        "https://gmail.googleapis.com/gmail/v1/users/me/messages?q=" +
        searchItem,
      headers: {
        Authorization: `Bearer ${await this.accessToken}`,
      },
    };
    await axios(config)
      .then(function (response) {
        console.log("Search Results:" + JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //v0.1 search mail, return all mail related to this query

  searchMmail_01 = async (searchItem) => {
    var config = {
      method: "get",
      url:
        "https://www.googleapis.com/gmail/v1/users/me/messages?q=" + searchItem,
      headers: {
        Authorization: `Bearer ${await this.accessToken} `,
      },
    };
    var threadId = "";

    await axios(config)
      .then(async function (response) {
        threadId = await response.data["messages"][0].id;
        console.log("ThreadId = " + threadId);
      })
      .catch(function (error) {
        console.log(error);
      });
    return threadId;
  };
  //v0.2 search mail, return the first email ID from the query

  readGmailContent = async (messageId) => {
    var config = {
      method: "get",
      url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
      headers: {
        Authorization: `Bearer ${await this.accessToken}`,
      },
    };
    var data = {};
    await axios(config)
      .then(async function (response) {
        data = await response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return data;
  };
  //Read content from exact therad ID

  readInboxContent = async (searchText) => {
    const threadId = await this.searchMmail_01(searchText);
    const message = await this.readGmailContent(threadId);
    const encodedMessage = await message.payload.parts[0].parts[0].body.data;
    const decodedStr = Buffer.from(encodedMessage, "base64").toString("ascii");
    console.log(decodedStr);
    return decodedStr;

    // console.log(encodedMessage);
    // return encodedMessage;
  };
  //Parse the message and return the expect body
}
module.exports = new GmailAPI();

// export module to use in index.js
