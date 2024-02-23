import React from 'react'
import { Container, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { UseSelector, useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

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
    <header>
      <Container>
        <nav className='flex'>

          <div>
            <Link to='/'>
              <div>Logo</div>
            </Link>
          </div>

          <ul className='flex'>
            {navItems.map((item) => item.active ? (

              <li key={item.name}>
                <button className=''
                  onClick={() => navigate(item.slug)}
                >{item.name}</button>
              </li>

            ) : null)}

            {authStatus && (<li><LogoutBtn/></li>)}

          </ul>

        </nav>
      </Container>
    </header>
  )
}

export default Header