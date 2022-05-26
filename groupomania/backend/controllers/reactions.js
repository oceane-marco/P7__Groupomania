const Reacts = require("../models/reactions");
const Emoji = require("../models/emoji");

exports.getAllEmojis = (req, res) => {
  Emoji.getEmojis((err, data) => {
    if (err) res.status(500).send({ err });
    else res.status(200).send(data);
  });
};

exports.getReact = (req, res) => {
  let id = req.params.id
  Reacts.getReactPost(id, (err, data) => {
    if (err) res.status(500).send({ err });
    else res.status(200).send(data);
  });
};

exports.createReact = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Reacts

  const React = new Reacts({
    user_id: req.body.user_id,
    post_id: req.body.post_id,
    emoji_id: req.body.emoji_id,
  });

  // Save Reacts in the database
  Reacts.create(React, (err, data) => {
    if (err) res.status(500).send({ message: err.message });
    else res.status(201).send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }
  console.log(req.params);
  Reacts.update(
    req.params.user, req.params.post, new Reacts(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res
            .status(404)
            .send({ message: `Not found Reacts with user_id ${req.params.user}.` });
        } else {
          res.status(500).send({
            message: "Error updating Reacts with user_id  " + req.params.user,
          });
        }
      } else res.send(data);
    }
  );
};

exports.deleteReact = (req, res) => {
  console.log(req.params);

  Reacts.delete(req.params.user, req.params.post, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({ message: `Not found React with id ${req.params.id}.` });
      } else {
        res.status(500).send({
          message: "Could not delete React with id " + req.params.id,
        });
      }
    } else res.send({ message: `React was deleted successfully!` });
  });
};