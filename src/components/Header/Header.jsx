import React from 'react'
import { Container, LogoutBtn, Logo } from '../index'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { VscHome , VscPersonAdd , VscPerson , VscNewFile ,  VscFiles , VscNote} from "react-icons/vsc";

function Header() {
  const authStatus = useSelector((state) => state.auth.status)

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Your Posts",
      slug: "/your-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <>

      <header className='bg-amber-100 text-black w-full mx-auto py-7'>
        <Container>
          <nav className='flex justify-between w-full items-center'>

            <div>

              <div>
                <Logo  width={"w-3"} className={'px-20 sm:px-24'} />
              </div>

            </div>

            <ul className='flex gap-7 px-3 text-sm font-bold items-center justify-center '>
              {navItems.map((item) => item.active ? (

                <li className='hidden sm:block' key={item.name}>

                  <NavLink
                    to={item.slug}
                    className={({ isActive }) => `${isActive ? 'text-black underline underline-offset-4 ' : 'text-orange-400 hover:text-black'}`}

                  >{item.name}</NavLink>
                </li>

              ) : null)}

              {authStatus && (<li><LogoutBtn /></li>)}

            </ul>

          </nav>
        </Container>
      </header>

      <nav className='fixed bottom-0 z-50 bg-black w-full py-5  sm:hidden'>
      <ul className=' flex gap-12 px-3 text-sm font-bold items-center justify-center'>
              {navItems.map((item) => item.active ? (

                <li key={item.name}>

                  <NavLink
                    to={item.slug}
                    className={({ isActive }) => `text-xl ${isActive ? ' text-white ' : 'text-orange-400'}`}

                  >{item.name === "Home"?<VscHome /> :
                    item.name === "Login"? <VscPerson />:
                    item.name === "Signup"?<VscPersonAdd /> :
                    item.name === "All Posts"? <VscFiles />:
                    item.name === "Your Posts"? <VscNote />:
                    item.name === "Add Post"? <VscNewFile />: null}</NavLink>
                </li>

              ) : null)}
 


            </ul>

      </nav>

    </>
  )
}

export default Header