const {
  AllBookController,
  EditBookController,
  activeBook,
  deleteBook,
  EditBookControllerPost,
  addBookController,
  addBookControllerPost,
} = require("../../controller/backend/books");
const { uploade_img_multi_fild } = require("../../Helper/helper");
const { isAuthonticate } = require("../../middel_ware/backEnd/isAuthonticate");

const { BookValidation } = require("../../validation/backEnd/book");
const {
  EditUserValidation,
} = require("../../validation/backEnd/user.validation");

const router = require("express").Router();

router.get("/AllBook", isAuthonticate, AllBookController);
router.get("/addBook", isAuthonticate, addBookController);
router.post(
  "/addBook",
  isAuthonticate,
  uploade_img_multi_fild(
    [
      {
        name: "image",
      },
      {
        name: "pdf",
      },
    ],
    "public/backEnd/assets/img/Book"
  ),
  BookValidation(),
  addBookControllerPost
);
router.get("/EditBook/:id", isAuthonticate, EditBookController);
router.post(
  "/EditBook/:id",
  isAuthonticate,
  uploade_img_multi_fild(
    [
      {
        name: "image",
      },
      {
        name: "pdf",
      },
    ],
    "public/backEnd/assets/img/Book"
  ),
  BookValidation(),
  EditBookControllerPost
);
router.get("/activeBook/:id", isAuthonticate, activeBook);
router.post("/deleteBook/:id", isAuthonticate, deleteBook);

module.exports = {
  BookRouter: router,
};
