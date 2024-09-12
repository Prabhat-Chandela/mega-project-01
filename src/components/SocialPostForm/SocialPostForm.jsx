import React from 'react';
import { useForm } from 'react-hook-form';
import { Inputbox, SecondaryButton } from '../index';

function SocialPostForm({socialPost}) {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            caption: socialPost?.caption || '',
            tags: socialPost?.tags || ''

        }
    });

    const submit = ()=>{

    }


    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-7 text-black p-3 lg:p-7">

            <div className="w-full flex flex-col gap-5 p-3 py-5 bg-white rounded-xl ">
                <Inputbox
                    label="Caption :"
                    placeholder="Enter a caption"
                    {...register("caption", { required: true })}
                />

                <Inputbox
                    label="Post Image :"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("socialpostimage", { required: !socialPost })}
                />
                {socialPost && (
                    <div className="w-full mb-4">
                        <img
                            src={""}
                            alt={socialPost.caption}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Inputbox
                    label="Tags :"
                    placeholder="Add tags"
                    {...register("tags")}
                />

            </div>


            <SecondaryButton type="submit">
                {socialPost ? "Update" : "Submit"}
            </SecondaryButton>

        </form>
    )
}

export default SocialPostForm