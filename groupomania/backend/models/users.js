const mysql = require("./db");


// constructor
const Users = function (user) {
  this.name= user.name;
  this.email= user.email;
  this.password= user.password;
  this.isAdmin = user.isAdmin;
   this.img = user.img;
};

Users.getOne = (id, result) => {
  let get_users = `SELECT * FROM users WHERE id = '${id}'`;
  mysql.query( get_users, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res[0]);
  });
};

Users.get_by_name = (name, result) => {
  let get_users = `SELECT users.id, users.name, users.email, users.isAdmin, users.img FROM users WHERE name LIKE '%${name}%'`;
  mysql.query(get_users, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Users.get = (email, result) => {
  let get_users = `SELECT * FROM users WHERE email = '${email}'`;
  mysql.query(get_users, (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      if(!res.length){
       result(null, {message :"aucun utilisateur trouver"});
       return;
      }
      result(null, res[0]);
  });
};

Users.getAllUsers  = result => {
    let selectusers = "SELECT id, name, email, isAdmin FROM users";
    mysql.query(selectusers, (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      console.log("Users: ", res);
      result(null, res);
    });
};

Users.create = (newuser, result) => {
  mysql.query("INSERT INTO users SET ?", newuser, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newuser });
  });
};

Users.update = (id, user, result) => {
  mysql.query(
    "UPDATE users SET name = ?, password = ?, img = ? WHERE id = ?",
    [user.name, user.password, user.img, id], (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, { id: id, ...user });
    }
  );
};

Users.delete = (id, result) => {
  mysql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      ("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

// Export Model
module.exports = Users;