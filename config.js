require('dotenv').config();

function getEnv(data){
    const env = process.env[`${data}`];
    if (env === undefined){
        throw new Error(`${data} in .env is not found`);
    } else {
        if (env === ""){
            throw new Error(`Empty string ${data} in ENV`);
        }
        return env;
    }
}

const config = {
    port:  process.env.PORT || Number(getEnv("PORT")),
    database_name: getEnv("DBNAME"),
    database_pass: getEnv("DBPASS"),
    access_token: getEnv("ACCESS_TOKEN"),
}

module.exports = config;