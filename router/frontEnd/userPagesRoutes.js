const {
    homePage,
    userProfile,
    changePassword,
    ourService,
    ourTraining,
    yourTraining,
    showTraining,
    EditPersonalInformation,
    EditPersonalInformationPost,
    allTesting,
    resultPage,
    contactUs,
    contactUsPost,
    enterExam,
    sendResult,
    yourBooks,
    yourGide,
    ExamVoice,
} = require("../../controller/frontEnd/userPages.controller");
const { signUpUserValidation } = require("../../validation/frontEnd/authUser");
const {
    userAuthonticat,
} = require("../../middel_ware/frontEnd/userAuthonticate");
const {
    changePasswordValidation,
} = require("../../validation/frontEnd/changePassword");
const { uploade_img } = require("../../Helper/helper");
const multer = require("multer");

const router = require("express").Router();

router.get("/home", homePage);
router.get("/userProfile", userAuthonticat, userProfile);
router.post(
    "/changePassword",
    userAuthonticat,
    changePasswordValidation(),
    changePassword
);
router.get("/ourService", ourService);
router.get("/Alltraining", ourTraining);
router.get("/yourTraining", userAuthonticat, yourTraining);
router.get("/yourBooks", userAuthonticat, yourBooks);
router.get("/yourGide", userAuthonticat, yourGide);
router.get("/ExamVoice", userAuthonticat, ExamVoice);
router.get("/showTraining/:id", userAuthonticat, showTraining);
router.get(
    "/editPersonalInformation",
    userAuthonticat,
    EditPersonalInformation
);
router.post(
    "/editPersonalInformation",
    userAuthonticat,
    uploade_img("image"),
    signUpUserValidation(),
    EditPersonalInformationPost
);
router.get("/allTesting", userAuthonticat, allTesting);
router.get("/enterExam/:id", userAuthonticat, enterExam);
router.post(
    "/sendResult/:id",  
    userAuthonticat,     
    uploade_img("audio"),
    sendResult
);
router.get("/resultPage", userAuthonticat, resultPage);
router.get("/contactUs", userAuthonticat, contactUs);
router.post("/contactUs", userAuthonticat, contactUsPost);

module.exports = {
    userRoutes: router,
};
