import React, { useEffect } from 'react'
import dabaseService from "../appwrite/database_service"
import { Container, Postcard } from "../components/index"
import { getUserPosts } from "../store/postSlice"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function YourPosts() {
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

                <section className='w-full  bg-orange-400 mb-6 sm:mb-3 sm:rounded-lg flex flex-col sm:grid sm:grid-cols-12 gap-5 sm:gap-2 px-9 py-7 sm:py-5'>

                    <div className='sm:col-span-5 w-full sm:w-[15vw] rounded-lg overflow-hidden'>
                        <img className='w-full' src="user.svg" alt="userImage" />
                    </div>

                    <div className='sm:col-span-7 sm:py-7'>
                        <h2 className='text-black w-full text-center sm:text-start text-xl sm:text-[3.5vw] font-bold sm:mb-7'>Welcome ! {userData.name}</h2>
                        <p className='hidden sm:block font-semibold text-amber-100 text-[1.7vw] min-[1100px]:text-[2vw] w-[90%] leading-8 min-[1100px]:leading-10'>User <span className='text-orange-300 bg-black px-2 py-1 text-[1.1vw] min-[1100px]:text-[1.3vw] rounded-md'>{userData.email}</span> , a proud member of the PrabhatBlogs community.
                        </p>
                        <p></p>
                    </div>


                </section>

                <section className='flex flex-col mb-5 sm:mb-0 sm:flex-row px-9 sm:px-0 flex-wrap'>
                    {userPosts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </section>
            </Container>
        </div>
    )

}

export default YourPosts;