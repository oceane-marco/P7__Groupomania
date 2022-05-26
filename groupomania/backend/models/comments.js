const mysql = require("./db");

// constructor
const Comments = function (comment) {
  this.user_id = comment.user_id;
  this.post_id = comment.post_id;
  this.comment = comment.comment;
  this.created_date = comment.created_date;
};


//methode
Comments.getCommentPost = (post_id, result) => {
  getCommentByPostID = `SELECT comments.*, users.name, users.img FROM comments INNER JOIN posts ON posts.id = comments.post_id INNER JOIN users ON users.id = comments.user_id WHERE posts.id = ${post_id}`;
  mysql.query(getCommentByPostID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("comment: ", res);
    result(null, res);
  });
};

Comments.create = (newcomment, result) => {
  mysql.query("INSERT INTO comments SET ?", newcomment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Comments: ", { id: res.insertId, ...newcomment });
    result(null, { id: res.insertId, ...newcomment });
  });
};

Comments.update = (id, comment, result) => {
  mysql.query(
    "UPDATE comments SET user_id = ?, post_id =? , comment = ?, created_date = ?  WHERE id = ?",
    [comment.user_id, comment.post_id, comment.comment, comment.created_date, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found comment with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated Comments: ", { id: id, ...comment });
      result(null, { id: id, ...comment });
    }
  );
};
Comments.delete = (id, result) => {
  mysql.query("DELETE FROM comments WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found comment with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted comment with id: ", id);
    result(null, res);
  });
};

// Export Model
module.exports = Comments;