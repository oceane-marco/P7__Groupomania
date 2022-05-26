const Comments = require("../models/comments");


exports.getAllComments = (req, res) => {
  const post_id = req.params.id;
  console.log(post_id);
  Comments.getCommentPost(post_id,(err, data) => {
    if (err) res.status(500).send({ err });
    else res.status(200).send(data);
  });
};

exports.createComment = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return
  }
  // Create a Comments

    const comment = new Comments({
      user_id: req.body.user_id,
      comment: req.body.comment,
      post_id: req.body.post_id,
      created_date: req.body.created_date,
    });
  
  // Save Comments in the database
  Comments.create(comment, (err, data) => {
    if (err)
      res.status(500).send({ message: err.message });
    else res.status(201).send(data);
  });
};

exports.updateComment = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  Comments.update(req.params.id, new Comments(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found comments with id ${req.params.id}.`});
      } else {
        res.status(500).send({ message: "Error updating comments with id " + req.params.id });
      }
    } else res.send(data);
  });
};

exports.deleteComment = (req, res) => {
  console.log(req.params.id);
  Comments.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Comment with id ${req.params.id}.`, });
      } else {
        res.status(500).send({ message: "Could not delete Comment with id " + req.params.id, });
      }
    } else res.send({ message:`Comment was deleted successfully!` });
  });
};