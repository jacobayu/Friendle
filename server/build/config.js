"use strict";
require("dotenv").config();
module.exports = {
    app: {
        env: process.env.NODE_ENV || "development",
        port: process.env.PORT || 8000,
    },
    db: {
        uri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/",
    },
};
