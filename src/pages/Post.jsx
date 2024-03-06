import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/database_service";
import bucketService from "../appwrite/bucket_service";
import { Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { VscEdit , VscClose } from "react-icons/vsc";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        databaseService.deletePost(post.$id).then((status) => {
            if (status) {
                bucketService.deleteFile(post.featuredimage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 ">

            <Container>
                <div className=" w-full flex flex-col items-center justify-center gap-5">

                    <div className="w-full  flex justify-center items-center mb-4 relative border rounded-xl py-7 bg-orange-400">
                        <img
                            src={bucketService.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-xl w-[60%] "
                        />

                        {isAuthor && (
                        
                            <div className="">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <button className="mr-3 absolute right-1 sm:right-6 top-6 bg-black text-sm text-orange-300 rounded-md font-semibold w-fit px-2 py-1">
                                    <VscEdit />
                                    </button>
                                </Link>
                               
                                <button className="bg-black absolute left-2 sm:left-6 top-6 text-orange-300 text-sm rounded-md font-semibold w-fit px-2 py-1" onClick={deletePost}>
                                <VscClose />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="w-full px-3 mb-6">
                        <h1 className="text-2xl text-center uppercase underline underline-offset-8 font-bold">{post.title}</h1>
                    </div>
                    <div className="browser-css px-3 w-full">
                        {parse(post.content)}
                    </div>

                </div>
            </Container>
        </div>

    ) : null;
}