import React from 'react'
import Header from '../../components/header/Header'
import Landing1 from '../../components/landing/Landing1'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Landing2 from '@/components/landing/Landing2';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const Home = () => {
  return (
    <>
      <Header/>
      <Landing1/>
    <Landing2/>
    </>
  )
}

export default Home
