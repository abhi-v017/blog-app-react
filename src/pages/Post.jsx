import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/Config'
import { Container } from '../components'
import parse from 'html-react-parser'
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData);
    console.log(userData)

    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post)
                else navigate('/')
            })
        } else navigate('/')
    }, [slug, navigate])
    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage)
                navigate('/')
            }
        })
    }
    return post ? (
        <div>
            <Container>
                <div className='bg-zinc-700 flex flex-col gap-4 items-center min-h-[90vh]'>
                    <div className='flex justify-center py-4 w-1/4'>
                        <img className=' border-y border-zinc-500 rounded-xl' src={service.getFilePreview(post.featuredImage)} alt={post.title} />
                    </div>
                    {isAuthor && (
                        <div className=''>
                            <Link to={`/edit-post/${post.$id}`}>
                                <button className="mr-3 bg-green-600 px-2 py-1 font-bold rounded-xl w-16 hover:bg-green-700 hover:shadow-xl text-zinc-200">
                                    Edit
                                </button>
                            </Link>
                            <button onClick={deletePost} className='bg-red-600 px-2 py-1 font-bold rounded-xl w-16  hover:bg-red-700 hover:shadow-xl text-zinc-200' >Delete</button>
                        </div>
                    )}
                    <div className=" mb-6">
                        <h1 className="text-2xl font-bold text-center text-zinc-50 p-2 border-b border-zinc-500 rounded-lg">{post.title}</h1>
                    </div>
                    <div className="browser-css text-zinc-100 border-y border-blue-700 p-4 rounded-lg">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null
}
