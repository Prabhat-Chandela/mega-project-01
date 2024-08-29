import React from 'react';
import { HeroShowcaseOne } from '../components/index';

function Home() {

    return (
        <div className='w-full flex flex-col gap-7'>

            <section className='flex flex-col bg-[url("\HomeOne.jpg")] pt-10 lg:pt-20 gap-7'>

                <div className=' w-full items-center justify-center px-5 py-5 flex flex-col gap-5 sm:gap-10 '>
                    <h1 className='w-full text-white text-center text-3xl sm:text-6xl drop-shadow-2xl '>Tomorrow is for the Taking</h1>

                    <p className='w-full text-center text-sm sm:text-lg xl:text-xl'>ShareSphere: Connect, share your posts and blogs, and inspire a community that celebrates creativity and connection.</p>
                    <p className='text-orange-500 w-full text-center text-sm sm:text-lg xl:text-xl uppercase'>Connect. Share. Inspire.</p>

                </div>

                <div className='w-full flex flex-col gap-5'>

                    <div className='w-full'>
                        <HeroShowcaseOne />
                    </div>
                </div>

            </section>

            <section className='w-full bg-zinc-100'>

            </section>


        </div>
    )


}

export default Home;