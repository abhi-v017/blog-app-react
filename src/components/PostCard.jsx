import React from 'react'
import service from '../appwrite/Config'
import { Link } from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='rounded-lg bg-zinc-600 border-x-2 border-blue-700'>
            <div className='w-full p-1'>
                <img className='rounded-xl p-1 border-y-2 border-blue-700' src={service.getFilePreview(featuredImage)} alt={title} />
            </div>
            <h2 className='font-bold text-lg text-white text-center p-2'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard

