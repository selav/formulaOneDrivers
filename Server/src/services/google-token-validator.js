const { OAuth2Client } = require("google-auth-library");

const config = require("../config/authentication.json");

const client = new OAuth2Client();
const verify = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: config["google-app-client-id"], //  the CLIENT_ID of the app
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  return userid;
};

module.exports = {
  verify,
};
