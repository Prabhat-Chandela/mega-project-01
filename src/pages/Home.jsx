import React from 'react';
import { HeroShowcaseOne } from '../components/index';

function Home() {

    return (
        <div className='w-full flex flex-col gap-7'>

            <section className='flex flex-col pt-10 lg:pt-20 gap-7  bg-[url("\homeOne.jpg")]  lg:bg-cover'>

                <div className='max-w-screen-2xl items-center justify-center p-5 lg:px-14 xl:px-20'>

                    <div className='grid p-3 lg:p-7 '>

                    
                        <div className='grid gap-5 sm:place-items-center'>

                            <h1 className='w-full text-white lg:text-center text-3xl sm:text-6xl drop-shadow-2xl '><span className='inline-flex text-orange-500'>Connect</span> and Share Anytime From Anywhere With Anyone .</h1>

                            <p className='w-full lg:text-center text-sm sm:text-lg xl:text-xl drop-shadow-2xl'>ShareSphere: Connect, share your posts and blogs, and inspire a community that celebrates creativity and connection.</p>

                            <p className='w-full lg:text-center text-sm sm:text-lg xl:text-xl uppercase drop-shadow-2xl'><span className='inline-flex text-orange-500'>#</span>Connect <span className='inline-flex text-orange-500'>#</span>Share <span className='inline-flex text-orange-500'>#</span>Inspire</p>

                        </div>

                    </div>


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