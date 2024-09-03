import React from 'react';
import { Inputbox, SecondaryButton } from "../components/index";
import { FaSearch } from "react-icons/fa";

function AllSocialPosts() {
  return (
    <div className='w-full py-8'>

      <section className='w-full p-3 lg:p-7'>

        <div className='w-full flex gap-2 rounded-lg'>

          <Inputbox className="border-white text-white"
            label="Search User"
            labelbg="bg-black"
            labelTextCol="text-white"
          />
          <SecondaryButton><FaSearch /></SecondaryButton>

        </div>

      </section>

    </div>
  )
}

export default AllSocialPosts;