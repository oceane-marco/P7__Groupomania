const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/users");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config")

router.get("/:id", auth, userCtrl.get);
router.get("/name/:name", auth, userCtrl.getByName);
router.get("/", auth, userCtrl.getAll);
router.post("/signup", auth, userCtrl.signup);
router.post("/login", userCtrl.login);
router.put("/:id", auth, multer, userCtrl.update);
router.delete("/:id", auth, userCtrl.delete);

module.exports = router;
