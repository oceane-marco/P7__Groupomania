const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");


// passwordValidator import
const passwordValidator = require("password-validator");
const schema = new passwordValidator();

// Add properties to it
schema
  .is().min(8).is().max(100).has().uppercase(1).has().lowercase(1).has().symbols(1).has().digits(2).has().not().spaces().is().not().oneOf(["Passw0rd", "Password123"]);
// model User Import
const Users = require("../models/users");
const { constants } = require("buffer");

exports.getAll = (req, res) => {
  Users.getAllUsers((err, data) => {
    if (err) res.status(500).send({ err });
    else res.status(200).send(data);
  });
};

exports.get = (req, res) => {
  let id = req.params.id;
  Users.getOne(id, (err, data) => {
    if (err) res.status(500).send({ err });
    else res.status(200).send(data);
  });
};

exports.getByName = (req, res) => {
  let name = req.params.name;
  Users.get_by_name(name, (err, data) => {
    if (err) res.status(500).send({ err });
    else res.status(200).send(data);
  });
};

exports.signup = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!", });
  } 
  if (!schema.validate(req.body.password)) {
    return res.status(400).json({ message: "Veillez mettre dans votre mots de passe 8 caractère comportant: lettres majuscules, lettres minuscules, au moins 2 chiffres et 1 symbole ", });
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new Users({ name: req.body.name, email: req.body.email, password: hash, isAdmin: req.body.isAdmin});
      // add user
      console.log(user);
      Users.create(user, (err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.status(201).send(data);
      });
    })
    .catch((error) => res.status(500).json({ error }));
  
};

exports.login = (req, res) => {
  // log
  let email = req.body.email;
  ///err
  Users.get(email, (err, data, hashedPassword) => {
    if (err) res.status(500).send({ err });
    let password = hashedPassword;
    bcrypt.compare(req.body.password, password).then((valid) => {
      if (!valid) {
        return res.status(401).json({ message: "Mot de passe incorrect !" });
      } 
      res.status(200).json({ token: jwt.sign({ userId: data.id, userauth: data.isAdmin}, process.env.TOKEN, { expiresIn: "48h",}), user:data });
    });
  });
};

exports.update = (req, res) => {
  let id = req.params.id;
  Users.getOne(id, (err, data) => {
    let password = "";
    if (req.body.password == '') {
      password = data.pasword;
      let user = {};
      if (req.file) {
        if (data.img) {
          const filename = data.img.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            console.log("fichier suprimer");
          });
        }
        const file = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
        user = new Users({
          name: req.body.name,
          password: password,
          img: file,
        });
        console.log("New user with file:", user);
      } else {
        user = new Users({
          name: req.body.name,
          password: password,
          img: data.img,
        });
        console.log("New user:", user);
      }
      // add user
      Users.update(id, user, (err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.status(201).send(data);
      });
    } else {
      password = req.body.password;
      if (password) {
        if (!schema.validate(password)) {
          return res
            .status(400)
            .json({
              message:
                "Veillez mettre dans votre mots de passe 8 caractère comportant: lettres majuscules, lettres minuscules, au moins 2 chiffres et 1 symbole ",
            });
        }
      }
      bcrypt.hash(password, 10).then((hash) => {
        if (err) return res.status(500).send({ message: err.message });
        let user = {};
        console.log(req.file);
        if (req.file) {
          console.log(data);
          if (data.img) {
            const filename = data.img.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
              console.log("fichier suprimer");
            });
          }
          const file = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
          user = new Users({
            name: req.body.name,
            password: hash,
            img: file,
          });
          console.log("New user with file:", user);
        } else {
          user = new Users({
            name: req.body.name,
            password: hash,
            img: data.img,
          });
          console.log("New user:", user);
        }
        // add user
        Users.update(id, user, (err, data) => {
          if (err) res.status(500).send({ message: err.message });
          else res.status(201).send(data);
        });
      });
    }
    console.log(password);
    
  });
};

exports.delete = (req, res) => {
  Users.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({ message: `Not found user with id ${req.params.id}.` });
      } else {
        res
          .status(500)
          .send({
            message: "Could not delete user with id " + req.params.id,
          });
      }
    } else res.status(200).send({ message: `user was deleted successfully!` });
  });
};
