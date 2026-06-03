import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!visible) return null
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver al inicio"
      style={{
        position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 500,
        width: '42px', height: '42px', borderRadius: '50%',
        background: 'var(--amber)', color: 'var(--black)',
        border: 'none', cursor: 'pointer', fontSize: '1.1rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,.4)',
        transition: 'transform 0.15s, opacity 0.15s',
        fontWeight: 700,
      }}
      onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
      onMouseLeave={e => e.target.style.transform = ''}
    >↑</button>
  )
}
