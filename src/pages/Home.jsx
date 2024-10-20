import React, { useState, useEffect } from 'react'
import '../App.css'
import service from '../appwrite/Config'
import { Container, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    if (posts.length === 0) {
        return (
            <div className='w-full bg-zinc-700 min-h-[90.1vh] flex justify-center items-center'>
                <Container>
                    <div className='flex flex-col gap-4'>
                        <h1 className='blog-font text-center py-4 text-zinc-400 border-y border-zinc-600 rounded-3xl'>blog</h1>
                        <h1 className='blog-font text-white text-center font-bold text-4xl py-4 border-y border-zinc-600 rounded-3xl'>
                            login to see the Posts!!
                        </h1>
                    </div>
                </Container>
            </div>
        )
    }

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

export default Home
