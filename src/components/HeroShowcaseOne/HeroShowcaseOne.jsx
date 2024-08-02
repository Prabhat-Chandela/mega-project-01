import React from 'react';
import { HeroImageCard } from '../index';
import { motion as m} from 'framer-motion';

function HeroShowcaseOne() {

  const heroImages = [

        {
            image: "\celebration.jpg",
            imageName: "celebration"
        },

        {
            image: "education.jpg",
            imageName: "education"
        },

        {
            image: "fashion.jpg",
            imageName: "fashion"
        },

        {
            image: "festival.jpg",
            imageName: "festival"
        },

        {
            image: "travel.jpg",
            imageName: "travel"
        },

        {
            image: "trends.jpg",
            imageName: "trends"
        },

        {
            image: "Friendship.jpg",
            imageName: "Friendship"
        },

        {
            image: "connect.jpg",
            imageName: "connect"
        },

    ]

    return (
<div className='w-full flex overflow-x-hidden gap-2'>

        <m.div initial={{x:"0"}} animate={{x:"-100%"}} transition={{ease:"linear" , repeat:Infinity , duration:20}} className='w-fit flex  gap-2'>
            {
                heroImages.map((image) => (
                    <div key={image.imageName} className='w-fit'> 
                    <HeroImageCard  {...image} />
                    </div>
                ))
            }

            
        </m.div>

        <m.div initial={{x:"0"}} animate={{x:"-100%"}} transition={{ease:"linear" , repeat:Infinity , duration:20}} className='w-fit flex gap-2'>
            {
                heroImages.map((image) => (
                    <div key={image.imageName} className='w-fit'> 
                    <HeroImageCard  {...image} />
                    </div>
                ))
            }

            
        </m.div>

        </div>
    )
}

export default HeroShowcaseOne;