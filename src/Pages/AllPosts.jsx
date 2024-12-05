import React, { useEffect, useState } from 'react'
import DBservice from '../appwrite/dbConfig'
import { Container } from '../components'
import Postcard from '../components/PostCard'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        DBservice.getPosts([]).then((posts)=>{
            if(posts)
            setPosts(posts.document)
        })
    })

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post)=>(
                        <div key={post.$id} className='p-2 w-1/3'>
                            {<Postcard {...post}/>}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts