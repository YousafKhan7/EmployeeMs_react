import mysql from "mysql";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employeems"
});
db.connect((err) => {
    if (err) {
    console.log("Connection Failed to MySQL Server!");
    }
    else{
        console.log("Connected to MySQL Server!");
    }
});

    export default db;