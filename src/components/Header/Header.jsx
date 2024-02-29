import React from 'react'
import { Container, LogoutBtn, Logo } from '../index'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

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
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='bg-slate-950 w-full  px-5 py-3'>
      <Container>
        <nav className='flex justify-between w-full text-white items-center'>

          <div>

              <div>
                <Logo padding={"p-1"} width={"w-3"} />
              </div>
           
          </div>

          <ul className='flex gap-7 px-3 font-bold text-md items-center justify-center '>
            {navItems.map((item) => item.active ? (

              <li key={item.name}>
                
                <NavLink
                to={item.slug}
                className={({isActive})=>`${isActive ? 'text-green-600 underline underline-offset-8': 'text-white no-underline hover:text-green-700'}`}
                  
                >{item.name}</NavLink>
              </li>

            ) : null)}

            {authStatus && (<li><LogoutBtn /></li>)}

          </ul>

        </nav>
      </Container>
    </header>
  )
}

export default Header