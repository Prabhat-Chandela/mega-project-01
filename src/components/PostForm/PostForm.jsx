import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Inputbox, Select, RTE, SecondaryButton } from '../index';
import bucketService from '../../appwrite/bucket_service';
import databaseService from '../../appwrite/database_service';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',

        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)


    const submit = async (data) => {
        if (post) {
            const file = data.featuredimage[0] ? await bucketService.uploadFile(data.featuredimage[0]) : null

            if (file) {
                console.log(file)
                console.log(post)
                console.log(post.featuredimage)
                await bucketService.deleteFile(post.featuredimage)

            }
            const dbPost = await databaseService.updatePost(post.$id, { ...data, featuredimage: file ? file.$id : undefined })
            console.log(dbPost)

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }

        } else {
            const file = await bucketService.uploadFile(data.featuredimage[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredimage = fileId;

                const dbPost = await databaseService.createPost({ ...data, userId: userData.$id })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }

    }

    const slugTransform = useCallback((value) => {
        if (value && typeof (value === 'string')) return value.trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");


        return ''

    }, [])


    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title,
                    { shouldValidate: true }))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-7 text-black p-3 lg:p-7">

            <div className="w-full flex flex-col gap-5 p-3 py-5 bg-white rounded-xl ">
                <Inputbox
                    label="Title :"
                    placeholder="Title"
                    {...register("title", { required: true })}
                />
                <Inputbox
                    label="Slug :"
                    placeholder="Slug"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <Inputbox
                    label="Featured Image :"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("featuredimage", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={bucketService.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    {...register("status", { required: true })}
                />

            </div>

            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />


            <SecondaryButton type="submit">
                {post ? "Update" : "Submit"}
            </SecondaryButton>

        </form>
    );
}
export default PostForm