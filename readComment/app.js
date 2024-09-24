const express = require("express");
const app = express();
const port = process.env.port || 3000;
const path = require("node:path");
const routes = require("./routes");

const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/", routes.home);
app.use("/user", routes.user);


app.listen(port, ()=> {console.log(`port open on ${port}`)});