import React from 'react'
import styles from "./landing.module.css"
import { useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'
import { TextReveal } from "@/components/magicui/text-reveal"
import Folder from '../Folder/Folder'
import { AnimatedShinyText } from '../magicui/animated-shiny-text'

const Landing1 = () => {
    const auth = useSelector((state) => state.auth)
    const navigate = useNavigate()

    return (
        <div className={`${styles.landing} overflow-x-hidden w-full min-h-screen pt-[100px] px-6 sm:px-12`}>
            {/* Desktop Layout */}
            <div className="hidden md:flex items-start">
                <div className="w-1/2 mt-50">
                    <h1 className="text-9xl text-left">Emailify</h1>
                    <p className='mt-6 text-3xl ubuntu-bold-italic text-right'>
                        <AnimatedShinyText>
                            Receive results faster than ever before
                        </AnimatedShinyText>
                    </p>
                </div>

                <div className="w-1/2 flex justify-end mt-70 mr-40">
                    <Folder
                        size={3.5}
                        items={[
                            <div className="p-2 bg-blue-500 text-white rounded-md">📄 Report</div>,
                            <div className="p-2 bg-green-500 text-white rounded-md">✅ Task List</div>,
                            <div className="p-2 bg-yellow-500 text-black rounded-md">⚠️ Warnings</div>
                        ]}
                    />
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="flex flex-col md:hidden items-center text-center">
                <h1 className="text-8xl mt-20">Emailify</h1>
                <p className='mt-6 text-2xl ubuntu-bold-italic'>
                    <AnimatedShinyText>
                        Receive results faster than ever before
                    </AnimatedShinyText>
                </p>

                <Folder
                    className="mt-50"
                    size={3.5}
                    items={[
                        <div className="p-2 bg-blue-500 text-white rounded-md">📄 Report</div>,
                        <div className="p-2 bg-green-500 text-white rounded-md">✅ Task List</div>,
                        <div className="p-2 bg-yellow-500 text-black rounded-md">⚠️ Warnings</div>
                    ]}
                />
            </div>
        </div>
    )
}

export default Landing1
