const mongoose = require("mongoose");

const CategorieSchema = new mongoose.Schema(
   {
      name:{
          type:String,
          required:true,
      },
},
{ timestamps:true}
);
module.exports = mongoose.model("Categorie",CategorieSchema);
