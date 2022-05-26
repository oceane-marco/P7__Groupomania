const mysql = require("./db");

const Emojis = function (react) {
  this.emoji = react.emoji;
};

Emojis.getEmojis = (result) => {
  getEmojis = `SELECT * FROM emojis `;
  mysql.query(getEmojis, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("React: ", res);
    result(null, res);
  });
};

module.exports = Emojis;
