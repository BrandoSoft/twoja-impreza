const config = {
    port: Number(process.argv[3]) || 3000,
    database_name: "twojaimpreza",
    database_pass: process.argv[2] || "KyhgX8Rcu795aVp",
}

module.exports = config;