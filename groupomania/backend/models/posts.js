const mysql = require('./db')
// constructor
const Posts = function (post) {
  this.user_id = post.user_id;
  this.title= post.title;
  this.content = post.content;
  this.file = post.file;
  this.created_date = post.created_date; 
};

//methode
Posts.getAll = result => {
  let selectposts =
    "SELECT posts.*, users.name, users.img FROM posts JOIN users ON users.id = posts.user_id";
  mysql.query(selectposts, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Posts.getOne = (id, result) => {
  let selectposts = `SELECT posts.*, users.name, users.img FROM posts JOIN users ON users.id = posts.user_id WHERE posts.id = ${id}`;
  mysql.query(selectposts, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    result(null, res);
  });
};

Posts.getPostsByUserID = (userId, result) => {
  let selectposts = `SELECT posts.*, users.name, users.img FROM posts JOIN users ON users.id = posts.user_id WHERE user_id = ${userId}`;
  mysql.query(selectposts, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
}

Posts.create = (newPost, result) => {
  mysql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Posts: ", { id: res.insertId, ...newPost });
    result(null, { id: res.insertId, ...newPost });
  });
};

Posts.update = (id, post, result) => {
  mysql.query(
    `UPDATE posts SET title = ?, content = ?, file= ?  WHERE id = ${id}`,
    [post.title, post.content, post.file],(err, res) => {
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
      console.log("updated posts: ", { id: id, ...post });
      result(null, { id: id, ...post });
    }
  );
};
Posts.delete = (id, result) => {
  mysql.query("DELETE FROM posts WHERE id = ?", id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    console.log("deleted post with id: ", id);
    result(null, res);
  });
};

// Export Model
module.exports = Posts;
