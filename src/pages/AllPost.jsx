import React, { useEffect, useState } from 'react'
import service from '../appwrite/Config'
import { Container, PostCard } from '../components'

function AllPost() {
    const [posts, setPosts] = useState([])
    useEffect(() => { }, [])
    service.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
    return (
        <div className='bg-zinc-700 min-h-[90vh]'>
        <Container>
            <div className='flex flex-wrap w-full'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
    )
}

export default AllPost
