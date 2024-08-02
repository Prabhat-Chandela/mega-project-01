import React, { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch  } from 'react-redux';
import authService from '../../appwrite/auth_service';
import { logout } from '../../store/authSlice';
import { Button, Logo } from '../index';
import { HiOutlineViewGrid, HiOutlineArrowsExpand, HiOutlineChevronDoubleRight } from 'react-icons/hi';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logout()
      .then(() => {
        dispatch(logout())
      })
  }


  const navItems = [
    {
      name: 'Home',
      slug: "/",
      authenticated: true,
    },
    {
      name: "Login",
      slug: "/login",
      authenticated: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      authenticated: !authStatus,
    },
    {
      name: "Posts",
      slug: "/all-posts",
      authenticated: authStatus,
    },
    {
      name: "Profile",
      slug: "/profile",
      authenticated: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      authenticated: authStatus,
  
    },
  ]


  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

 
  return (
    <div className='w-full bg-[#ffffff] px-2 lg:p-3 fixed z-50 shadow-md'>
      <nav className='w-full h-[65px] px-1 lg:px-3 flex items-center justify-between'>
        <div className=''><Logo/></div>

        <div className='flex items-center'>

          <button aria-label="Toggle menu" onClick={toggleMenu} className="lg:hidden w-fit text-[#fff] bg-black p-2 rounded-lg">
            {isOpen ? <HiOutlineArrowsExpand /> : <HiOutlineViewGrid />}
          </button>

          <ul className={`bg-[#fff] absolute top-[65px] right-0 w-full items-start h-screen p-2 flex flex-col gap-5 lg:gap-14 ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:static lg:w-fit lg:bg-transparent lg:items-center lg:rounded-3xl lg:py-2 lg:px-5 lg:h-fit  lg:flex-row lg:translate-x-0 transition-all ease-in duration-200`}>

            {
              navItems.map((item) => item.authenticated ? (
                <li key={item.name} className='w-full lg:flex lg:items-center justify-center gap-5'>
                  <span className='hidden lg:block w-[2px] h-[2px] p-[2px] bg-black rounded-full' />
                  <NavLink to={item.slug} onClick={()=> (closeMenu())} className={({ isActive }) => `w-full flex items-center justify-between border p-3 rounded-xl border-black font-semibold lg:border-none lg:justify-normal lg:min-w-fit lg:p-0 lg:rounded-none transition-all ease-in-out duration-200 ${isActive ? 'bg-black text-[#fff] lg:bg-transparent lg:text-orange-500' : 'bg-transparent text-black lg:text-black/70 '} `}>
                    {item.name} <span className='lg:hidden'><HiOutlineChevronDoubleRight /></span>
                  </NavLink>
                </li>
              ): null)
            }

            <Button onClick={logoutHandler} className='lg:hidden'>Log Out</Button>

          </ul>
        </div>

        <Button onClick={logoutHandler} className='hidden lg:flex'>Log Out</Button>

      </nav>
    </div>
  )
}

export default Header;