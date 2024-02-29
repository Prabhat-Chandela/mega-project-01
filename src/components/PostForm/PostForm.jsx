import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Inputbox, Select, RTE, Button } from '../index'
import bucketService from '../../appwrite/bucket_service'
import databaseService from '../../appwrite/database_service'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {
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
                bucketService.deleteFile(post.featuredimage)
            }
            const dbPost = await databaseService.updatePost(post.$id, { ...data, featuredimage: file ? file.$id : undefined })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }

        } else {
            const file = await bucketService.uploadFile(data.featuredimage[0]);
           
            if (file) {
                const fileId = file.$id;
                data.featuredimage = fileId;
                console.log(data , file)
                const dbPost = await databaseService.createPost({...data , userId: userData.$id })
                
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
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Inputbox
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Inputbox
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Inputbox
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
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
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-blue-500" : "bg-green-600"} >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
export default PostForm