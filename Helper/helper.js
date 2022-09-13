/*--************ start helpper functions --**********/

const multer = require("multer");
const fs = require("fs");
const db = require("../models");
const { Op, Sequelize, DataTypes } = require("sequelize");

/*----------------- start try error -------------------*/
const tryError = async (res, message = null) => {
    (message = message
        ? message
        : "هناك خطا ما في الاتصال ويجب عليك مراجعه مبرمج الموقع"),
        res.render("error", { message: message });
};
/*----------------- end try error -------------------*/

/*----------------- start return with message -------------------*/
const returnWithMessage = async (
    req,
    res,
    url = "",
    message = "",
    type = ""
) => {
    message = message ? message : "هناك خطا ما ويرجي التحقق من الكود";
    type = type ? type : "danger";
    req.flash("notification", { message: message, type: type });
    res.redirect(url);
};
/*----------------- end return with message -------------------*/

/*------------------------------------ start getDate -------------------------------*/
function getDate(time, type = "") {
    var date = time.toString().split(" ");
    if (!type) {
        date = date[1] + " " + date[2] + " " + date[3] + " " + date[4] + " ";
    } else if (type == "time") {
        date = date[4] + " ";
    } else {
        date = date[1] + " " + date[2] + " " + date[3];
    }

    return date;
}
/*------------------------------------ end getDate -------------------------------*/

/*------------------------------------ start handel validation errors -------------------------------*/
var handel_validation_errors = (req, res, errors, path, errorOnly) => {
    var param = [];
    var newError = {};
    errors.forEach((element) => {
        if (!param.includes(element.param)) {
            param.push(element.param);
            newError[element.param] = [element];
        } else {
            newError[element.param].push(element);
        }
    });
    if (errorOnly) {
        return newError;
    } else {
        req.flash("validationError", newError);
        res.redirect(path);
    }
};
/*------------------------------------ end handel validation errors -------------------------------*/
/*------------------------------------ start uploade image -------------------------------*/
const uploade_img = (image) => {
    return multer({ dest: "uploads" }).array(image);
};
const uploade_img_multi_fild = (array) => {
    return multer({ dest: "uploads" }).fields(array);
};

/*--------------------------------------------------*/

const Rename_uploade_img_multiFild = async (fields, folder) => {
    var fileds_img = {};
    var image = "";
    for (var x = 0; x < fields.length; x++) {
        if (fields[x] && fields[x].length > 0) {
            for (c = 0; c < fields[x].length; c++) {
                var file = "";
                file = await cloudinary.v2.uploader.upload(fields[x][c].path, {
                    folder: `Takllm/${folder}`,
                });
                fs.unlinkSync(fields[x][c].path);
                image += file.secure_url + "--";
            }
            fileds_img[fields[x][0].fieldname] = image;
            image = "";
        }
    }

    return fileds_img;
};
/*--------------------------------------------------*/

/*--------------------------------------------------*/

const Rename_uploade_img = async (req, folder) => {
    var image = "";
    for (x = 0; x < req.files.length; x++) {
        var file = "";
        file = await cloudinary.v2.uploader.upload(req.files[x].path, {
            folder: `Takllm/${folder}`,
        });
        fs.unlinkSync(req.files[x].path);
        image += file.secure_url + "--";
    }
    return image;
};
/*--------------------------------------------------*/

const removeImgFiled = (fields) => {
    fields.forEach((element) => {
        if (element) {
            element.forEach((element, i) => {
                fs.unlinkSync(element.path);
            });
        }
    });
};
/*--------------------------------------------------*/

/*--------------------------------------------------*/

const removeImg = async (req, imgname = "") => {
    if (!imgname) {
        if (!req.files) return;
        req.files.forEach((element) => {
            fs.unlinkSync(element.path);
        });
    } else {
        var imgname = imgname.split("--");
        for (var i = 0; i < imgname.length - 1; i++) {
            var image = imgname[i].split("/");
            var uploadIndex = image.indexOf("upload");
            image = image.slice(uploadIndex + 2);
            image = image.join("/").split(".")[0];
            console.log(await cloudinary.v2.uploader.destroy(image));
        }
    }
};
/*------------------------------------ end uploade image -------------------------------*/

/*------------------------------------ get default Language -------------------------------*/
const defaultLanguage = () => {
    return "en";
};
/*------------------------------------ get default Language -------------------------------*/
/*--------------------- start formate date ---------------------*/
function formateDate(date, type = "date") {
    if (type == "date") {
        return require("moment")(date).format("YYYY-MM-DD");
    } else {
        return require("moment")(date).format("hh-mm-ss");
    }
}
/*--------------------- end formateDate ---------------------*/

/*--------------------- start get catigory ---------------------*/
const getMainCatigory = async (id) => {
    var db = require("../models");
    var catigoryFullName = "";
    var test = true;
    while (test) {
        var catData = await db.catigorys.findOne({
            where: {
                id: id,
            },
        });
        if (!catData) {
            test = false;
        } else {
            id = catData.catigoryId;
            catigoryFullName += "___" + catData["name_" + defaultLanguage()];
        }
    }
    catigoryFullName = catigoryFullName.split("___").reverse().join(" -- ");
    return catigoryFullName;
};
/*--------------------- end get catigory ---------------------*/

/*--------------------- start formate date ---------------------*/
function formateDate(date, type = "date") {
    if (type == "date") {
        return require("moment")(date).format("YYYY-MM-DD");
    } else {
        return require("moment")(date).format("hh-mm-ss");
    }
}
/*--------------------- end formateDate ---------------------*/

/*--------------------- start formate date ---------------------*/
function getSumOfArray(array) {
    var sum = 0;
    array.forEach((element) => {
        if (element) {
            sum += parseInt(element);
        }
    });
    return sum;
}
/*--------------------- end formateDate ---------------------*/

module.exports = {
    getMainCatigory,
    returnWithMessage,
    getDate,
    tryError,
    handel_validation_errors,
    uploade_img,
    Rename_uploade_img,
    removeImg,
    uploade_img_multi_fild,
    Rename_uploade_img_multiFild,
    removeImgFiled,
    defaultLanguage,
    formateDate,
    getSumOfArray,
};
