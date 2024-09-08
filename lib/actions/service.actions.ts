'use server'

import { CreateTopicParams, DeleteTopicParams, GetAllTopicsParams, UpdateTopicParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import { revalidatePath } from "next/cache";
import Service from "../database/models/service.model";

const populateService = (query:any)=>{
    return query
        .populate({path:'organizer',model:User,select:'_id firstName lastName'})
}

//CREATE
export async function createService({userId,topic,path}:CreateTopicParams){
    try{
        await connectToDatabase();

        const organizer = await User.findById(userId);
        if(!organizer) throw new Error('Organizer not found');

        const newTopic=await Service.create({...topic,organizer:userId});
        revalidatePath(path);

        return JSON.parse(JSON.stringify(newTopic));
    } catch(error) {
        handleError(error);
    }
}

//UPDATE
export async function updateService({userId,topic,path}:UpdateTopicParams) {
    try{
        await connectToDatabase();

        const serviceToUpdate=await Service.findById(topic._id);
        if(!serviceToUpdate){
            throw new Error('service not found');
        }

        const updatedService=await Service.findByIdAndUpdate(
            topic._id,
            {...topic,category:topic.categoryId},
            {new:true}
        );
        revalidatePath(path);

        return JSON.parse(JSON.stringify(updatedService));
    } catch(error) {
        handleError(error);
    }
}

//GET ONE SERVICE BY ID
export async function getServiceById(serviceId:string){
    try {
        await connectToDatabase();

        const topic=await populateService(Service.findById(serviceId));

        if(!topic) throw new Error('Service not found');

        return JSON.parse(JSON.stringify(topic));
    } catch (error) {
        handleError(error);
    }
}

//GET ALL SERVICES
export async function getAllServices(){
    try {
        await connectToDatabase();

        const servicesQuery=Service.find()

        const services=await populateService(servicesQuery);

        return JSON.parse(JSON.stringify(services));
    } catch (error) {
        handleError(error);
    }
}

//DELETE SERVICE
export async function deleteService({topicId,path}:DeleteTopicParams) {
    try {
        await connectToDatabase();

        const deleteService=await Service.findByIdAndDelete(topicId);
        if(deleteService) revalidatePath(path);
    } catch (error) {
        handleError(error);
    }
}