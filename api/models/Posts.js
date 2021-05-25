const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema({
   
       Title:{
       type:String,
       required:true,
       unique:true
   },
   Desc:{
    Title:String,
    required:true,
   },
   Photo:{
    Title:String,
    required:false,
   },
   username:{
    Title:String,
    required:true,
   },
   categories:{
       type:Array,
       required:false
       
   },
},
{ timestamps:true}
);
module.exports = mongoose.model("Post",PostSchema);
