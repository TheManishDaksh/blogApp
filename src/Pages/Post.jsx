import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams,Link } from 'react-router-dom'
import DBservice from '../appwrite/dbConfig'
import { Container } from '../components'
import Button from '../components/Button'
import parse from "html-react-parser"

function Post() {

    const [post,setPost] = useState(null)
    const navigate = useNavigate()
    const {slug} = useParams()

    const userData = useSelector((state)=> state.auth.userData)
    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(()=>{
        if(slug){
            DBservice.getPost(slug).then((post)=>{
                if(post){
                    setPost(post)
                }else{
                    navigate('/')
                }
            })
        }else{
            navigate('/')
        }
    },[slug,navigate])
  return post?(
    <div>
        <Container>
            <div>
                <img src={DBservice.getFilereview(post.featuredImage)} alt={post.title} className='rounded-xl'/>
                {isAuthor && (
                    <div className='absolute right-6 top-6'>
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-6">
                                Edit
                            </Button>
                        </Link>
                        <Button onClick = {deletePost} bgColor = "bg-red 500 ">
                            Delete
                        </Button>
                    </div>
                )}

            </div>
            <div className='w-full mb-6'>
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div >
            <div className='browser-css'>
                {parse(post.content)}
            </div>
        </Container>
    </div>
  ): navigate('/')
}

export default Post