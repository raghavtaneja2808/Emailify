import { useState,useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../src/actions"
import Surveys from './pages/surveys/Surveys';
import { CheckoutForm, Return } from './components/payments/Payments';
import { Pointer } from './components/magicui/pointer';
function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(actions.fetchUser())
  },[dispatch])
    const auth=useSelector((state)=>state.auth)
document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
);
localStorage.theme = "light";
localStorage.theme = "dark";
localStorage.removeItem("theme");
  return (
    <>
    <div className='container bg-white dark:bg-black'>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
          {auth?
          <>
          <Route path='/surveys' Component={Surveys}/>
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/return" element={<Return />} /> </>:""    }
        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
