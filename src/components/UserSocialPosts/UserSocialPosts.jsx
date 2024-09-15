import React, {useEffect} from 'react';
import databaseService from '../../appwrite/database_service';
import bucketService from '../../appwrite/bucket_service';
import {getUserSocialPosts} from '../../store/socialSlice';
import {useSelector, useDispatch } from 'react-redux';
import {useNavigate } from 'react-router-dom';

function UserSocialPosts() {
    const userData = useSelector(state => state.auth.userData);
    const userStatus = useSelector(state => state.auth.status);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(userStatus === false){
            navigate('/signup');
        } else {
            databaseService.getSocialPosts().then((posts)=>{
                if(posts){
                    let allPosts = posts.documents;
                    if(userData){
                        let userSocialPosts = allPosts.filter((post)=> post.creatorId === userData.$id);
                        dispatch(getUserSocialPosts({userSocialPosts}));
                    }
                }
            })
        }
    },[userStatus])

    const userSocialPosts = useSelector(state => state.social.userSocialPosts);

  return (
    <div className='w-full grid grid-cols-12'>
        {userSocialPosts.map((post)=>(
            <div key={post.$id} className='border border-white col-span-6 sm:col-span-3 overflow-hidden'>
                <img className='w-full object-cover' src={bucketService.getSocialFilePreview(post.socialpostimage)} alt={post.caption} />
            </div>
        ))

        }
    </div>
  )
}

export default UserSocialPosts;