
import config from "../conf/config";
import {ID, Databases, Client, Storage, Query} from "appwrite" ;

export class dbService {
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(config.url)
        .setProject(config.ProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                config.dbId,
                config.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    userId,
                    status,
                }
            )
        }catch(err){
            throw err;
        }
    }

    async updatePost({title,content,featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                config.dbId,
                config.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }catch(err){
            throw err ;
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                config.dbId,
                config.collectionId,
                slug
            )
            return true;
        }catch(err){
            console.log("error in deleting post",err);
            return false
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                config.dbId,
                config.collectionId,
                slug
            )
        }catch(err){
            throw err 
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                config.dbId,
                config.collectionId,
                queries
            )
        }catch(err){
            throw err
        }
    }

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                config.bucketId,
                ID.unique(),
                file
            )
        }catch(err){
            console.log("error in uploading file",err);
            
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                config.bucketId,
                fileId
            )
            return true
        }catch(err){
            console.log("error in delete",err);
            return false
        }
    }

    getFilereview(fileId){
        try{
            this.bucket.getFilereview(
                config.bucketId,
                fileId
            )
        }catch(err){
            throw err 
        }
    }
}

const DBservice = new dbService()
export default DBservice;