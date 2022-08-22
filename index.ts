import GmailAPI from "./lib/GmailAPI";
import * as data from "./credentials.json";

//Khởi tạo
const logMsg = async () => {
  const newAPI = new GmailAPI({
    clientID: data.client_id,
    clientSecret: data.client_secret,
    refreshToken: data.refresh_token,
  });
  const msg = await newAPI.readInboxContent("OCG");
  console.log(msg);
};
//Run
logMsg();
