import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, TextEditor, Select } from "../index";
import DBservice from "../../appwrite/dbConfig";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({post}) {
    
    const {register, handleSubmit, watch, setValue, getValues, control} = useForm({
        defaultValues : {
            title : post?.title || "",
            slug : post?.$id || "",
            content : post?.content || "",
            status : post?.status || ""
        }
    })  

    const navigate = useNavigate()
    const userData = useSelector((state)=> state.auth.userData)

    const submit = async(data)=>{
        if(post){
            const file = data.image[0] ? await DBservice.uploadFile(data.image[0]) : null
            if(file){
                DBservice.deleteFile(post.featuredImage)
            }

            const dbpost = await DBservice.updatePost(post.$id,{
                ...data,
                featuredImage : file? file.$id : undefined
            })
            if(dbpost){
                navigate(`/post/${dbpost.$id}`)
            }
        }else{
            const file = await DBservice.uploadFile(data.image[0])
            if(file){
                const fileId = file.$id
                data.featuredImage = fileId
                const dbpost = await DBservice.createPost({...data, userId : userData.$id})

                if(dbpost){
                    navigate(`/post/${dbpost.$id}`)
                }
            }
        }
    }

    const slugTrasnformer = useCallback((value)=>{
        if(value && typeof value === "string"){
            return value
            .trim(),toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");
        }
        return "";
    },[])

    useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if(name === "title"){
                setValue("slug", slugTrasnformer(value.title),{shouldValidate:true})
            }
        })
        return ()=> subscription.unsubscribe()
    },[slugTrasnformer,setValue, watch])
    
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
            <Input 
            label = "title : "
            placeholder = "title"
            className = "mb-4"
            {...register("title",{required : true})}
            />

            <Input
            label = "slug :"
            placeholder = "slug"
            className = "mb-4"
            {...register("slug",{required : true})}
            />

            <TextEditor 
            name= "content :" label= "content :" control={control} defaultValue={getValues("content")}
            />
            </div>
            <div className="w-1/3 px-2">
                <Input
                label = "image :"
                type = "file"
                className = "mb-4"
                accept = "image/png, image/jpeg, image/jpg, image/gif"
                {...register("image",{required : true})}
                />
                {post && (
                    <div>
                        <img src={DBservice.getFilereview(post.featuredImage)}
                         alt={post.title}
                         className="rounded-lg" />
                    </div>
                )}

                <Select
                options = {["active","inactive"]}
                label = "Status :"
                className = "mb-4"
                {...register("status",{required : true})}
                />

                <Button type="submit" bgColor={post? "bg-green-500" : undefined}
                className="w-full"
                >
                    {post ? "update" : "submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm