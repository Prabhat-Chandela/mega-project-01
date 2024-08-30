import React, { useEffect } from 'react';
import dabaseService from '../appwrite/database_service';
import { Container, Postcard } from '../components/index';
import { getUserPosts } from '../store/postSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBookmark } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";

function Profile() {
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
        <div className='w-full'>
            <Container>

                <main className='w-full flex flex-col gap-10'>


                    <section className='w-full grid gap-3 sm:gap-7 p-3 lg:p-7 sm:grid-cols-12 shadow-md overflow-hidden'>

                        <div className='sm:col-span-5 p-2 overflow-hidden bg-white rounded-xl shadow-md flex lg:gap-5'>

                            <img className='w-20 lg:w-28 object-cover rounded-xl drop-shadow-md' src="\profileImage.jpg" alt="profileImage" />

                            <div className='flex flex-col justify-between lg:justify-normal lg:gap-5 p-3'>

                                <h4 className='text-black text-sm lg:text-lg xl:text-xl flex items-center gap-1'><span className=' text-orange-500'><FaUserCircle /></span> {userData.name}</h4>
                                <h4 className='text-black text-sm lg:text-lg xl:text-xl flex items-center gap-1'><span className=' text-orange-500'><MdAlternateEmail /></span> {userData.email}</h4>

                            </div>

                        </div>

                        <div className='sm:col-span-7 px-3 py-5 sm:p-3 flex flex-col items-center justify-center bg-white rounded-xl shadow-md'>

                            <div className='w-full flex items-center justify-center gap-7 sm:gap-10 lg:gap-16 xl:gap-20'>

                                <div className='flex flex-col items-center justify-center gap-5'>
                                    <h4 className='text-black text-sm lg:text-lg xl:text-xl flex items-center justify-center'>0</h4>
                                    <button className='text-black text-sm lg:text-lg xl:text-xl flex items-center gap-2 hover:text-orange-500 font-semibold'><span className=' text-orange-500'><FaUserCircle /></span> Followers</button>
                                </div>

                                <div className='flex flex-col gap-5'>
                                    <h4 className='text-black text-sm lg:text-lg xl:text-xl flex items-center justify-center'>0</h4>
                                    <button className='text-black text-sm lg:text-lg xl:text-xl flex items-center gap-2 hover:text-orange-500 font-semibold'><span className=' text-orange-500'><FaRegCircleUser /></span> Following</button>
                                </div>

                                <div className='flex flex-col gap-5'>
                                    <h4 className='text-black text-sm lg:text-lg xl:text-xl flex items-center justify-center'>0</h4>
                                    <button className='text-black text-sm lg:text-lg xl:text-xl flex items-center gap-2 hover:text-orange-500 font-semibold'><span className=' text-orange-500'><FaBookmark /></span> Saves</button>
                                </div>

                            </div>

                        </div>

                    </section>

                    <section className='flex flex-col mb-5 sm:mb-0 sm:flex-row px-9 sm:px-0 flex-wrap'>
                        {userPosts.map((post) => (
                            <div key={post.$id} className='p-2 w-full sm:w-1/4'>
                                <Postcard {...post} />
                            </div>
                        ))}
                    </section>


                </main>


            </Container>
        </div>
    )

}

export default Profile;