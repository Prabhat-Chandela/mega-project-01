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

    console.log(userData)
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

                <section className='w-full  bg-orange-400 mb-3 rounded-lg grid grid-cols-12 gap-5 px-9 py-5'>

                    <div className='col-span-5 w-[15vw]'>
                        <img className='w-full' src="hero.svg" alt="userImage" />
                    </div>

                    <div className='col-span-7'>
                        <h2 className='text-black text-[3.5vw] font-bold mb-7'>Welcome ! {userData.name}</h2>
                        <p className='font-semibold text-amber-100 text-xl w-[70%] leading-10'>User <span className='text-orange-300 bg-black px-2 py-1 text-sm rounded-md'>{userData.email}</span> , a proud member of the PrabhatBlogs community.
                        </p>
                        <p></p>
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