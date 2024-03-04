import React, { useEffect, useState } from 'react'
import { Container, Postcard } from "../components/index"
import databaseService from "../appwrite/database_service"
import { getAllPosts } from "../store/postSlice"
import { useSelector, useDispatch } from 'react-redux'

function AllPosts() {
    const dispatch = useDispatch();

    useEffect(() => {
        databaseService.getPosts([])
            .then((posts) => {
                if (posts) {
                    dispatch(getAllPosts({ allPosts: posts.documents }))
                }
            })
    }, [])

    const allPosts = useSelector((state) => state.post.allPosts);

    return (
        <div className='w-full py-8'>
            <Container>

                <section className='w-full  bg-orange-400 mb-6 sm:mb-3 sm:rounded-lg flex flex-col sm:grid sm:grid-cols-12 gap-5 sm:gap-2 px-9 py-7 sm:py-5'>

                    <div className='sm:col-span-5 w-full sm:w-[15vw] rounded-lg overflow-hidden'>
                        <img className='w-full' src="blogs.svg" alt="blogsImage" />
                    </div>

                    <div className='sm:col-span-7 sm:py-7'>
                        <h2 className='text-black w-full text-center sm:text-start text-xl sm:text-[3.5vw] font-bold sm:mb-7'>Welcome To <span className='bg-black text-orange-300 px-2 sm:px-5 py-2 sm:py-3 text-sm sm:text-[2vw] rounded-lg'>PrabhatBlogs !</span> </h2>
                        <p className=' hidden sm:block font-semibold text-amber-100 text-lg w-full leading-7'>You can buy attention, You can beg for attention from the media Or you can earn attention by creating something interesting and valuable and then publishing it online for free. <span className='text-black'>~David Meerman Scott</span>
                        </p>
                        <p></p>
                    </div>


                </section>

                <div className='flex flex-col sm:flex-row px-9 sm:px-0 flex-wrap'>
                    {allPosts ? (
                        allPosts.map((post) => (
                            <div key={post.$id} className='p-2 w-full sm:w-1/4'>

                                <Postcard {...post} />
                            </div>
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}

                </div>
            </Container>
        </div>
    )
}

export default AllPosts