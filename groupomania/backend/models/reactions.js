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
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("React: ", res);
    result(null, res);
  });
};

Reacts.create = (newReact, result) => {
  mysql.query("INSERT INTO reactions SET ?", newReact, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created reactions: ", {  ...newReact });
    result(null, { ...newReact });
  });
};
Reacts.update = (id, post, react, result) => {
  console.log(react);
  mysql.query(
    `UPDATE reactions SET emoji_id = ? WHERE user_id = ${id} AND post_id = ${post}`,
    [react.emoji_id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found post with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated react: ", { ...react });
      result(null, { ...react });
    }
  );
};

Reacts.delete = (id, post, result) => {
  mysql.query(
    `DELETE FROM reactions WHERE user_id = ${id} AND post_id = ${post}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found React with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted reactions with id: ", id);
      result(null, res);
    }
  );
};
module.exports = Reacts;