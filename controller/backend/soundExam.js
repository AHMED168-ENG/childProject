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

const AllSoundController = async (req, res, next) => {
    try {
        var SoundExam = await db.soundExam.findAll({
            include: [
                {
                    model: db.disability,
                    as: "soundDisability",
                },
            ],
        });
        res.render("backEnd/soundExam/showAll", {
            title: "All SoundExam",
            URL: req.url,
            notification: req.flash("notification")[0],
            validationError: req.flash("validationError")[0],
            admin: req.cookies.Admin,
            SoundExam,
        });
    } catch (error) {
        tryError(res, error);
    }
};

const addSoundController = async (req, res, next) => {
    try {
        var disability = await db.disability.findAll({
            where: {
                active: true,
            },
        });
        res.render("backEnd/soundExam/addSound", {
            title: "add SoundExam",
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
const EditSoundController = async (req, res, next) => {
    try {
        var sound = await db.soundExam.findOne({
            where: {
                id: req.params.id,
            },
        });
        var disability = await db.disability.findAll({
            where: {
                active: true,
            },
        });
        res.render("backEnd/soundExam/EditSound", {
            title: "update sound",
            URL: req.url,
            notification: req.flash("notification")[0],
            validationError: req.flash("validationError")[0],
            admin: req.cookies.Admin,
            disability,
            sound,
        });
    } catch (error) {
        tryError(res);
    }
};

const addSoundControllerPost = async (req, res, next) => {
    try {
        var errors = validationResult(req).errors;
        if (errors.length > 0) {
            removeImgFiled([req.files.image, req.files.pdf]);
            handel_validation_errors(req, res, errors, "/dashpord/addSound");
            return;
        }
        var files = Rename_uploade_img_multiFild([
            req.files.image,
            req.files.pdf,
        ]);
        req.body.image = files.image ? files.image : null;
        req.body.pdf = files.pdf ? files.pdf : null;
        req.body.active = true;
        req.body.otherDisabilities = req.body.otherDisabilities
            ? req.body.otherDisabilities.length == 1
                ? req.body.otherDisabilities.split(",")
                : req.body.otherDisabilities
            : [];
        req.body.isOther = req.body.isOther ? true : false;

        await db.soundExam.create(req.body);
        returnWithMessage(
            req,
            res,
            "/dashpord/AllSound",
            "تم اضافه ملف شرح الصوت بنجاح",
            "success"
        );
    } catch (error) {
        tryError(res, error);
    }
};
const EditSoundControllerPost = async (req, res, next) => {
    try {
        var errors = validationResult(req).errors;
        if (errors.length > 0) {
            removeImgFiled([req.files.image, req.files.pdf]);
            handel_validation_errors(
                req,
                res,
                errors,
                "/dashpord/EditSound/" + req.params.id
            );
            return;
        }
        var files = Rename_uploade_img_multiFild([
            req.files.image,
            req.files.pdf,
        ]);
        if (files.image) removeImg(req, "sound/", req.body.oldImage);
        if (files.pdf) removeImg(req, "sound/", req.body.oldPdf);
        req.body.pdf = files.pdf ? files.pdf : req.body.oldPdf;
        req.body.image = files.image ? files.image : req.body.oldImage;
        req.body.active = req.body.active ? true : false;
        req.body.otherDisabilities = req.body.otherDisabilities
            ? req.body.otherDisabilities.length == 1
                ? req.body.otherDisabilities.split(",")
                : req.body.otherDisabilities
            : [];
        req.body.isOther = req.body.isOther ? true : false;

        await db.soundExam.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        returnWithMessage(
            req,
            res,
            "/dashpord/EditSound/" + req.params.id,
            "تم تعديل ملف شرح الصوت بنجاح",
            "success"
        );
    } catch (error) {
        tryError(res, error);
    }
};

const activeSound = async (req, res, next) => {
    try {
        await db.soundExam.update(
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
            "/dashpord/AllSound",
            req.query.isActive == "false"
                ? "تم التفعيل بنجاح"
                : "تم الغاء التفعيل بنجاح",
            "success"
        );
    } catch (error) {
        tryError(res, error);
    }
};

const deleteSound = async (req, res, next) => {
    try {
        await db.soundExam.destroy({
            where: {
                id: req.params.id,
            },
        });
        removeImg(req, "sound/", req.body.oldImage);
        if (req.body.oldPdf) removeImg(req, "sound/", req.body.oldPdf);
        returnWithMessage(
            req,
            res,
            "/dashpord/AllSound",
            "تم الحذف بنجاح",
            "danger"
        );
    } catch (error) {
        tryError(res, error);
    }
};

module.exports = {
    addSoundController,
    EditSoundController,
    EditSoundControllerPost,
    addSoundControllerPost,
    AllSoundController,
    activeSound,
    deleteSound,
};
