import { useState } from 'react'

const QUESTIONS = [
  {
    q: '¿Qué prefieres hacer en tu tiempo libre?',
    opts: [
      { text: '🏃 Correr y explorar el territorio', dino: 'velociraptor' },
      { text: '🍃 Comer tranquilamente, sin prisa', dino: 'braquiosaurio' },
      { text: '👑 Dominar y que todos lo sepan', dino: 'trex' },
      { text: '🌊 Nadar, sumergirme, fluir', dino: 'spinosaurus' },
    ]
  },
  {
    q: '¿Cuál es tu mayor fortaleza?',
    opts: [
      { text: '🧠 Inteligencia y estrategia', dino: 'velociraptor' },
      { text: '💪 Fuerza bruta e impacto', dino: 'trex' },
      { text: '🛡️ Resistencia y defensa', dino: 'triceratops' },
      { text: '👁️ Adaptabilidad y sorpresa', dino: 'spinosaurus' },
    ]
  },
  {
    q: '¿Cómo reaccionas ante el peligro?',
    opts: [
      { text: '⚡ Ataco primero, pregunto después', dino: 'trex' },
      { text: '🤝 Busco aliados y estrategia', dino: 'velociraptor' },
      { text: '🏰 Me defiendo con firmeza', dino: 'triceratops' },
      { text: '🌿 Me camuflo y espero el momento', dino: 'dilophosaurus' },
    ]
  },
]

const RESULTS = {
  velociraptor: { name: 'Velociraptor', emoji: '🦎', desc: 'Eres inteligente, rápido y sabes trabajar en equipo. Estratega nato, siempre un paso por delante. El mundo es tuyo si lo planificas bien.' },
  trex: { name: 'T-Rex', emoji: '🦖', desc: 'Eres el depredador alfa. No necesitas correr para imponer respeto, tu presencia lo dice todo. Dominas con confianza y precisión devastadora.' },
  braquiosaurio: { name: 'Braquiosaurio', emoji: '🦕', desc: 'Tranquilo, sereno y con una perspectiva que otros no tienen. Tu paciencia y calma hacen que las decisiones importantes siempre recaigan en ti.' },
  spinosaurus: { name: 'Spinosaurus', emoji: '🐊', desc: 'Adaptable y poderoso, el más grande e incomprendido. Dominas en cualquier entorno y guardas sorpresas que nadie espera.' },
  triceratops: { name: 'Triceratops', emoji: '🦏', desc: 'Leal, protector y resistente. Tus cuernos no son para atacar — son para defender lo que amas. El más fiable en una tormenta.' },
  dilophosaurus: { name: 'Dilophosaurus', emoji: '🐍', desc: 'Misterioso y subestimado. La gente te subestima constantemente, y eso es exactamente tu mayor ventaja.' },
}

export default function Quiz({ onClose }) {
  const [step, setStep] = useState(0)
  const [votes, setVotes] = useState({})
  const [result, setResult] = useState(null)

  const choose = (dino) => {
    const newVotes = { ...votes, [dino]: (votes[dino] || 0) + 1 }
    setVotes(newVotes)
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1)
    } else {
      const winner = Object.entries(newVotes).sort((a, b) => b[1] - a[1])[0][0]
      setResult(RESULTS[winner] || RESULTS.trex)
    }
  }

  const reset = () => { setStep(0); setVotes({}); setResult(null) }

  return (
    <div className="quiz-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="quiz-modal" role="dialog" aria-modal="true" aria-label="Quiz: ¿Qué dinosaurio eres?">
        <button className="quiz-close" onClick={onClose} aria-label="Cerrar quiz">✕</button>

        {!result ? (
          <>
            <div className="quiz-progress">
              Pregunta {step + 1} de {QUESTIONS.length}
              <span style={{ display: 'block', height: '3px', background: 'var(--border)', marginTop: '8px', borderRadius: '2px', overflow: 'hidden' }}>
                <span style={{ display: 'block', height: '100%', width: `${((step + 1) / QUESTIONS.length) * 100}%`, background: 'var(--amber)', transition: 'width 0.3s' }} />
              </span>
            </div>
            <p className="quiz-q">{QUESTIONS[step].q}</p>
            <div className="quiz-options">
              {QUESTIONS[step].opts.map(opt => (
                <button key={opt.dino} className="quiz-opt" onClick={() => choose(opt.dino)}>
                  {opt.text}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="quiz-result">
            <div className="quiz-result__emoji">{result.emoji}</div>
            <h2 className="quiz-result__name">¡Eres un <em style={{ color: 'var(--amber)', fontStyle: 'italic' }}>{result.name}</em>!</h2>
            <p className="quiz-result__desc">{result.desc}</p>
            <div className="quiz-result__actions">
              <button className="btn btn--outline" onClick={reset}>Repetir 🔄</button>
              <button className="btn btn--primary" onClick={onClose}>Ver artículos →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
