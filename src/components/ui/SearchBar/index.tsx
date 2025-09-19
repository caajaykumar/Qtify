import { ChangeEvent, InputHTMLAttributes, useMemo, useState } from 'react'

export type SearchBarProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange?: (value: string) => void
  className?: string
  debounceMs?: number
  placeholder?: string
}

export default function SearchBar({
  onChange,
  className = '',
  debounceMs = 300,
  placeholder = 'Search a album of your choice',
  ...rest
}: SearchBarProps) {
  const [value, setValue] = useState('')

  const debounced = useMemo(() => {
    let timer: number | undefined
    return (v: string) => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => onChange?.(v), debounceMs)
    }
  }, [onChange, debounceMs])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    setValue(v)
    debounced(v)
  }

  return (
    <div className={`w-full max-w-xl relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-white text-[#000] placeholder:text-[#666] rounded-full py-2.5 pl-4 pr-10 outline-none shadow-sm"
        {...rest}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666]" aria-hidden>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M10 4a6 6 0 1 0 3.93 10.57l4.25 4.25a1 1 0 0 0 1.42-1.42l-4.25-4.25A6 6 0 0 0 10 4Zm-4 6a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" clipRule="evenodd" />
        </svg>
      </span>
    </div>
  )
}
