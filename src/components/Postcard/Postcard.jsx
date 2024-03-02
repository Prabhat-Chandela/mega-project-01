import React from 'react'
import bucketService from '../../appwrite/bucket_service'
import { Link } from 'react-router-dom'

function Postcard({ $id, title, featuredimage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full flex flex-col  bg-orange-400 rounded-lg overflow-hidden p-2'>
        <div className='w-full h-[25vh] overflow-hidden rounded-lg '>
          <img className='object-cover w-full h-full ' src={bucketService.getFilePreview(featuredimage)} alt={title} />
        </div>
        <div className='w-full flex justify-center items-center p-5'>
          <h2 className='text-center font-semibold bg-black text-orange-300 text-sm px-5 py-2 rounded-md'>{title}</h2>
        </div>
      </div>
    </Link>
  )
}

export default Postcard;