import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Página no encontrada — Jurassic Hub</title>
      </Helmet>
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 2rem'
      }}>
        <div style={{ fontSize: '6rem', marginBottom: '1rem', lineHeight: 1 }}>🦖</div>
        <p style={{ fontFamily: 'var(--mono)', color: 'var(--amber)', fontSize: '0.875rem', letterSpacing: '0.15em', marginBottom: '1rem' }}>ERROR 404</p>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 6vw, 3.5rem)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
          Este dinosaurio<br />se ha extinguido
        </h1>
        <p style={{ color: 'var(--ivory-dim)', maxWidth: '40ch', lineHeight: 1.7, marginBottom: '3rem' }}>
          La página que buscas no existe o ha sido devorada por un Spinosaurus.
          Vuelve al inicio y sigue explorando la era Mesozoica.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/" className="btn btn--primary">Volver al inicio</Link>
          <Link to="/articulos" className="btn btn--secondary">Ver artículos</Link>
        </div>
      </div>
    </>
  )
}
