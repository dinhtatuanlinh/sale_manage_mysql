// kéo thư viện sequelize vào
const Sequelize = require('sequelize');
// tạo kết nối tới database
const connection = new Sequelize(
    'sale_manage_mysql',
    'root',
    null, {
        dialect: 'mysql',
        host: 'localhost',
        logging: false // không hiện câu lệnh sql trong terminal
    }
);
let connectDB = async() => {
    try {
        // test kết nối tới database thành công thì in ra sai thì chạy hàm catch
        await connection.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
connectDB();
module.exports = connection;