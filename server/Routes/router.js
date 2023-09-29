const express = require("express");
const router = express.Router();
const controllers = require("../Controllers/userControllers");

const upload = require("../multerconfig/storageConfig");

router.post(
  "/user/register",
  upload.single("user_profile"),
  controllers.createUser
);
router.get("/user/details", controllers.getAllUsers);
router.get("/user/:id", controllers.getSingleUser);
router.put(
  "/user/edit/:id",
  upload.single("user_profile"),
  controllers.editUser
);
router.delete("/user/delete/:id", controllers.deleteUser);
router.put("/user/status/:id", controllers.changeStatus);
router.get("/userExport", controllers.userExport)

module.exports = router;
