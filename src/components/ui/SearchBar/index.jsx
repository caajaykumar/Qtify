import { useMemo, useState } from 'react'

export default function SearchBar({
  onChange,
  className = '',
  debounceMs = 300,
  placeholder = 'Search a album of your choice',
  ...rest
}) {
  const [value, setValue] = useState('')

  const debounced = useMemo(() => {
    let timer
    return (v) => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => onChange?.(v), debounceMs)
    }
  }, [onChange, debounceMs])

  function handleChange(e) {
    const v = e.target.value
    setValue(v)
    debounced(v)
  }

  return (
    <div className={`w-full max-w-2xl ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full h-10 bg-white text-[#111827] placeholder:text-[#6B7280] rounded-md pl-4 pr-12 outline-none border border-black/15 shadow-sm"
          {...rest}
        />
        <div className="absolute top-0 right-0 h-10 w-10 grid place-items-center rounded-r-md border-l border-black/15 text-[#111827]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 opacity-80">
            <path fillRule="evenodd" d="M10 4a6 6 0 1 0 3.93 10.57l4.25 4.25a1 1 0 0 0 1.42-1.42l-4.25-4.25A6 6 0 0 0 10 4Zm-4 6a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  )
}
