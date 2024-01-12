import mongoose from 'mongoose'


export interface ICategory extends Document {
    _id: string;
    name: string;
  }

  

// schema
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    }
})


const Category = mongoose.models.Category || mongoose.model('Category', categorySchema)

export default Category
