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
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("user: ", res[0]);
    result(null, res[0]);
  });
};

Users.get_by_name = (name, result) => {
  let get_users = `SELECT users.id, users.name, users.email, users.isAdmin, users.img FROM users WHERE name LIKE '%${name}%'`;
  mysql.query(get_users, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(res);
    result(null, res);
  });
};

Users.get = (email, result) => {
  let get_users = `SELECT * FROM users WHERE email = '${email}'`;
  mysql.query(get_users, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if(res.length == 0){
       result(null, {message :"aucun utilisateur trouver"});
       return;
      }
      let hashedPassword = res[0].password;
      result(null, res[0], hashedPassword);
  });
};

Users.getAllUsers  = result => {
    let selectusers = "SELECT id, name, email, isAdmin FROM users";
    mysql.query(selectusers, (err, res) => {
      if (err) {
        console.log("error: ", err);
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
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created users: ", { id: res.insertId, ...newuser });
    result(null, { id: res.insertId, ...newuser });
  });
};

Users.update = (id, user, result) => {
  mysql.query(
    "UPDATE users SET name = ?, password = ?, img = ? WHERE id = ?",
    [user.name, user.password, user.img, id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated users: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

Users.delete = (id, result) => {
  mysql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found users with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted users with id: ", id);
    result(null, res);
  });
};

// Export Model
module.exports = Users;