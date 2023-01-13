require("dotenv").config();
const mongoose =  require('mongoose')
mongoose.set("strictQuery",false);

const config = {
    database: {
        url: process.env.DB_URL,
        option: {
            user: "",
            pass: "",
            autoIndex: false,
            useUnifiedTopology: true,
            useNewUrlParser: true,
        },
    },
};
module.exports = config;


