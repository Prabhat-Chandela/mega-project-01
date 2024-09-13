import React from 'react';
import { useForm } from 'react-hook-form';
import { Inputbox, SecondaryButton } from '../index';
import bucketService from '../../appwrite/bucket_service';
import databaseService from '../../appwrite/database_service';
import { useSelector } from 'react-redux';

function SocialPostForm({socialPost}) {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            caption: socialPost?.caption || '',
            tags: socialPost?.tags || ''

        }
    });

    const userData = useSelector(state => state.auth.userData);

    const submit = async (data)=>{
        if(socialPost){
            const socialFile = data.socialpostimage[0] ? await bucketService.uploadSocialFile(data.socialpostimage[0]) : null
            
            if(socialFile){
                await bucketService.deleteSocialFile(socialPost.socialpostimage);
            }

            const dbSocialPost = await databaseService.updateSocialPost(socialPost.$id, {...data , socialpostimage: socialFile ? socialFile.$id : undefined})

        } else {
            const socialFile = await bucketService.uploadSocialFile(data.socialpostimage[0]);

            if(socialFile){
                const socialFileId = socialFile.$id;
                data.socialpostimage = socialFileId;

                const dbSocialPost = await databaseService.createSocialPost({...data , creatorId: userData.$id , creatorName: userData.name})
                console.log(dbSocialPost);
            }
        }
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