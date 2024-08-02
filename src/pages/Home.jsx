import React from 'react';
import { Button, HeroShowcaseOne, Login } from '../components/index';

function Home() {

    return (
        <div className='w-full flex flex-col gap-7'>

            <section className='flex flex-col bg-[#fff] pt-10 lg:pt-20  gap-7'>

                <div className=' w-full items-center justify-center px-5 py-5 flex flex-col gap-5 sm:gap-12 '>
                    <h1 className='w-full text-black text-center text-3xl sm:text-6xl drop-shadow-md '>Tomorrow is for the Taking</h1>
                    <p className='w-full text-center text-sm sm:text-lg xl:text-xl'>Welecome to this fast growing community of fellow bloggers , where people share there thoughts and Knowledge in the form of blog posts .</p>
                    <Button className={' flex justify-center items-center gap-1 hover:bg-black hover:text-orange-300'} onClick={() => { navigate('/add-post') }}>Get Started </Button>
                </div>

                <div className='w-full flex flex-col gap-5'>

                    <div className='w-full'>
                        <HeroShowcaseOne />
                    </div>
                </div>

            </section>

            <section className='w-full bg-zinc-100'>

                <div className='w-full px-5 py-10'>
                    <Login />
                </div>

                <div>

                </div>

            </section>


        </div>
    )


}

export default Home;