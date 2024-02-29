import React from 'react'
import bucketService from '../../appwrite/bucket_service'
import{Link} from 'react-router-dom'

function Postcard({$id , title , featuredimage }) {
  return (
   <Link to={`/post/${$id}`}>
    <div className='w-full'>
      <div className='w-full'>
        <img src={bucketService.getFilePreview(featuredimage)} alt={title}/>
      </div>
      <h2>{title}</h2>
    </div>
   </Link>
  )
}

export default Postcard;