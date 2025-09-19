// import Chip from '@mui/material/Chip'
import { useState, memo } from 'react'
import './Card.css'

function Card({ item, type = 'album' }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFollowing, setIsFollowing] = useState(item?.isFollowing || false)
  
  const isSong = type === 'song'
  const title = item?.title || item?.name || 'Untitled'
  const image = item?.image || item?.thumbnail || ''
  const metric = isSong ? item?.likes : item?.follows
  const metricLabel = isSong ? 'Likes' : 'Follows'
  
  const handleFollowClick = (e) => {
    e.stopPropagation()
    setIsFollowing(!isFollowing)
  }

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      style={{ height: 260 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Image Section */}
        <div className="relative overflow-hidden" style={{ height: '70%' }}>
          {image ? (
            <img 
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 grid place-items-center">
              <div className="text-gray-400 text-center">
                <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
                <span className="text-xs">No Image</span>
              </div>
            </div>
          )}
          
          {/* Warner Music Label */}
          {item?.label && (
            <div className="absolute top-2 left-2">
              <span className="bg-[#34C94B] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                {item.label}
              </span>
            </div>
          )}
          
          {/* Play Button Overlay */}
          {isHovered && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <button 
                className="bg-[#34C94B] hover:bg-[#2ba83f] rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.5 4.5L15.5 10L6.5 15.5V4.5Z" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between px-3 py-3" style={{ height: '30%' }}>
          {/* Title */}
          <h3 className="text-gray-900 font-bold text-sm leading-tight mb-2 line-clamp-2" title={title}>
            {title}
          </h3>
          
          {/* Artists */}
          {item?.artists && item.artists.length > 0 && (
            <div className="text-gray-600 text-[11px] leading-tight mb-2 line-clamp-1">
              {item.artists.slice(0, 2).join(' • ')}
              {item.artists.length > 2 && ' +' + (item.artists.length - 2)}
            </div>
          )}
          
          {/* Footer - Follows/Likes */}
          <div className="flex items-center justify-between mt-auto">
            <button 
              onClick={handleFollowClick}
              className={`text-[11px] transition-colors flex items-center gap-1 ${
                isFollowing ? 'text-[#34C94B]' : 'text-gray-500 hover:text-[#34C94B]'
              }`}
            >
              <span className="font-semibold">{metric ?? 0}</span>
              <span>{isFollowing && !isSong ? 'Following' : metricLabel}</span>
            </button>
            
            {/* Year or additional info */}
            {item?.year && (
              <span className="text-gray-400 text-[10px]">{item.year}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Card)
