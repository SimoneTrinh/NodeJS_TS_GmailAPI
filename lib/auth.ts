import axios from "axios";
import qs from "qs";

export type Credentials = {
  clientID: string;
  clientSecret: string;
  refreshToken: string;
};

export default abstract class Oath2Auth {
  private clientID: string;
  private clientSecret: string;
  private refreshToken: string;
  //Khai báo biến nội bộ

  constructor(info: Credentials) {
    this.clientID = info.clientID;
    this.clientSecret = info.clientSecret;
    this.refreshToken = info.refreshToken;
  }
  //Khai báo cấu trúc parm truyền vào

  /*Không cần truyền hoặc truyền string gì cũng được khi gọi method này
  AccessToken ở đây chỉ sử dụng định nghĩa return, tiết kiệm code*/
  getAccessToken = async (accessToken?) => {
    var data = qs.stringify({
      client_id: `${this.clientID}`,
      client_secret: `${this.clientSecret}`,
      refresh_token: `${this.refreshToken}`,
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

    await axios(config)
      .then((response) => {
        accessToken = response.data.access_token;
      })
      .catch((error) => {
        console.log(error);
      });
    return accessToken;
  };
}
