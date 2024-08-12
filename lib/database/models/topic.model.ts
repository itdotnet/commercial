import { Document, model, models, Schema } from "mongoose";

export interface ITopic extends Document{
    _id:string;
    title:string;
    description:string;
    imageUrl?:string;
    metaDescription:string;
    isActive:boolean;
    category?:{_id:string,name:string};
    organizer:{_id:string,firstName:string,lastName:string};
}

const TopicSchema=new Schema({
    title:{type:String,require:true},
    description:{type:String,required:true},
    imageUrl:{type:String},
    metaDescription:{type:String,required:true},
    isActive:{type:Boolean,default:true},
    category:{type:Schema.Types.ObjectId,ref:'Category'},
    organizer:{type:Schema.Types.ObjectId,ref:'User'}
})

const Topic=models.Topic || model('Topic',TopicSchema);

export default Topic;