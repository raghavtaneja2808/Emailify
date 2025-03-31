import React, { useEffect, useState } from 'react'
import styles from './Header.module.css'  
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from "@/components/ui/button"
import Profile from '../profile/Profile'
import CreditPurchase from '../creditPurchase/CreditPurchase'
import { Skeleton } from "@/components/ui/skeleton"
import assets from '@/assets/assets'
import ThemeToggle from '../ThemeToggle'
import { Menu, X } from 'lucide-react' 
import { InteractiveHoverButton } from '../magicui/interactive-hover-button'
import { Pointer } from '../magicui/pointer'
import { Terminal } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const stripePromise = loadStripe('pk_test_51QwKX7CS6NujxjT2tghavf6us2WOiwhUYOT86LugkFHtAnWZCY0PA5FnwE9c6Qwl9NuE8JmygPpVIXqwxtZRfDeE0071srwn8y')

const Header = () => {
  const auth = useSelector((state) => state.auth)
  const [authMessage, setAuthMessage] = useState("Still Waiting")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
const [continueButton,setcontinueButton]=useState("")
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const handleLogout = () => window.location.href = "/api/logout"

  // Navbar Visibility Logic (Scroll Up/Down)
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setVisible(false)  // Scrolling down → Hide navbar
      } else {
        setVisible(true)   // Scrolling up → Show navbar
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])

  useEffect(() => {
    switch (auth) {
      case null:
        setAuthMessage(
          <a href="/" className="text-primary hover:underline">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-300 animate-pulse" />
          </a>
        )
        break
      case false:
        setAuthMessage(
          <Button asChild>
            <a
              href="/auth/google"
              className={`flex items-center gap-2 px-4 py-2 
                          bg-white dark:bg-black border border-slate-200 
                          dark:border-slate-700 rounded-lg 
                          text-slate-700 dark:text-white 
                          hover:bg-slate-100 dark:hover:bg-slate-800 
                          hover:shadow-md transition duration-200 ${styles.text_none}`}
            >
              Login with Google  
              <img
                src={assets.googleLogo}
                alt="Google logo"
                className="w-5 h-5"
              />
            </a>
          </Button>
        )
        break
      default:
        setAuthMessage(auth.name)
        setcontinueButton(<a className='none ml-auto'> <InteractiveHoverButton>Dashboard</InteractiveHoverButton></a>)
    }
  }, [auth])

  return (
    <nav
      className={`flex items-center justify-between px-6 py-4 
                 bg-white dark:bg-black text-black dark:text-white 
                 border-b shadow-sm w-full fixed top-0 left-0 z-50 
                 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >

      {/* Logo */}
      <Link
        to={auth ? "/surveys" : "/"}
        className="text-2xl font-bold text-primary dark:text-white"
      >
        Emailify
      </Link>
{continueButton}
      {/* Flex Container for Items */}
      <div className="flex items-center space-x-4">
        <div
          className={`absolute top-full left-0 w-full bg-white dark:bg-black
                      flex flex-col gap-2 p-2 md:static md:flex md:flex-row md:space-x-4 md:gap-4 md:p-4
                      ${isMenuOpen ? 'block' : 'hidden'}`}
        >
          <CreditPurchase />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 outline p-2 rounded-lg">
            Credits: <span className="font-bold">{auth?.credits ?? 0}</span>
          </span>

          <nav className="pic flex justify-end">
            {auth ? (
              <Profile user={auth} onLogout={handleLogout} />
            ) : (
              <a
                href="/auth/google"
                className="text-primary hover:underline"
              >
                {authMessage}
              </a>
            )}
          </nav>
        </div>

        {/* Hamburger Button for Mobile */}
        <button
          className="md:hidden p-2 text-black dark:text-white"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <ThemeToggle />
        
      </div>
    </nav>
  )
}

export default Header
