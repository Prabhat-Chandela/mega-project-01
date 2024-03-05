import React from 'react'
import {Container , PostForm} from "../components/index"

function AddPost() {
  return (
    <div className='py-8 bg-orange-400 '>
        <Container>
            <PostForm/>
        </Container>
    </div>
  )
}

export default AddPost