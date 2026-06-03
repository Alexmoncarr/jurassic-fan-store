export default function TableOfContents({ content }) {
  // Extract ## headings from markdown content
  const headings = content
    .split('\n')
    .filter(l => l.startsWith('## '))
    .map(l => ({
      text: l.replace('## ', '').trim(),
      id: l.replace('## ', '').trim().toLowerCase()
        .replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e')
        .replace(/[íìï]/g, 'i').replace(/[óòö]/g, 'o')
        .replace(/[úùü]/g, 'u').replace(/ñ/g, 'n')
        .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
    }))

  if (headings.length < 3) return null

  return (
    <div style={{
      background: 'var(--gray-800)', border: '1px solid var(--border)',
      borderLeft: '3px solid var(--amber)',
      padding: '1.25rem 1.5rem', marginBottom: '2rem',
    }}>
      <div style={{
        fontFamily: 'var(--font-condensed)', fontSize: '0.68rem',
        fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase',
        color: 'var(--amber)', marginBottom: '0.75rem',
      }}>
        📋 En este artículo
      </div>
      <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem', counter: 'none' }}>
        {headings.map((h, i) => (
          <li key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
            <span style={{
              fontFamily: 'var(--font-condensed)', fontWeight: 800,
              color: 'var(--amber)', fontSize: '0.75rem', flexShrink: 0, marginTop: '2px'
            }}>{i + 1}.</span>
            <a
              href={`#${h.id}`}
              style={{ fontSize: '0.85rem', color: 'var(--gray-200)', lineHeight: 1.4, transition: 'color 0.15s' }}
              onMouseEnter={e => e.target.style.color = 'var(--amber)'}
              onMouseLeave={e => e.target.style.color = 'var(--gray-200)'}
            >{h.text}</a>
          </li>
        ))}
      </ol>
    </div>
  )
}
