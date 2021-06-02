require("./api/data/db.js");
var express=require("express");
var app=express();
const path=require("path");
app.use(express.urlencoded({extended  : false}));
app.use(express.json());
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));


const routes=require("./api/routers");
app.set("port",5000);
app.use(express.static(path.join(__dirname,"public")));

app.use("/",routes);

var server=  app.listen(app.get("port"),  function() {
    var port= server.address().port;
    console.log("Listening  to port "+ port);
});
