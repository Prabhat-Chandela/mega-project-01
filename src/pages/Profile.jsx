import React, { useEffect } from 'react';
import dabaseService from '../appwrite/database_service';
import { Container, Postcard } from '../components/index';
import { getUserPosts } from '../store/postSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';

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

                <main className='w-full'>


                    <section className='w-full h-[300px] bg-black rounded-xl grid gap-3 p-3 sm:grid-cols-12 shadow-md overflow-hidden'>

<div className='sm:col-span-4 h-full p-3 overflow-hidden'>
<img className='w-28 h-28 object-cover rounded-full drop-shadow-md' src="\profileImage.jpg" alt="profileImage" />
</div>

<div className='sm:col-span-8 p-3 flex flex-col'>
 
<div className='w-full flex flex-col gap-3'>
    <h2 className='sm:text-3xl text-white'>{userData.name}</h2>
    <h4 className=' text-[#fff] text-lg flex items-center w-fit justify-center gap-2'><span><MdEmail /></span> {userData.email}</h4>
</div>

<div></div>

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