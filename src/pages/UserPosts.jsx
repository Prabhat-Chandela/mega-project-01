import React, { useEffect } from 'react'
import dabaseService from "../appwrite/database_service"
import { Container, Postcard } from "../components/index"
import { getUserPosts } from "../store/postSlice"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function UserPosts() {
    const navigate = useNavigate()
    const userStatus = useSelector((state) => state.auth.status);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {

        if (userStatus === false) {
            navigate('/signup')
        } else {
            dabaseService.getPosts([])
                .then((posts) => {
                    if (posts) {
                        let allPosts = posts.documents;
                        if (userData) {
                            let userPosts = allPosts.filter((post) => post.userId === userData.$id)
                            dispatch(getUserPosts({ userPosts: userPosts }))
                        }
                    }
                })
        }

    }, [userStatus])

    const userPosts = useSelector((state) => state.post.userPosts);

    if (userPosts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No Posts to read .
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>

                    <section className='w-full h-[30vh] bg-orange-400 mb-3 rounded-lg'>
                        <div className=''>
                            <img src="" alt="userImage" />
                        </div>

                        <div className=''>

                        </div>
                    </section>

                <section className='flex flex-wrap'>
                    {userPosts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </section>
            </Container>
        </div>
    )

}

export default UserPosts;