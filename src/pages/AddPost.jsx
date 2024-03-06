import React from 'react'
import {Container , PostForm} from "../components/index"

function AddPost() {
  return (
    <div className='py-8 bg-transparent '>
        <Container>
          <div className='w-full  bg-orange-400 mb-6 sm:mb-3 sm:rounded-lg flex flex-col sm:grid sm:grid-cols-12 gap-5 sm:gap-2 px-9 py-7 sm:py-5'>

            <div className='sm:col-span-5 w-full h-full sm:w-[16vw]  rounded-lg overflow-hidden'>
              <img className='w-full h-full' src="addblog.svg" alt="addBlog" />
            </div>
            
            <div className='sm:col-span-7 sm:py-7 flex flex-col min-[1100px]:gap-3 '>
                        <h2 className='text-black w-full text-center sm:text-start text-xl sm:text-[3.5vw] font-bold sm:mb-7'>Add a new BlogPost ! </h2>
                        <p className=' hidden sm:block font-semibold text-amber-100 text-[1.5vw] w-[90%] leading-5 min-[1100px]:leading-7'>Creativity is seeing what others see and thinking what no one else ever thought. Be creative !
                        </p>
                        <p></p>
                    </div>
          </div>
            <PostForm/>
        </Container>
    </div>
  )
}

export default AddPost