const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
require("dotenv").config();
const path = require("path");
const db = require("./models");
const paginate = require("express-paginate");
const session = require("express-session");
const flash = require("connect-flash");
const cookies = require("cookie-parser");
const cloudinary = require("cloudinary");
const { dashpordRouter } = require("./router/backend/dashpored");
const { authAdmin } = require("./router/backend/auth.router");
const { userRoutes } = require("./router/frontEnd/userPagesRoutes");
const { authUserRoutes } = require("./router/frontEnd/auth/auth");
const { usersRouter } = require("./router/backend/users_router");
const { dispabilityRouter } = require("./router/backend/disability.router");
const { trainingRouter } = require("./router/backend/training.router");
const { TestingRouter } = require("./router/backend/testIng.router");
const { messagesRouter } = require("./router/backend/messages.router");
const { allUserResult } = require("./router/backend/UserResult");
const { GideRouter } = require("./router/backend/gide");
const { BookRouter } = require("./router/backend/book");
const { soundExamRouter } = require("./router/backend/SoundExam");
const { Sequelize } = require("sequelize");

const opts = {
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
            require: true,
        },
    },
};

// construct a database connection
const db_ = new Sequelize(
    "postgres://doadmin:AVNS_jrNQFGmBOi7ZEyoKoCN@db-postgresql-nyc1-90758-do-user-12428913-0.b.db.ondigitalocean.com:25060/defaultdb",
    opts
);

db_.authenticate()
    .then(() => console.log("connected to db"))
    .catch(console.error);

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});
/*--------------------------- start sockit Io ----------------------------------*/
var activeUser = {};

/* ------------- set seting -------------------*/
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(cookies());
app.use(
    session({
        secret: "هذا الاوبشن خاص بالتشفير يطلب منك نص معين يستخدمه هو عند التشفير وكلما زاد هذا النص زاد الحمايه",
        saveUninitialized: false, // معناها انه عند عمل session لاتقوم بحفظها في الداتابيز الا عندما امرك بذالك
        /*cookie : { // السشن ده هو في الاصل عباره عن cookie لذالك انا اقوم بتحديد بعض القيم لتحديد مده الانتهاء الديفولت هو عند اغلاق المتصفح
        //maxAge : 1 * 60 * 60 * 100, 
    },*/
        resave: true,
    })
);
app.use(flash());
app.use(paginate.middleware(10, 20));
/* ------------- set seting -------------------*/
app.use("/", dashpordRouter);
app.use("/dashpord", authAdmin);
app.use("/dashpord", usersRouter);
app.use("/dashpord", dispabilityRouter);
app.use("/dashpord", trainingRouter);
app.use("/dashpord", TestingRouter);
app.use("/dashpord", messagesRouter);
app.use("/dashpord", allUserResult);
app.use("/dashpord", GideRouter);
app.use("/dashpord", BookRouter);
app.use("/dashpord", soundExamRouter);
app.use("/", authUserRoutes);
app.use("/", userRoutes);

app.use((req, res, next) => {
    res.render("error", { message: "this page not hir", title: "Error Page" });
});
/*--------------------------- end route  ----------------------------------*/

server.listen("5000", () => {
    console.log("server starte 5000");
});
