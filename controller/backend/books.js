const { validationResult } = require("express-validator");
const {
  tryError,
  handel_validation_errors,
  removeImg,
  returnWithMessage,
  removeImgFiled,
  Rename_uploade_img_multiFild,
} = require("../../Helper/helper");
const db = require("../../models");

const AllBookController = async (req, res, next) => {
  try {
    var books = await db.books.findAll({});
    res.render("backEnd/books/showAll", {
      title: "All books",
      URL: req.url,
      notification: req.flash("notification")[0],
      validationError: req.flash("validationError")[0],
      admin: req.cookies.Admin,
      books,
    });
  } catch (error) {
    tryError(res, error);
  }
};

const addBookController = async (req, res, next) => {
  try {
    var disability = await db.disability.findAll({
      where: {
        active: true,
      },
    });
    res.render("backEnd/books/addbook", {
      title: "add guide",
      URL: req.url,
      notification: req.flash("notification")[0],
      validationError: req.flash("validationError")[0],
      admin: req.cookies.Admin,
      disability,
    });
  } catch (error) {
    tryError(res, error);
  }
};
const EditBookController = async (req, res, next) => {
  try {
    var book = await db.books.findOne({
      where: {
        id: req.params.id,
      },
    });
    var disability = await db.disability.findAll({
      where: {
        active: true,
      },
    });
    res.render("backEnd/books/editbook", {
      title: "update guide",
      URL: req.url,
      notification: req.flash("notification")[0],
      validationError: req.flash("validationError")[0],
      admin: req.cookies.Admin,
      disability,
      book,
    });
  } catch (error) {
    tryError(res);
  }
};

const addBookControllerPost = async (req, res, next) => {
  try {
    var errors = validationResult(req).errors;
    if (errors.length > 0) {
      removeImgFiled([req.files.image, req.files.pdf]);
      handel_validation_errors(req, res, errors, "/dashpord/addbook");
      return;
    }
    var files = Rename_uploade_img_multiFild([req.files.image, req.files.pdf]);
    req.body.image = files.image ? files.image : null;
    req.body.pdf = files.pdf ? files.pdf : null;
    req.body.active = true;

    await db.books.create(req.body);
    returnWithMessage(
      req,
      res,
      "/dashpord/Allbook",
      "تم اضافه الارشاد بنجاح",
      "success"
    );
  } catch (error) {
    tryError(res, error);
  }
};
const EditBookControllerPost = async (req, res, next) => {
  try {
    var errors = validationResult(req).errors;
    if (errors.length > 0) {
      removeImgFiled([req.files.image, req.files.pdf]);
      handel_validation_errors(
        req,
        res,
        errors,
        "/dashpord/editbook/" + req.params.id
      );
      return;
    }
    var files = Rename_uploade_img_multiFild([req.files.image, req.files.pdf]);
    if (files.image) removeImg(req, "book/", req.body.oldImage);
    if (files.pdf) removeImg(req, "book/", req.body.oldPdf);
    req.body.pdf = files.pdf ? files.pdf : req.body.oldPdf;
    req.body.image = files.image ? files.image : req.body.oldImage;
    req.body.active = req.body.active ? true : false;
    await db.books.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    returnWithMessage(
      req,
      res,
      "/dashpord/Editbook/" + req.params.id,
      "تم تعديل الكتاب بنجاح",
      "success"
    );
  } catch (error) {
    tryError(res, error);
  }
};

const activeBook = async (req, res, next) => {
  try {
    await db.books.update(
      { active: req.query.isActive == "true" ? false : true },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    returnWithMessage(
      req,
      res,
      "/dashpord/AllBook",
      req.query.isActive == "false"
        ? "تم التفعيل بنجاح"
        : "تم الغاء التفعيل بنجاح",
      "success"
    );
  } catch (error) {
    tryError(res, error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    await db.books.destroy({
      where: {
        id: req.params.id,
      },
    });
    removeImg(req, "Book/", req.body.oldImage);
    if (req.body.oldPdf) removeImg(req, "Book/", req.body.oldPdf);
    returnWithMessage(
      req,
      res,
      "/dashpord/AllBook",
      "تم الحذف بنجاح",
      "danger"
    );
  } catch (error) {
    tryError(res, error);
  }
};

module.exports = {
  addBookController,
  EditBookController,
  EditBookControllerPost,
  addBookControllerPost,
  AllBookController,
  activeBook,
  deleteBook,
};
