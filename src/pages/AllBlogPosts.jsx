import React, { useEffect } from 'react';
import { Postcard, Inputbox, SecondaryButton } from "../components/index";
import databaseService from "../appwrite/database_service";
import { getAllPosts } from "../store/postSlice";
import { useSelector, useDispatch } from 'react-redux';
import { FaSearch } from "react-icons/fa";

function AllPosts() {
    const dispatch = useDispatch();

    useEffect(() => {
        databaseService.getPosts([])
            .then((posts) => {
                if (posts) {
                    dispatch(getAllPosts({ allPosts: posts.documents }))
                }
            })
    }, [])

    const allPosts = useSelector((state) => state.post.allPosts);

    return (
        <div className='w-full py-8'>
     
                <section className='w-full p-3 lg:p-7'>

                    <div className='w-full flex gap-2 rounded-lg'>

                        <Inputbox className="border-white text-white"
                            label="Search Blog"
                            labelbg="bg-black"
                            labelTextCol="text-white"
                        />
                        <SecondaryButton><FaSearch /></SecondaryButton>

                    </div>

                </section>

                <section className='grid sm:grid-cols-12 p-3 lg:p-7'>
                    {allPosts ? (
                        allPosts.map((post) => (
                            <div key={post.$id} className='p-2 sm:col-span-6 lg:col-span-4 xl:col-span-3'>

                                <Postcard {...post} />
                            </div>
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}

                </section>
                
        </div>
    )
}

export default AllPosts