var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment =require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds")

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")


var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_final";


mongoose.connect(url,{ useNewUrlParser: true });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname +"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();


app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave:false,
    saveUninitialized: false
}))
app.locals.moment=require("moment");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campground", campgroundRoutes);
app.use("/campground/:id/comments",commentRoutes);

// Campground.create({
//     name: "Wye Valley",
//     image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"
//     },function(err, campground){
//         if(err){
//              console.log(err);
//         }
//         else {
//             console.log("Newly created Campground: ");
//             console.log(campground);
//         }
//     });

// var campgrounds = [
//     { name: "Wye Valley", image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg" },
//     { name: "Jenny Lake", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg" },
//     { name: "Wind River", image: "https://farm2.staticflickr.com/1287/4670981254_5654b5dd25.jpg" }
// ];


if(url==="mongodb://localhost/yelp_camp_final"){
    app.listen(3000, function () {
        console.log("The server has started!!");
    });
}else{
    app.listen(process.env.PORT,process.env.IP, function () {
        console.log("The server has started!!");
    });
}