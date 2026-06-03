// Ad slot component — ready for Google AdSense / programmatic ads
// Insert class="ad-slot" containers in layout for future monetization
export function AdSlotHorizontal({ label = 'Publicidad' }) {
  return (
    <div className="ad-slot ad-slot--horizontal" style={{
      background: 'var(--gray-900)',
      border: '1px dashed rgba(255,255,255,0.08)',
      borderRadius: '2px',
      minHeight: '90px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', margin: '1.5rem 0',
    }}>
      <span style={{
        fontFamily: 'var(--font-condensed)', fontSize: '0.6rem',
        letterSpacing: '0.15em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.15)',
      }}>{label}</span>
      {/* Google AdSense: <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXX" data-ad-slot="YYYYYYYY" data-ad-format="auto" /> */}
    </div>
  )
}

export function AdSlotSquare({ label = 'Publicidad' }) {
  return (
    <div className="ad-slot ad-slot--square" style={{
      background: 'var(--gray-900)',
      border: '1px dashed rgba(255,255,255,0.08)',
      borderRadius: '2px',
      minHeight: '250px', minWidth: '300px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
    }}>
      <span style={{
        fontFamily: 'var(--font-condensed)', fontSize: '0.6rem',
        letterSpacing: '0.15em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.15)',
      }}>{label}</span>
    </div>
  )
}
