import React, { useEffect} from 'react'
import dabaseService from "../appwrite/database_service"
import { Container, Postcard } from "../components/index"
import { getAllPosts } from "../store/postSlice"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
                        dispatch(getAllPosts({ allPosts: posts.documents }))
                        // setAllPosts(posts.documents)
                    }
                })
        }

    }, [userStatus])

    const allPosts = useSelector((state) => state.post.allPosts);

    if (allPosts.length === 0) {
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
                <div className='flex flex-wrap'>
                    {allPosts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )

}

export default Home;