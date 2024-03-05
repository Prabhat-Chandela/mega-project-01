import React, { useEffect } from 'react'
import dabaseService from "../appwrite/database_service"
import { Button, Container, Postcard } from "../components/index"
import { getRecentPosts } from "../store/postSlice"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { VscArrowSmallRight } from "react-icons/vsc";

function Home() {
    const navigate = useNavigate()
    const userStatus = useSelector((state) => state.auth.status);
    const dispatch = useDispatch();

    useEffect(() => {

        if (userStatus === false) {
            navigate('/signup')
        } else {
            dabaseService.getPosts([])
                .then((posts) => {
                    if (posts) {
                        let recentPosts = posts.documents.reverse();
                        dispatch(getRecentPosts({ recentPosts: recentPosts }))
                    }
                })
        }

    }, [userStatus])

    const recentPosts = useSelector((state) => state.post.recentPosts);


    if (recentPosts.length === 0) {
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
                <div className='flex flex-col gap-y-14'>
                    <section className='flex flex-col-reverse sm:flex-row justify-between sm:px-10 sm:gap-9'>

                        <div className=' w-full sm:w-1/2 px-5 sm:px-3 py-5 flex flex-col gap-5 sm:gap-12 '>
                            <h1 className='w-full text-black font-bold text-2xl sm:leading-[5vw] sm:text-[4.3vw]'>Tomorrow is for the Taking</h1>
                            <p className='w-full sm:w-[75%] text-sm sm:text-lg'>Welecome to this fast growing community of fellow bloggers , where people share there thoughts and Knowledge in the form of blog posts .</p>
                            <Button className={'font-semibold flex justify-center items-center gap-1 hover:bg-black hover:text-orange-300'} onClick={()=>{navigate('/add-post')}}>Get Started <span><VscArrowSmallRight /></span></Button>
                        </div>
                        <div className='w-full sm:w-2/6 flex justify-center items-center'>
                            <img src="hero.svg" alt="heroImage" />
                        </div>

                    </section>

                    <section className='flex flex-col gap-3 bg-orange-400 py-5 relative w-full'>
                        <h3 className='text-black rounded-lg uppercase font-bold absolute  -top-5 bg- text-md bg-orange-400 px-5 py-2 sm:text-lg mx-auto'>New posts of the Week</h3>

                        <div className='flex flex-col sm:flex-row flex-wrap px-7 sm:px-0'>
                        {recentPosts.slice(0, 4).map((post) => (
                            <div key={post.$id} className='py-3 sm:p-2 w-full sm:w-1/4'>
                                <Postcard {...post} />
                            </div>
                        ))}
                        </div>
                    </section>
                </div>
            </Container>
        </div>
    )


}

export default Home;