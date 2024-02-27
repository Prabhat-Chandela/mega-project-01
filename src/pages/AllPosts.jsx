import React, { useEffect } from 'react'
import { Container, Postcard } from "../components/index"
import  databaseService  from "../appwrite/database_service"
import { getAllPosts } from "../store/postSlice"
import { useSelector, useDispatch } from 'react-redux'

function AllPosts() {
    
    const allPosts = useSelector((state)=> state.post.allPosts);
    const dispatch = useDispatch();


    useEffect(() => {
        databaseService.getPosts([])
            .then((posts) => {
                if (posts) {
                    dispatch(getAllPosts(posts.documents))
                }
            })
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {allPosts.map((post) => (
                      <div key={post.$id} className='p-2 w-1/4'>
                        <Postcard post={post}/>
                      </div>

                            ))
                    }

                        </div>
            </Container>
        </div>
    )
}

export default AllPosts