export default function Slide03Blindness() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg font-body">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.1) 0%, transparent 60%)" }} />

      <div className="absolute inset-0 flex flex-col justify-center px-[8vw]">
        <div className="mb-[1.5vh]">
          <span className="font-display text-[1vw] font-600 tracking-[0.35em] uppercase text-accent opacity-90">The Problem</span>
        </div>

        <h1 className="font-display text-[3.8vw] font-700 text-text leading-tight tracking-tight mb-[1.5vh]">
          Most Organizations Are
          <span className="text-accent"> Cryptographically Blind</span>
        </h1>

        <p className="font-body text-[1.25vw] text-muted mb-[4vh] max-w-[55vw]">
          The primary barrier to PQC migration is not technology — it is visibility. Before you can replace a vulnerable algorithm, you must first find it.
        </p>

        <div className="grid grid-cols-3 gap-[2vw]">
          <div className="rounded-2xl border border-border bg-card p-[3vh_2.5vw]" style={{ background: "linear-gradient(135deg, #0d1a2f 0%, #0a1225 100%)" }}>
            <div className="font-display font-700 text-danger leading-none mb-[1vh]" style={{ fontSize: "5.5vw", textShadow: "0 0 3vw rgba(239,68,68,0.4)" }}>99%</div>
            <div className="w-[3vw] h-[0.25vh] bg-danger mb-[1.5vh]" />
            <p className="font-display text-[1.25vw] font-600 text-text mb-[1vh]">of codebases contain quantum-vulnerable cryptography</p>
            <p className="font-body text-[1vw] text-muted leading-relaxed">RSA, ECC, and DSA are deeply embedded across languages, frameworks, and third-party libraries. Most instances are invisible to engineers.</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-[3vh_2.5vw]" style={{ background: "linear-gradient(135deg, #0d1a2f 0%, #0a1225 100%)" }}>
            <div className="font-display font-700 text-warn leading-none mb-[1vh]" style={{ fontSize: "5.5vw", textShadow: "0 0 3vw rgba(245,158,11,0.4)" }}>Hours</div>
            <div className="w-[3vw] h-[0.25vh] bg-warn mb-[1.5vh]" />
            <p className="font-display text-[1.25vw] font-600 text-text mb-[1vh]">to break RSA-2048 on a Cryptographically-Relevant Quantum Computer</p>
            <p className="font-body text-[1vw] text-muted leading-relaxed">Shor's Algorithm factorizes the mathematical foundation of RSA and ECC. What takes classical computers billions of years takes a CRQC hours.</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-[3vh_2.5vw]" style={{ background: "linear-gradient(135deg, #0d1a2f 0%, #0a1225 100%)" }}>
            <div className="font-display font-700 text-primary leading-none mb-[1vh]" style={{ fontSize: "5.5vw", textShadow: "0 0 3vw rgba(0,212,255,0.4)" }}>Now</div>
            <div className="w-[3vw] h-[0.25vh] bg-primary mb-[1.5vh]" />
            <p className="font-display text-[1.25vw] font-600 text-text mb-[1vh]">HNDL attacks are active — data is being collected today</p>
            <p className="font-body text-[1vw] text-muted leading-relaxed">Nation-state actors are storing encrypted enterprise traffic today. Retroactive decryption requires no access to your systems — only the harvested data.</p>
          </div>
        </div>

        <div className="mt-[3.5vh] flex items-center gap-[2vw] px-[2.5vw] py-[2vh] rounded-xl border border-border bg-card">
          <div className="w-[0.4vw] h-[5vh] rounded-full bg-accent flex-shrink-0" />
          <p className="font-body text-[1.1vw] text-muted">
            <span className="text-text font-600">The gap is discovery.</span> Security teams know quantum migration is required. They do not have a systematic inventory of which cryptographic primitives exist, where they live, or how urgent each one is.
            <span className="text-primary font-600"> PQC-Atlas closes this gap.</span>
          </p>
        </div>
      </div>

      <div className="absolute bottom-[3vh] left-[8vw]">
        <span className="font-display text-[0.9vw] tracking-widest uppercase text-muted">PQC-Atlas</span>
      </div>
    </div>
  );
}
