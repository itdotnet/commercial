import { Document, model, models, Schema } from "mongoose";

export interface IService extends Document{
    _id:string;
    title:string;
    description:string;
    imageUrl?:string;
    createdAt:Date;
    updatedAt:Date;
    metaDescription:string;
    isActive:boolean;
    organizer:{_id:string,firstName:string,lastName:string};
}

const ServiceSchema=new Schema({
    title:{type:String,require:true},
    description:{type:String,required:true},
    imageUrl:{type:String},
    createdAt:{type:Date},
    updatedAt:{type:Date},
    metaDescription:{type:String,required:true},
    isActive:{type:Boolean,default:true},
    organizer:{type:Schema.Types.ObjectId,ref:'User'}
})

const Service=models?.Service || model('Service',ServiceSchema);

export default Service;