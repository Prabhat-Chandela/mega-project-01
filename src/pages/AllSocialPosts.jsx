import React, { useEffect } from 'react';
import { Inputbox, SecondaryButton } from "../components/index";
import { FaSearch } from "react-icons/fa";
import databaseService from '../appwrite/database_service';
import bucketService from '../appwrite/bucket_service';
import { getAllSocialPosts } from '../store/socialSlice';
import { useDispatch, useSelector } from 'react-redux';

function AllSocialPosts() {
  const dispatch = useDispatch();

  useEffect(() => {
    databaseService.getSocialPosts().then((posts) => {
      if (posts) {
        let allSocialPosts = posts.documents;
        dispatch(getAllSocialPosts({ allSocialPosts }));
      }
    })
  }, [])

  const allSocialPosts = useSelector(state => state.social.allSocialPosts);

  return (
    <div className='w-full py-8'>

      <section className='w-full p-3 lg:p-7'>

        <div className='w-full flex gap-2 rounded-lg'>

          <Inputbox className="border-white text-white"
            label="Search User"
            labelbg="bg-black"
            labelTextCol="text-white"
          />
          <SecondaryButton><FaSearch /></SecondaryButton>

        </div>

      </section>

      <section className='w-full grid grid-cols-12 p-3 lg:p-7'>
        {allSocialPosts ? (
          allSocialPosts.map((post) => (
            <div key={post.$id} className='border border-white col-span-6 sm:col-span-3 overflow-hidden'>
              <img className='w-full object-cover' src={bucketService.getSocialFilePreview(post.socialpostimage)} alt={post.caption} />
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}

      </section>

    </div>
  )
}

export default AllSocialPosts;