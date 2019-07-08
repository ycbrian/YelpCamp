var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Wye Valley",
        image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, repellat! Ratione atque eaque deserunt amet soluta? Libero, totam. Vel totam doloribus quod beatae magni vitae quo dolores deserunt natus iusto."
    },
    {
        name: "Jenny Lake",
        image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, repellat! Ratione atque eaque deserunt amet soluta? Libero, totam. Vel totam doloribus quod beatae magni vitae quo dolores deserunt natus iusto."
    },
    {
        name: "Wind River",
        image: "https://farm2.staticflickr.com/1287/4670981254_5654b5dd25.jpg",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, repellat! Ratione atque eaque deserunt amet soluta? Libero, totam. Vel totam doloribus quod beatae magni vitae quo dolores deserunt natus iusto."
    }
]

function seedDB(){
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");

        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err,comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    });
}

module.exports = seedDB;