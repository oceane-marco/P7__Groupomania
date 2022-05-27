const mysql = require("./db");

// constructor
const Reacts = function (react) {
  this.user_id = react.user_id;
  this.post_id = react.post_id;
  this.emoji_id = react.emoji_id;
};

//methode


Reacts.getReactPost = (post_id, result) => {
  getReactByPostID = `SELECT reactions.*, users.name, users.img, emojis.emoji 
  FROM reactions 
  JOIN posts ON posts.id = reactions.post_id 
  JOIN users ON users.id = reactions.user_id 
  JOIN emojis ON emojis.id = reactions.emoji_id 
  WHERE reactions.post_id  = ${post_id}`;
  mysql.query(getReactByPostID, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Reacts.create = (newReact, result) => {
  mysql.query("INSERT INTO reactions SET ?", newReact, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { ...newReact });
  });
};
Reacts.update = (id, post, react, result) => {
  console.log(react);
  mysql.query(
    `UPDATE reactions SET emoji_id = ? WHERE user_id = ${id} AND post_id = ${post}`,
    [react.emoji_id], (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, { ...react });
    }
  );
};

Reacts.delete = (id, post, result) => {
  mysql.query(
    `DELETE FROM reactions WHERE user_id = ${id} AND post_id = ${post}`,
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};


module.exports = Reacts;