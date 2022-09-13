require("dotenv").config();
module.exports = {
    username: "doadmin",
    password: "AVNS_jrNQFGmBOi7ZEyoKoCN",
    database: "defaultdb",
    host: "db-postgresql-nyc1-90758-do-user-12428913-0.b.db.ondigitalocean.com",
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
            require: true,
        },
    },
};
