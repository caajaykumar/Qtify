import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import { useSongStore } from '@/store/songStore'

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const setGlobalQuery = useSongStore((s) => s.setSearchQuery)
  const debounceTimer = useRef(null)

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Immediate push to global state on submit as well
    setGlobalQuery(searchQuery)
    console.debug('[SearchSubmit] query pushed to store:', searchQuery)
  };

  // Debounce push to global search query in the store
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    debounceTimer.current = setTimeout(() => {
      setGlobalQuery(searchQuery)
      console.debug('[SearchDebounce] query set in store:', searchQuery)
    }, 300)
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [searchQuery, setGlobalQuery])

  const handleFeedbackClick = () => {
    // Handle feedback functionality here
    console.log('Give Feedback clicked');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <img src="/images/logo.png" alt="" />
        </div>

        {/* Search Section */}
        <div className="navbar-search">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search a album of your choice"
              className="search-input"
            />
            <button type="submit" className="search-button">
              <svg 
                className="search-icon" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                width="20" 
                height="20"
              >
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </form>
        </div>

        {/* Feedback Button */}
        <div className="navbar-actions">
          <button 
            onClick={handleFeedbackClick}
            className="feedback-button"
          >
            Give Feedback
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
