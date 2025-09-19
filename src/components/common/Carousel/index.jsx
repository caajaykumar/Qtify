import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Keyboard, A11y, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import LeftArrow from '@/components/ui/Navigation/LeftArrow.jsx'
import RightArrow from '@/components/ui/Navigation/RightArrow.jsx'

export default function Carousel({
  children,
  spaceBetween = 16,
  slidesPerView,
  className = '',
}) {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  // Compute default responsive slidesPerView if not provided
  const breakpoints = {
    320: { slidesPerView: 1.2, spaceBetween: 12 },
    480: { slidesPerView: 2, spaceBetween: 14 },
    640: { slidesPerView: 3, spaceBetween: 16 },
    768: { slidesPerView: 3.5, spaceBetween: 18 },
    1024: { slidesPerView: 5, spaceBetween: 20 },
    1280: { slidesPerView: 6, spaceBetween: 20 },
  }

  return (
    <div className={`relative ${className}`}>
      {/* Nav Buttons - always rendered for testability */}
      <button
        ref={prevRef}
        className={`absolute -left-3 top-1/2 -translate-y-1/2 z-10 ${atStart ? 'opacity-40 pointer-events-none' : ''}`}
        aria-label="Previous"
        aria-disabled={atStart}
        data-testid="carousel-prev"
        type="button"
      >
        <LeftArrow />
      </button>

      <button
        ref={nextRef}
        className={`absolute -right-3 top-1/2 -translate-y-1/2 z-10 ${atEnd ? 'opacity-40 pointer-events-none' : ''}`}
        aria-label="Next"
        aria-disabled={atEnd}
        data-testid="carousel-next"
        type="button"
      >
        <RightArrow />
      </button>

      <Swiper
        modules={[Navigation, Keyboard, A11y, FreeMode]}
        freeMode={{ enabled: false }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        breakpoints={breakpoints}
        onInit={(swiper) => {
          // Attach external navigation
          // eslint-disable-next-line no-param-reassign
          swiper.params.navigation.prevEl = prevRef.current
          // eslint-disable-next-line no-param-reassign
          swiper.params.navigation.nextEl = nextRef.current
          swiper.navigation.init()
          swiper.navigation.update()
          setAtStart(swiper.isBeginning)
          setAtEnd(swiper.isEnd)
        }}
        onSlideChange={(swiper) => {
          setAtStart(swiper.isBeginning)
          setAtEnd(swiper.isEnd)
        }}
        onResize={(swiper) => {
          setAtStart(swiper.isBeginning)
          setAtEnd(swiper.isEnd)
        }}
      >
        {Array.isArray(children)
          ? children.map((child, idx) => <SwiperSlide key={idx}>{child}</SwiperSlide>)
          : <SwiperSlide>{children}</SwiperSlide>}
      </Swiper>
    </div>
  )
}
