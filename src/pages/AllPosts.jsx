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
                <div className='flex flex-wrap'>
                    {allPosts ? (
                        allPosts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>

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