const Posts = require("../models/posts");
const fs = require("fs");


exports.getAll = (req, res) => {
    Posts.getAll((err, data) => {
    if (err) res.status(500).send({ err });
    else res.status(200).send(data);
  });
};

exports.getAllFor = (req, res) => {
  console.log(req.params);
  let userId = req.params.author;
  Posts.getPostsByUserID(userId, (err, data) => {
    if (err) res.status(500).send({ err });
    else res.status(200).send(data);
  });
  
};

exports.get = (req, res) => {
  let id = req.params.id;
  Posts.getPost(id, (err, data) => {
    if (err) res.status(500).send({ err });
    else res.status(200).send(data);
  });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Tutorial 
  console.log(req.body, req.file);
  if(req.file){
    console.log(req.file.filename);
    const filename = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    console.log(filename);
    const postfil = new Posts({
      user_id: req.body.user_id,
      title: req.body.title,
      content: req.body.content,
      file: filename,
      created_date: req.body.created_date,
    });
    Posts.create(postfil, (err, data) => {
      if (err) res.status(500).send({ message: err.message });
      else res.status(201).send(data);
    });
  } else{
    const post = new Posts({
      user_id: req.body.user_id,
      title: req.body.title,
      content: req.body.content,
      created_date: req.body.created_date,
    });

    // Save Tutorial in the database

    Posts.create(post, (err, data) => {
      if (err) res.status(500).send({ message: err.message });
      else res.status(201).send(data);
    });
  }
   

};

exports.update = (req, res) => {
  console.log("b",req.body);
  let id = req.params.id;
  Posts.getOne(id, (err, data) => {
    console.log("les data: ", data[0]);
    let post = []
    if (req.file) {
      let filename = ""
      if (data[0].file) {
        filename = data[0].file.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
         console.log( "fichier suprimer");
        });
      }
      const file = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
      post = new Posts({
        title: req.body.title,
        content: req.body.content,
        file: file,
      });
      console.log(post);
    }
    else{
      post = new Posts({
        title: req.body.title,
        content: req.body.content,
        file: data[0].file,
      });
      console.log(post);
    }
    // add post
    Posts.update(id, post, (err, data) => {
      if (err) {return res.status(500).send({ message: err.message })}
      else  {res.status(201).send(data);}
    });
  })
  //.catch((error) => res.status(500).json({ error }));
};

exports.delete = (req, res) => {
  Posts.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Post with id ${req.params.id}.`, });
      } else {
        res.status(500).send({ message: "Could not delete Post with id " + req.params.id, });
      }
    } else res.send({ message:`Post was deleted successfully!` });
  });
};