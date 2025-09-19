import React, { useState } from 'react'
import './faq.css'

const DEFAULT_FAQS = [
  {
    q: 'Is Qtify free to use?',
    a: "Yes. Qtify is completely free to use. You can explore albums and listen to previews without any charges.",
  },
  {
    q: 'Can I download and listen to songs offline?',
    a: "Sorry, unfortunately we don't provide the service to download any songs.",
  },
  {
    q: 'Do you have podcasts as well?',
    a: 'Yes, you can explore thousands of podcast episodes in various categories.',
  },
]

export default function FAQSection({ faqs = DEFAULT_FAQS }) {
  const [openIndex, setOpenIndex] = useState(1) // open the second item by default like the mock

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx))
  }

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">FAQs</h2>

        <div className="faq-list">
          {faqs.map((item, idx) => {
            const open = openIndex === idx
            return (
              <div className={`faq-item ${open ? 'open' : ''}`} key={`${item.q}-${idx}`}>
                <button className="faq-header" onClick={() => toggle(idx)} aria-expanded={open}>
                  <span className="faq-question">{item.q}</span>
                  <svg
                    className={`chevron ${open ? 'up' : 'down'}`}
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" stroke="#34C94B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div className="faq-body" role="region">
                  <p>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
