import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DBservice from '../appwrite/dbConfig'
import { Container } from '../components'
import PostForm from '../components/post-Form/PostForm'

function EditPost() {
    const [post, setPost] = useState(null)
    const navigate = useNavigate()
    const  {slug} = useParams()

    useEffect(()=>{
        if(slug){
            DBservice.getPost(slug).then((post)=>{
                if(post){
                    setPost(post)
                }
            })
        }else{
            navigate('/');  
        }
    },[navigate, slug])
  return  post? (
        <div className='py-8'>
            <Container>
                {<PostForm post={post}/>}
            </Container>
        </div>
  ) : null
}

export default EditPost