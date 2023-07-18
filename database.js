const Pool = require("pg").Pool;

const pool = new Pool({
    user :"postgres",
    password:"1510",
    port :"5432",
    host :"localhost",
    database:"translatorapp"
    
})

module.exports = pool;