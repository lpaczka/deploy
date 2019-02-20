const NODE_ENV = process.env.NODE_ENV || "dev";

const ENVS = {
    dev: {
        SECRET_KEY: "OYIH9N005LZOJ3EDMU6W",
        db:{
            url: "mongodb+srv://cinta-negra27_user:1q2w3e4r5t6y@cintanegra27-db-zqg1p.mongodb.net/test?retryWrites=true"
        }
    },
    test:{},
    production:{
        SECRET_KEY: process.env.SECRET_KEY,
        db:{
            url: process.env.MONGO_URL
        }
    }
};

module.exports = ENVS[NODE_ENV];