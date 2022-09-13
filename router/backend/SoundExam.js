const {
    addSoundController,
    EditSoundController,
    EditSoundControllerPost,
    addSoundControllerPost,
    AllSoundController,
    activeSound,
    deleteSound,
} = require("../../controller/backend/SoundExam");
const { uploade_img_multi_fild } = require("../../Helper/helper");
const { isAuthonticate } = require("../../middel_ware/backEnd/isAuthonticate");

const { GideValidation } = require("../../validation/backEnd/Gide.validation");

const router = require("express").Router();

router.get("/AllSound", isAuthonticate, AllSoundController);
router.get("/addSound", isAuthonticate, addSoundController);
router.post(
    "/addsound",
    isAuthonticate,
    uploade_img_multi_fild([
        {
            name: "image",
        },
        {
            name: "pdf",
        },
    ]),
    GideValidation(),
    addSoundControllerPost
);
router.get("/EditSound/:id", isAuthonticate, EditSoundController);
router.post(
    "/EditSound/:id",
    isAuthonticate,
    uploade_img_multi_fild([
        {
            name: "image",
        },
        {
            name: "pdf",
        },
    ]),
    GideValidation(),
    EditSoundControllerPost
);
router.get("/activeSound/:id", isAuthonticate, activeSound);
router.post("/deleteSound/:id", isAuthonticate, deleteSound);

module.exports = {
    soundExamRouter: router,
};
