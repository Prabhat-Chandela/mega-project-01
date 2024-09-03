import React from 'react'
import bucketService from '../../appwrite/bucket_service'
import { useNavigate } from 'react-router-dom'
import { FaLocationArrow } from "react-icons/fa6";
import {Button} from '../index';

function Postcard({ $id, title, featuredimage }) {
  const navigate = useNavigate();

  return (
      <div className='w-full flex flex-col  bg-white rounded-lg overflow-hidden p-2'>
        <div className='w-full h-[25vh] overflow-hidden rounded-lg '>
          <img className='object-cover w-full h-full ' src={bucketService.getFilePreview(featuredimage)} alt={title} />
        </div>
        <div className='w-full flex justify-between items-center px-5 py-3'>
          <h4 className='text-center font-semibold flex  text-black text-sm lg:text-lg xl:text-xl'>{title.slice(0,15)}... </h4>
          <Button onClick={()=>navigate(`/blog-post/${$id}`)}><FaLocationArrow /></Button>
        </div>
      </div>
  )
}

export default Postcard;