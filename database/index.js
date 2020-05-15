const cp = require('child_process');
require('dotenv').config();

const fileName = 'users_db.sql';
const usersTables = 'users_list';

const existsNotifyDB = `Can't create database '${process.env.MYSQL_DBNAME}'; database exists`;
const existNotifyTable = `Table '${usersTables}' already exists`;
const cmdLine = `mysql --user=${process.env.MYSQL_USERNAME} --password=${process.env.MYSQL_PASSWORD} < ${__dirname}/${fileName}`;

cp.exec(cmdLine, (error, stdout, stderr) => {
    if (error) {
        if (error.message.includes(existsNotifyDB)) {
            console.log(existsNotifyDB);
            process.exit(0);
        }
        if (error.message.includes(existNotifyTable)) {
            console.log(existNotifyTable);
            process.exit(0);
        }
        console.error(error);
        process.exit(1);
    }

    process.exit(0);
});
