import React from 'react';

function HeroImageCard({
    image,
    imageName = "image name"
}) {
    return (
        <div className='min-w-[300px] lg:min-w-[400px] h-[250px] relative'>

            <div className='w-full h-full rounded-lg overflow-hidden'>
                <img className='w-full h-full object-cover' src={image} alt={imageName} />
            </div>

            <div className='absolute top-0 bottom-0 w-full grid place-items-center'>
                <h4 className='text-center w-fit filter bg-transparent backdrop-blur-md px-2 py-1 rounded-lg text-[#ffff] drop-shadow-md text-sm sm:text-lg'>{imageName}</h4>
            </div>

        </div>
    )
}

export default HeroImageCard;