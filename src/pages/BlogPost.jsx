import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/database_service";
import bucketService from "../appwrite/bucket_service";
import { Button} from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { VscEdit, VscClose } from "react-icons/vsc";
import { FaHeading } from "react-icons/fa";

export default function BlogPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/profile");
            });
        } else navigate("/profile");
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
        <div className="p-3 lg:p-7 grid place-items-center">

            <main className="py-5 sm:py-10">

                <div className="max-w-5xl flex flex-col">

                    <div className="w-full bg-white p-2 sm:p-5 flex flex-col gap-5">
                        <h1 className="flex items-center gap-2 text-2xl text-black uppercase font-bold"><span className="bg-black text-white p-2 rounded-lg"><FaHeading /></span> {post.title}</h1>
                        {isAuthor && (

                            <div className="w-full flex gap-5">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button className="flex items-center justify-center gap-2">
                                        <VscEdit /> <span>Edit Blog</span>
                                    </Button>
                                </Link>

                                <Button className="flex items-center justify-center gap-2" onClick={deletePost}>
                                    <VscClose /> <span>Delete Blog</span>
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="w-full overflow-hidden">
                        <img
                            src={bucketService.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="w-full max-h-full object-center"
                        />
                    </div>

                    <div className="mt-5 w-full">
                        {parse(post.content)}
                    </div>

                </div>

            </main>

        </div>

    ) : null;
}