import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import WidthLimiter from "./WidthLimiter";

export default function Layout({ children }) {
  // sets default value of mobile is hidden
  const [mobileIsHidden, setMobileIsHidden] = useState(true)

  // called when mobile menu toggle is clicked
  const handleMobileClick = () => {
    if (false == mobileIsHidden) {
      // menu is open (want to close menu)
      // set mobile menu to hidden
      setMobileIsHidden(true)
    } else {
      // menu is closed (want to open menu)
      // set mobile menu to shown
      setMobileIsHidden(false)
    }
  }

  // sets default value for email
  const [email, setEmail] = useState('')

  // handles email changing value
  const handleEmail = event => {
    setEmail(event.target.value)
  }

  // handles email form submit
  const handleEmailList = event => {
    // prevents form from reloading the page
    event.preventDefault()
    if (email.length > 0) {
      // if user entered data
      // YOU WOULD ADD EMAIL TO A DB HERE
      // reset email
      setEmail('')
      // push user to emailGrat page
      Router.push('/emailGrat')
    } else {
      // if user did not enter data
      // ask theme to enter data before submiting
      toast.warn("Make sure to input your email in the box before clicking the join button", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <> 
    {/* navbar */}
    <nav className="font-title bg-red-500 text-[24px]">
      {/* width limiter */}
      <WidthLimiter paddingAll={ true }>
        {/* flexbox */}
        <div className="flex flex-col sm:flex-row items-center justify-between">
          {/* left */}
          <div className="flex justify-between items-center w-full">
            <Link href="/"><a tabIndex="0" className="w-5/12 sm:w-3/12 sm:mt-1">
              <Image 
                src="/logo.svg"
                alt="logo"
                width="2032"
                height="392"
              /> 
            </a></Link>
            {/* hamburger */}
            <div className="sm:hidden">
              <button tabIndex="0" onClick={handleMobileClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className={ (false == mobileIsHidden) ? "hidden" : "h-6 w-6 text-amber-50" } fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className={ (true == mobileIsHidden) ? "hidden" : "h-6 w-6 text-amber-50" } fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          {/* right */}
          <div className={ (true == mobileIsHidden) ? "hidden sm:flex flex-row items-center space-x-8" : "sm:flex flex-col sm:flex-row items-center w-full sm:w-fit sm:space-x-8 text-center" }>
            {/* services */}
            <div className="group relative rounded-lg sm:hover:bg-amber-500 text-amber-50 py-2 px-4">
              <div>
                {/* sm and above */}
                <Link href="/delights"><a  tabIndex="0" className="hidden sm:inline-flex items-center gap-1">
                  <span>Delights</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:group-hover:-rotate-180 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </a></Link>
                {/* mobile */}
                <div className="inline-block sm:hidden gap-1">
                  <button tabIndex="0" className="inline-flex items-center">
                  <span>Delights</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:-rotate-180 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  </button>
                </div>
              </div>
              {/* service sub-pages */}
              <div className="sm:absolute z-50 top-full inset-x-3 hidden text-center sm:text-left group-focus-within:flex group-hover:flex sm:group-focus-within:hidden flex-col pt-1 sm:pt-0 pb-1 sm:pb-0 sm:border-b-2 border-amber-400 text-[22px] sm:text-[20px]">
                <Link href="/delights"><a tabIndex="0" className="sm:hidden px-3 py-2">All Delights</a></Link>
                <Link href="/delights/sandwiches"><a tabIndex="0" className="sm:bg-amber-50 sm:hover:bg-amber-500 sm:text-amber-500 sm:hover:text-amber-50 px-3 py-2">Sandwiches</a></Link>
                <Link href="/delights/salads"><a tabIndex="0" className="sm:bg-amber-50 sm:hover:bg-amber-500 sm:text-amber-500 sm:hover:text-amber-50 px-3 py-2">Salads</a></Link>
                <Link href="/delights/soups"><a tabIndex="0" className="sm:bg-amber-50 sm:hover:bg-amber-500 sm:text-amber-500 sm:hover:text-amber-50 px-3 py-2">Soups</a></Link>
                <Link href="/delights/snacks"><a tabIndex="0" className="sm:bg-amber-50 sm:hover:bg-amber-500 sm:text-amber-500 sm:hover:text-amber-50 px-3 py-2">Snacks</a></Link>
                <Link href="/delights/drinks"><a tabIndex="0" className="sm:bg-amber-50 sm:hover:bg-amber-500 sm:text-amber-500 sm:hover:text-amber-50 px-3 py-2">Drinks</a></Link>
              </div>
            </div>
            {/* about */}
            <div className="rounded-lg sm:hover:bg-amber-500 text-amber-50 py-2 px-3">
              <Link href="/about"><a tabIndex="0">About</a></Link>
            </div>
            {/* cart */}
            <div className="rounded-lg sm:hover:bg-amber-500 text-amber-50 py-2 px-3">
              <Link href="/cart"><a tabIndex="0" className="inline-flex items-center gap-1 ">
                Cart
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </a></Link>
            </div>
          </div>
        </div>  
      </WidthLimiter>
    </nav>
    
    {/* children location */}
    { children }

    {/* footer */}
    <footer className="font-rubik bg-slate-700">
      {/* width limiter */}
      <WidthLimiter paddingAll={ true }>
        {/* flex */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center">
          {/* mailing list */}
          <div className="w-full md:w-5/12 flex flex-col">
            <h3 className="text-amber-100 text-center md:text-left text-xl">Join Our Mailing List!</h3>
            {/* onSubmit={handleEmailList} */}
            <form className="flex w-full md:w-10/12 pt-4 md:pt-1" onSubmit={handleEmailList}>
              <input value={email} onChange={handleEmail} id="email" type="email" className="form-control w-full rounded-l py-3 px-4  focus:bg-amber-100" placeholder="Email address" />
              <button type="submit" className="ripple-bg-red-300 text-red-800 rounded-r px-4">Join</button>
            </form>
          </div>
          {/* social links & copyright */}
          <div className="w-full md:w-7/12 flex flex-col md:flex-row md:justify-around">
            {/* social links */}
            <div className="w-full md:w-7/12 flex items-center justify-around pb-4 md:pb-0">
              {/* twitter */}
              <Link href="#"><a>
                <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.5 8.778c-.441.196-.916.328-1.414.388.509-.305.898-.787 1.083-1.362-.476.282-1.003.487-1.564.597-.448-.479-1.089-.778-1.796-.778-1.59 0-2.758 1.483-2.399 3.023-2.045-.103-3.86-1.083-5.074-2.572-.645 1.106-.334 2.554.762 3.287-.403-.013-.782-.124-1.114-.308-.027 1.14.791 2.207 1.975 2.445-.346.094-.726.116-1.112.042.313.978 1.224 1.689 2.3 1.709-1.037.812-2.34 1.175-3.647 1.021 1.09.699 2.383 1.106 3.773 1.106 4.572 0 7.154-3.861 6.998-7.324.482-.346.899-.78 1.229-1.274z"/></svg>
              </a></Link>
              {/* facebook */}
              <Link href="#"><a>
                <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 10h-2v2h2v6h3v-6h1.82l.18-2h-2v-.833c0-.478.096-.667.558-.667h1.442v-2.5h-2.404c-1.798 0-2.596.792-2.596 2.308v1.692z"/></svg>
              </a></Link>
              {/* instagram */}
              <Link href="#"><a>
                <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.615 6h-9.23c-.766 0-1.385.62-1.385 1.384v9.23c0 .766.619 1.386 1.385 1.386h9.23c.766 0 1.385-.62 1.385-1.385v-9.23c0-.765-.619-1.385-1.385-1.385zm-4.615 3.693c1.274 0 2.309 1.032 2.309 2.307s-1.035 2.307-2.309 2.307-2.307-1.033-2.307-2.307 1.033-2.307 2.307-2.307zm4.5 6.346c0 .255-.207.461-.461.461h-8.078c-.254 0-.461-.207-.461-.461v-5.039h.949c-.045.158-.078.32-.102.486-.023.168-.038.339-.038.514 0 2.04 1.652 3.693 3.691 3.693s3.691-1.653 3.691-3.693c0-.174-.015-.346-.039-.514-.023-.166-.058-.328-.102-.486h.95v5.039zm0-6.991c0 .255-.207.462-.461.462h-1.088c-.256 0-.461-.208-.461-.462v-1.087c0-.255.205-.461.461-.461h1.088c.254 0 .461.207.461.461v1.087z"/></svg>
              </a></Link>
            </div>

            {/* copyright */}
            <div className="w-full md:w-5/12 flex items-center justify-center text-amber-100">
              Copyright &copy; 2022 HV Delights co.
            </div>

            </div>
          </div>
        </WidthLimiter>
      </footer>
      <ToastContainer />
    </>
  )
}