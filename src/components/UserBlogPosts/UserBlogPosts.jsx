import React, { useEffect } from 'react';
import dabaseService from '../../appwrite/database_service';
import { Postcard } from '../index';
import { getUserPosts } from '../../store/postSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UserBlogPosts() {
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

    return (
        <div className='w-full grid sm:grid-cols-12'>
            {userPosts.map((post) => (
                <div key={post.$id} className='p-2 sm:col-span-6 lg:col-span-4 xl:col-span-3'>
                    <Postcard {...post} />
                </div>
            ))}
        </div>
    )
}

export default UserBlogPosts;