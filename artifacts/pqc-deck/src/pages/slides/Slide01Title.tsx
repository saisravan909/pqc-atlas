export default function Slide01Title() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg font-body">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 60% 40%, #0a1f3d 0%, #050c1a 70%)" }} />
      <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)", backgroundSize: "6vw 6vw" }} />
      <div className="absolute top-[8vh] right-[8vw] w-[32vw] h-[32vw] rounded-full" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(0,212,255,0.08) 50%, transparent 70%)", filter: "blur(2vw)" }} />
      <div className="absolute bottom-[5vh] left-[4vw] w-[18vw] h-[18vw] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)", filter: "blur(1.5vw)" }} />

      <div className="absolute inset-0 flex flex-col justify-center px-[8vw]">
        <div className="mb-[2vh]">
          <span className="font-display text-[1.1vw] font-600 tracking-[0.4em] uppercase text-primary opacity-80">
            Conference Submission
          </span>
        </div>

        <h1 className="font-display text-[8.5vw] font-700 leading-none tracking-tight text-primary mb-[2vh]" style={{ textShadow: "0 0 6vw rgba(0,212,255,0.4)" }}>
          PQC-Atlas
        </h1>

        <div className="w-[12vw] h-[0.25vh] bg-primary mb-[3.5vh]" style={{ boxShadow: "0 0 1.5vw rgba(0,212,255,0.6)" }} />

        <h2 className="font-display text-[2.2vw] font-500 text-text leading-snug max-w-[55vw] mb-[2vh]">
          Automated Cryptographic Discovery
          <span className="text-primary"> &amp; </span>
          Observability Engine
        </h2>

        <p className="font-body text-[1.4vw] font-400 text-muted max-w-[48vw] leading-relaxed mb-[5vh]">
          Find every quantum-vulnerable algorithm in your codebase before a quantum computer finds it for you.
        </p>

        <div className="flex items-center gap-[3vw]">
          <div>
            <p className="font-body text-[1.1vw] font-600 text-text">Sai Sravan Cherukuri &amp; Sai Saketh Cherukuri</p>
            <p className="font-body text-[1vw] font-400 text-muted">Innovators, PQC-Atlas</p>
          </div>
          <div className="w-[1px] h-[4vh] bg-border" />
          <div className="flex gap-[1.5vw]">
            <span className="px-[1vw] py-[0.5vh] rounded text-[0.85vw] font-600 font-display tracking-wide border border-border text-muted">NIST FIPS 203/204</span>
            <span className="px-[1vw] py-[0.5vh] rounded text-[0.85vw] font-600 font-display tracking-wide border border-border text-muted">CycloneDX 1.7</span>
            <span className="px-[1vw] py-[0.5vh] rounded text-[0.85vw] font-600 font-display tracking-wide border border-border text-muted">NSM-10 Ready</span>
          </div>
        </div>
      </div>

      <div className="absolute right-[6vw] top-1/2 -translate-y-1/2 flex flex-col items-center gap-[2vh]">
        <div className="w-[28vw] h-[28vw] rounded-2xl border border-border flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0d1a2f 0%, #0a1428 100%)", boxShadow: "inset 0 1px 0 rgba(0,212,255,0.1), 0 0 4vw rgba(0,212,255,0.05)" }}>
          <div className="text-center px-[3vw]">
            <div className="font-display text-[5vw] font-700 text-primary leading-none mb-[1vh]" style={{ textShadow: "0 0 3vw rgba(0,212,255,0.5)" }}>17</div>
            <div className="font-body text-[1vw] text-muted mb-[2.5vh]">vulnerabilities found</div>
            <div className="w-full h-[1px] bg-border mb-[2.5vh]" />
            <div className="font-display text-[3.5vw] font-700 text-accent leading-none mb-[1vh]" style={{ textShadow: "0 0 2vw rgba(124,58,237,0.5)" }}>3</div>
            <div className="font-body text-[1vw] text-muted mb-[2.5vh]">languages scanned</div>
            <div className="w-full h-[1px] bg-border mb-[2.5vh]" />
            <div className="font-display text-[2.8vw] font-700 text-safe leading-none mb-[1vh]" style={{ textShadow: "0 0 2vw rgba(16,185,129,0.4)" }}>3.51ms</div>
            <div className="font-body text-[1vw] text-muted">total scan time</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[3vh] left-[8vw] right-[8vw] flex justify-between items-center">
        <p className="font-body text-[0.9vw] text-muted">github.com/saisravan909/pqc-atlas</p>
        <p className="font-body text-[0.9vw] text-muted">Apache 2.0  |  Go 1.21+</p>
      </div>
    </div>
  );
}
