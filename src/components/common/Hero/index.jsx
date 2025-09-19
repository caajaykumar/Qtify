import React from 'react'

export default function Hero() {
  return (
    <section className="bg-[#121212]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Copy */}
        <div className="text-center md:text-left">
          <h2 className="text-white font-extrabold tracking-tight text-2xl sm:text-3xl lg:text-4xl">
            100 Thousand Songs, ad-free
          </h2>
          <p className="text-white font-extrabold tracking-tight text-xl sm:text-2xl lg:text-3xl mt-2">
            Over thousands podcast episodes
          </p>
        </div>

        {/* Illustration */}
        <div className="shrink-0">

          <img src="/images/vibrating-headphone 1.png"/>
          {/* <svg
            width="220"
            height="160"
            viewBox="0 0 220 160"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
          >
          
            <path
              d="M40 80c0-33 27-60 60-60s60 27 60 60"
              fill="none"
              stroke="#34C94B"
              strokeWidth="10"
              strokeLinecap="round"
            />
          
            <rect x="28" y="78" rx="14" ry="14" width="40" height="58" fill="#121212" stroke="#34C94B" strokeWidth="8" />
          
            <rect x="152" y="78" rx="14" ry="14" width="40" height="58" fill="#121212" stroke="#34C94B" strokeWidth="8" />
          
            <path d="M20 70c6 3 10 3 16 0" stroke="#34C94B" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M200 70c-6 3-10 3-16 0" stroke="#34C94B" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M90 146c12 10 28 10 40 0" stroke="#34C94B" strokeWidth="4" fill="none" strokeLinecap="round" />
          </svg> */}
        </div>
      </div>
    </section>
  )
}
