const { validationResult } = require("express-validator");
const {
  tryError,
  handel_validation_errors,
  removeImg,
  Rename_uploade_img,
  returnWithMessage,
  removeImgFiled,
  Rename_uploade_img_multiFild,
  uploade_img_multi_fild,
} = require("../../Helper/helper");
const db = require("../../models");

const AllGideController = async (req, res, next) => {
  try {
    var guideLines = await db.guideLines.findAll({});
    res.render("backEnd/guideLines/showAll", {
      title: "All guideLines",
      URL: req.url,
      notification: req.flash("notification")[0],
      validationError: req.flash("validationError")[0],
      admin: req.cookies.Admin,
      guideLines,
    });
  } catch (error) {
    tryError(res, error);
  }
};

const addGideController = async (req, res, next) => {
  try {
    var disability = await db.disability.findAll({
      where: {
        active: true,
      },
    });
    res.render("backEnd/guideLines/addGide", {
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
const EditGideController = async (req, res, next) => {
  try {
    var gide = await db.guideLines.findOne({
      where: {
        id: req.params.id,
      },
    });
    var disability = await db.disability.findAll({
      where: {
        active: true,
      },
    });
    res.render("backEnd/guideLines/editGide", {
      title: "update guide",
      URL: req.url,
      notification: req.flash("notification")[0],
      validationError: req.flash("validationError")[0],
      admin: req.cookies.Admin,
      disability,
      gide,
    });
  } catch (error) {
    tryError(res);
  }
};

const addGideControllerPost = async (req, res, next) => {
  try {
    var errors = validationResult(req).errors;
    if (errors.length > 0) {
      removeImgFiled([req.files.image, req.files.pdf]);
      handel_validation_errors(req, res, errors, "/dashpord/addGide");
      return;
    }
    var files = Rename_uploade_img_multiFild([req.files.image, req.files.pdf]);
    req.body.image = files.image ? files.image : null;
    req.body.pdf = files.pdf ? files.pdf : null;
    req.body.active = true;

    await db.guideLines.create(req.body);
    returnWithMessage(
      req,
      res,
      "/dashpord/AllGide",
      "تم اضافه الارشاد بنجاح",
      "success"
    );
  } catch (error) {
    tryError(res, error);
  }
};
const EditGideControllerPost = async (req, res, next) => {
  try {
    var errors = validationResult(req).errors;
    if (errors.length > 0) {
      removeImgFiled([req.files.image, req.files.pdf]);
      handel_validation_errors(
        req,
        res,
        errors,
        "/dashpord/editGide/" + req.params.id
      );
      return;
    }
    var files = Rename_uploade_img_multiFild([req.files.image, req.files.pdf]);
    if (files.image) removeImg(req, "gide/", req.body.oldImage);
    if (files.pdf) removeImg(req, "gide/", req.body.oldPdf);
    req.body.pdf = files.pdf ? files.pdf : req.body.oldPdf;
    req.body.image = files.image ? files.image : req.body.oldImage;
    req.body.active = req.body.active ? true : false;
    await db.guideLines.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    returnWithMessage(
      req,
      res,
      "/dashpord/EditGide/" + req.params.id,
      "تم تعديل الارشاد بنجاح",
      "success"
    );
  } catch (error) {
    tryError(res, error);
  }
};

const activeGide = async (req, res, next) => {
  try {
    await db.guideLines.update(
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
      "/dashpord/AllGide",
      req.query.isActive == "false"
        ? "تم التفعيل بنجاح"
        : "تم الغاء التفعيل بنجاح",
      "success"
    );
  } catch (error) {
    tryError(res, error);
  }
};

const deleteGide = async (req, res, next) => {
  try {
    await db.guideLines.destroy({
      where: {
        id: req.params.id,
      },
    });
    removeImg(req, "gide/", req.body.oldImage);
    if (req.body.oldPdf) removeImg(req, "gide/", req.body.oldPdf);
    returnWithMessage(
      req,
      res,
      "/dashpord/AllGide",
      "تم الحذف بنجاح",
      "danger"
    );
  } catch (error) {
    tryError(res, error);
  }
};

module.exports = {
  addGideController,
  EditGideController,
  EditGideControllerPost,
  addGideControllerPost,
  AllGideController,
  activeGide,
  deleteGide,
};
