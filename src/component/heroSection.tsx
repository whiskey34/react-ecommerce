// import { useState } from 'react'
// import reactLogo from '../assets/react.svg'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Link } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';

import '../App.css'

function HeroSection() {

  return (
    <>
        <section className=" w-full  bg-[#0A2025] py-6 px-4 sm:px-8">
            <div className="mx-auto flex  flex-col items-center lg:flex-row justify-center gap-10 py-14 max-w-[1440px] bg-no-repeat ">
                <div className="w-full max-w-[660px] flex flex-col justify-center items-start gap-10">
                    <div className="flex flex-col gap-4 w-full">
                        <h1>
                            <span className="text-white text-lg sm:text-xl font-bold font-mono">Pro.Beyond.</span>
                        </h1>
                        <h2 className='break-words'>
                            <span className="text-[#3e9d26] text-3xl sm:text-5xl font-thin font-mono me-3">IPhone 14</span>
                            <span className='text-[#3e9d26] text-3xl sm:text-5xl font-bold font-mono'>Pro</span>
                        </h2>
                        <p className="text-white text-base sm:text-xl font-normal font-mono leading-relaxed">
                            Creating the future to change everything for the better. For everyone
                        </p>
                    </div>
                    <div className="justify-start items-center gap-5 inline-flex">
                    
                        <Link to="/product" className="px-8 py-2.5 rounded-lg border-2 border-white text-white font-semibold font-mono hover:bg-cyan-500 hover:border-cyan-500 transition-all duration-300">Shop Now</Link>
                    </div>
                </div>
                {/* <img className="w-full max-w-[400px]" src="https://iili.io/338c9je.png" alt=""/> */}
                <Carousel autoPlay infiniteLoop  showThumbs={false} showStatus={false} showArrows={false} interval={3000} className="w-full max-w-[400px]">
                    <div>
                        <img src="/img/iphone.png" alt="slide-img-1" className="w-full h-128 object-contain" />
                       
                    </div>
                    <div >
                        <img src="/img/iphone.png" alt="slide-img-2" className="w-full h-128 object-contain" />
                       
                    </div>
                    
                    
                    
                </Carousel>

            </div>
        </section>
    </>
  )
}

export default HeroSection