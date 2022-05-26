const express = require("express");
const router = express.Router();

const postsCtrl = require("../controllers/posts.js");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.get("/", auth, postsCtrl.getAll);
router.get("/:id", auth, postsCtrl.get);
router.get("/author/:author", auth, postsCtrl.getAllFor);
router.post("/", auth, multer, postsCtrl.create);
router.put("/:id", auth, multer, postsCtrl.update);
router.delete("/:id", auth, postsCtrl.delete);

const commentsCtrl = require("../controllers/comments");

router.get("/comments/:id", auth, commentsCtrl.getAllComments);
router.post("/comments", auth, commentsCtrl.createComment);
router.put("/comments/:id", auth, commentsCtrl.updateComment);
router.delete("/comments/:id", auth, commentsCtrl.deleteComment);

const ReactCtrl = require("../controllers/reactions");


router.get("/react/emoji", auth, ReactCtrl.getAllEmojis);
router.get("/react/:id", auth, ReactCtrl.getReact);
router.post("/react/emoji", auth, ReactCtrl.createReact);
router.put("/react/:user/:post", auth, ReactCtrl.update);
router.delete("/react/emoji/:user/:post", auth, ReactCtrl.deleteReact);

module.exports = router;