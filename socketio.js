const express = require("express");
// thư viện giúp lấy biến truyền bằng phương thức get use?id=?
const bodyParser = require("body-parser");
// import thu vien dotenv goi ham config() để lấy ra các biến môi trường
require('dotenv').config();
// cai dat socket.io
const socket_io = require('socket.io');
// package check login passport
const passport = require('passport');
// express-flash-notification hiển thị thông báo phải dùng kèm với cookie-parser và express-session
const flash = require('express-flash-notification');
const cookieParser = require('cookie-parser');
const session = require('express-session');


global.__base = __dirname + '/';
global.__pathConfig = __base + 'config/';
const viewEngine = require(__pathConfig + "viewEngine");
let app = express();
let router = express.Router();
// socket.io
var io = socket_io();
app.io = io;
app.use(cookieParser());
// set session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //     // đặt thời gian tồn tại của cookie
    //     maxAge: 5 * 60 * 1000
    // }
}));
// set passport
app.use(passport.initialize());
app.use(passport.session());
// cài đặt cho flash truyền vào app trong hàm flash() tham số thứ 2 là file lưu giao diện flash
app.use(flash(app, { viewName: 'inc/elements/flash' }));

io.on('connection', (socket) => { console.log('a user connected'); });
// use midleware bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("./public")); // cấu hình đường link static để khi truy cập vào ten miền sẽ truy cập thẳng vào file public
// cấu hình view engine
app.set("view engine", "ejs");
// cấu hình đường link tới thư mục views
app.set("views", "./views");
app.use('/', () => {
    router.get(
        '/logout',
        (req, res, next) => { registerController.getLogout(req, res, next) }
    );
});
// lấy tham số trong file .env môi trường
let port = process.env.PORT || 6969; // ||hoặc
// PORT === undefined thì gán vào 6969

app.listen(port, () => {
    console.log("app is running at port: http://localhost:" + port);
})