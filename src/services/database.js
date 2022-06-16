const moongose = require("mongoose");
const serverConfig = require("../config/server");

const { host, port, username, password, name } = serverConfig.database;

moongoseUri = `mongodb://${username}:${password}@${host}:${port}/${name}`;

const connectToDatabase = () => {
  moongose.connect(
    moongoseUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    function (err, conn) {
      if (err) console.error(err);
      if (conn) console.info("[+] Database Connected: ", conn);
    }
  );
};

module.exports = {
  connectToDatabase,
};
