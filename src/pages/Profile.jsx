import React, { useEffect, useState } from 'react';
import { Container, SecondaryButton, UserBlogPosts, UserSocialPosts } from '../components/index';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBookmark } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { IoMdAddCircle, IoMdAddCircleOutline } from "react-icons/io";
import { IoGrid, IoGridOutline } from "react-icons/io5";

function Profile() {
    const navigate = useNavigate()
    const userStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const [showBlogPost, setShowBlogPost] = useState(false);

    useEffect(() => {

        if (userStatus === false) {
            navigate('/signup')
        }

    }, [userStatus])

    return (
        <div className='w-full'>
            <Container>

                <main className='w-full flex flex-col gap-3'>

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

                    <section className='w-full p-3 lg:p-7 flex gap-5'>

                        <SecondaryButton textSize='text-sm lg:text-lg xl:text-xl' onClick={() => navigate('/add-social-post')}><span><IoMdAddCircle /></span> Add Post</SecondaryButton>

                        <SecondaryButton textSize='text-sm lg:text-lg xl:text-xl' onClick={() => navigate('/add-blog-post')}><span><IoMdAddCircleOutline /></span>Add Blog</SecondaryButton>
                        
                    </section>

                    <section className='flex flex-col gap-5 p-3 lg:p-7'>

                        <div className='w-full grid grid-cols-6 rounded-lg overflow-hidden shadow-xl bg-zinc-950 py-5'>
                            <button onClick={()=> setShowBlogPost(false)} className={`col-span-3 ${!showBlogPost?'text-orange-500' : 'text-white'} text-sm lg:text-lg xl:text-xl p-2 border-r border-white flex items-center justify-center gap-2`}><span><IoGrid /></span>Social Posts</button>

                            <button onClick={()=> setShowBlogPost(true)} className={`col-span-3 ${showBlogPost?'text-orange-500' : 'text-white'} text-sm lg:text-lg xl:text-xl  p-2 border-l border-white flex items-center justify-center gap-2`}><span><IoGridOutline /></span>Blog Posts</button>
                        </div>
                        {showBlogPost ? (<UserBlogPosts />) : (<UserSocialPosts/>)}
                    </section>


                </main>


            </Container>
        </div>
    )

}

export default Profile;