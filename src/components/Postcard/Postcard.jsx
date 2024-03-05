import React from 'react'
import bucketService from '../../appwrite/bucket_service'
import { Link } from 'react-router-dom'
import { VscArrowSmallRight } from "react-icons/vsc";

function Postcard({ $id, title, featuredimage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full flex flex-col  bg-orange-400 rounded-lg overflow-hidden p-2'>
        <div className='w-full h-[25vh] overflow-hidden rounded-lg '>
          <img className='object-cover w-full h-full ' src={bucketService.getFilePreview(featuredimage)} alt={title} />
        </div>
        <div className='w-full flex justify-between items-center px-5 py-3'>
          <h2 className='text-center font-semibold flex  text-amber-100 text-md  rounded-md'>{title.slice(0,15)}... </h2>
          <div className='bg-black text-orange-400 px-2 py-1 rounded-md'><VscArrowSmallRight /></div>
        </div>
      </div>
    </Link>
  )
}

export default Postcard;