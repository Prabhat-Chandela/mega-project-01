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
    <header className='bg-amber-100 text-black w-full  px-5 py-3'>
      <Container>
        <nav className='flex justify-between w-full items-center'>

          <div>

              <div>
                <Logo padding={"p-1"} width={"w-3"} />
              </div>
           
          </div>

          <ul className='flex gap-7 px-3 text-sm font-bold items-center justify-center '>
            {navItems.map((item) => item.active ? (

              <li key={item.name}>
                
                <NavLink
                to={item.slug}
                className={({isActive})=>`${isActive ? 'text-black underline underline-offset-4 ': 'text-orange-400 hover:text-black'}`}
                  
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