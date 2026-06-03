import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem('cookie_consent')) setVisible(true)
    } catch { setVisible(true) }
  }, [])

  const accept = () => {
    try { localStorage.setItem('cookie_consent', 'accepted') } catch {}
    setVisible(false)
  }
  const reject = () => {
    try { localStorage.setItem('cookie_consent', 'rejected') } catch {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999,
      background: '#111', borderTop: '1px solid var(--border)',
      padding: '1rem 1.5rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: '1rem', flexWrap: 'wrap',
    }}>
      <p style={{ fontSize: '0.82rem', color: 'var(--gray-200)', maxWidth: '640px', lineHeight: 1.55 }}>
        🍪 Usamos cookies propias y de terceros para analytics, contenido personalizado y publicidad. Al continuar navegando aceptas su uso.{' '}
        <a href="#" onClick={e => e.preventDefault()} style={{ color: 'var(--amber)', textDecoration: 'underline' }}>Más información</a>
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
        <button onClick={reject} style={{
          background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
          color: 'var(--gray-400)', padding: '0.45rem 1rem',
          fontFamily: 'var(--font-condensed)', fontSize: '0.75rem', fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
        }}>Solo esenciales</button>
        <button onClick={accept} style={{
          background: 'var(--amber)', border: 'none', color: 'var(--black)',
          padding: '0.45rem 1.25rem',
          fontFamily: 'var(--font-condensed)', fontSize: '0.75rem', fontWeight: 800,
          letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
        }}>Aceptar todo</button>
      </div>
    </div>
  )
}
