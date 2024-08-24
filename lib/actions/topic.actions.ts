'use server'

import { CreateTopicParams, DeleteTopicParams, GetAllTopicsParams, UpdateTopicParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Topic from "../database/models/topic.model";
import { revalidatePath } from "next/cache";
import Category from "../database/models/category.model";

const getCategoryByName=async (name:string)=>{
    return Category.findOne({name:{$regex:name,$options:'i'}});
}

const populateTopic = (query:any)=>{
    return query
        .populate({path:'organizer',model:User,select:'_id firstName lastName'})
        .populate({path:'category',model:Category,select:'_id name'})
}

//CREATE
export async function createTopic({userId,topic,path}:CreateTopicParams){
    try{
        await connectToDatabase();

        const organizer = await User.findById(userId);
        if(!organizer) throw new Error('Organizer not found');

        const newTopic=await Topic.create({...topic,category:topic.categoryId!?topic.categoryId:null,organizer:userId});
        revalidatePath(path);

        return JSON.parse(JSON.stringify(newTopic));
    } catch(error) {
        handleError(error);
    }
}

//UPDATE
export async function updateTopic({userId,topic,path}:UpdateTopicParams) {
    try{
        await connectToDatabase();

        const topicToUpdate=await Topic.findById(topic._id);
        if(!topicToUpdate || topicToUpdate.organizer.toHexString()!=userId){
            throw new Error('Unathorize or topic not found');
        }

        const updatedTopic=await Topic.findByIdAndUpdate(
            topic._id,
            {...topic,category:topic.categoryId},
            {new:true}
        );
        revalidatePath(path);

        return JSON.parse(JSON.stringify(updatedTopic));
    } catch(error) {
        handleError(error);
    }
}

//GET ONE TOPIC BY ID
export async function getTopicById(topicId:string){
    try {
        await connectToDatabase();

        const topic=await populateTopic(Topic.findById(topicId));

        if(!topic) throw new Error('Topic not found');

        return JSON.parse(JSON.stringify(topic));
    } catch (error) {
        handleError(error);
    }
}

//GET ALL TOPICS
export async function getAllTopics({query,category,limit=10,page}:GetAllTopicsParams){
    try {
        await connectToDatabase();

        const titleCondition=query?{title:{$regex:query,$options:'i'}}:{};
        const categoryCondition=category?await getCategoryByName(category):null;
        const conditions={
            $and:[titleCondition,categoryCondition?{category:categoryCondition._id}:{}]
        }

        const skipAmount=(Number(page-1)*limit);
        const topicsQuery=Topic.find(conditions)
            .sort({createdAt:'desc'})
            .skip(skipAmount)
            .limit(limit);

        const topics=await populateTopic(topicsQuery);
        const topicsCount=await Topic.countDocuments(conditions);

        return{
            data:JSON.parse(JSON.stringify(topics)),
            totalPages:Math.ceil(topicsCount/limit)
        }
    } catch (error) {
        handleError(error);
    }
}

//DELETE TOPIC
export async function deleteTopic({topicId,path}:DeleteTopicParams) {
    try {
        await connectToDatabase();

        const deleteTopic=await Topic.findByIdAndDelete(topicId);
        if(deleteTopic) revalidatePath(path);
    } catch (error) {
        handleError(error);
    }
}