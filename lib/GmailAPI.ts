import axios from "axios";
import Oath2Auth from "./auth";
import { Credentials } from "./auth";

export default class GmailAPI extends Oath2Auth {
  private accessToken = this.getAccessToken().then((res) => {
    this.accessToken = res;
    return this.accessToken;
  });
  //Tạo accessToken, mục đích mỗi lần gọi method nào cũng phải có accessToken trước

  //Super từ auth.ts
  constructor(info: Credentials) {
    super(info);
  }
  debug = async () => {
    this.accessToken = await this.getAccessToken();
    /*Vì kế thừa trên abstract class nên gọi bằng cách this.method()*/
    return this.accessToken;
  };

  getListMailByQuery = async (searchItem: string) => {
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

  getEmailID = async (searchItem: string, threadId?: string) => {
    var config = {
      method: "get",
      url:
        "https://www.googleapis.com/gmail/v1/users/me/messages?q=" + searchItem,
      headers: {
        Authorization: `Bearer ${await this.accessToken} `,
      },
    };
    await axios(config)
      .then(async function (response) {
        threadId = await response.data["messages"][0].id;
      })
      .catch(function (error) {
        console.log(error);
      });
    return threadId;
  };
  //v0.2 search mail, return the first email ID (thread ID) from the query

  readGmailContent = async (messageId: string, data?) => {
    var config = {
      method: "get",
      url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
      headers: {
        Authorization: `Bearer ${await this.accessToken}`,
      },
    };
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

  readInboxContent = async (searchText: string) => {
    const threadId = await this.getEmailID(searchText);
    const message = await this.readGmailContent(threadId);
    return message;

    // const encodedMessage = await message.payload.parts[0].parts[0].body.data;
    // const decodedStr = Buffer.from(encodedMessage, "base64").toString("ascii");
    // console.log(decodedStr);
    // return decodedStr;
    // Body mail dạng base64, cần convert lại string
    // console.log(encodedMessage);
    // return encodedMessage;
  };
  //Parse the message and return the expect body
}
