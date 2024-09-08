import { Document, model, models, Schema } from "mongoose";

export interface IProduct extends Document{
    _id:string;
    title:string;
    description:string;
    imageUrl?:string;
    createdAt:Date;
    updatedAt:Date;
    metaDescription:string;
    price:number;
    count:number;
    isActive:boolean;
    category?:{_id:string,name:string};
    organizer:{_id:string,firstName:string,lastName:string};
}

const ProductSchema=new Schema({
    title:{type:String,require:true},
    description:{type:String,required:true},
    imageUrl:{type:String},
    createdAt:{type:Date},
    updatedAt:{type:Date},
    metaDescription:{type:String,required:true},
    price:{type:Number,required:true},
    count:{type:Number,required:true},
    isActive:{type:Boolean,default:true},
    category:{type:Schema.Types.ObjectId,ref:'ProductCategory'},
    organizer:{type:Schema.Types.ObjectId,ref:'User'}
})

const Product=models?.Product || model('Product',ProductSchema);

export default Product;