export default function Slide07Closing() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg font-body">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,212,255,0.07) 0%, rgba(124,58,237,0.04) 40%, #050c1a 70%)" }} />
      <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)", backgroundSize: "6vw 6vw" }} />

      <div className="absolute inset-0 flex flex-col justify-center items-center px-[10vw] text-center">
        <div className="mb-[2.5vh]">
          <span className="font-display text-[1vw] font-600 tracking-[0.4em] uppercase text-primary opacity-80">PQC-Atlas</span>
        </div>

        <h1 className="font-display text-[5.5vw] font-700 text-text leading-tight tracking-tight mb-[2vh]">
          The 2030 Deadline
          <br />
          <span className="text-primary">Is Not Optional.</span>
        </h1>

        <p className="font-body text-[1.4vw] text-muted leading-relaxed max-w-[55vw] mb-[5vh]">
          Migration begins with discovery. PQC-Atlas gives every security team, DevSecOps engineer, and compliance officer the visibility they need to begin — today.
        </p>

        <div className="grid grid-cols-3 gap-[2.5vw] mb-[5vh] w-full max-w-[70vw]">
          <div className="rounded-2xl border border-border p-[3vh_2vw] text-center" style={{ background: "linear-gradient(135deg, #0d1a2f 0%, #0a1428 100%)" }}>
            <div className="font-display text-[2.2vw] font-700 text-primary mb-[1.5vh]" style={{ textShadow: "0 0 2vw rgba(0,212,255,0.4)" }}>Discover</div>
            <p className="font-body text-[0.95vw] text-muted leading-relaxed">Scan your entire codebase. Find every quantum-vulnerable algorithm. Build your complete cryptographic inventory.</p>
          </div>

          <div className="rounded-2xl border border-border p-[3vh_2vw] text-center" style={{ background: "linear-gradient(135deg, #0d1a2f 0%, #0a1225 100%)" }}>
            <div className="font-display text-[2.2vw] font-700 text-accent mb-[1.5vh]" style={{ textShadow: "0 0 2vw rgba(124,58,237,0.4)" }}>Prioritize</div>
            <p className="font-body text-[0.95vw] text-muted leading-relaxed">QES scoring tells you which algorithms to migrate first. Focus engineering effort where the HNDL risk is highest.</p>
          </div>

          <div className="rounded-2xl border border-border p-[3vh_2vw] text-center" style={{ background: "linear-gradient(135deg, #0d1a2f 0%, #0a1225 100%)" }}>
            <div className="font-display text-[2.2vw] font-700 text-safe mb-[1.5vh]" style={{ textShadow: "0 0 2vw rgba(16,185,129,0.4)" }}>Comply</div>
            <p className="font-body text-[0.95vw] text-muted leading-relaxed">CycloneDX 1.7 CBOM output is ingestible by federal GRC platforms. CI gate prevents cryptographic drift from day one.</p>
          </div>
        </div>

        <div className="w-[12vw] h-[1px] bg-border mb-[4vh]" />

        <div className="flex items-center gap-[4vw]">
          <div className="text-center">
            <p className="font-display text-[1.2vw] font-700 text-text">Sai Sravan Cherukuri</p>
            <p className="font-display text-[1.2vw] font-700 text-text">Sai Saketh Cherukuri</p>
            <p className="font-body text-[1vw] text-muted">Innovators, PQC-Atlas</p>
          </div>
          <div className="w-[1px] h-[5vh] bg-border" />
          <div className="text-center">
            <p className="font-body text-[1vw] text-muted mb-[0.3vh]">Open Source — Apache 2.0</p>
            <p className="font-display text-[1.1vw] font-600 text-primary">github.com/saisravan909/pqc-atlas</p>
          </div>
          <div className="w-[1px] h-[5vh] bg-border" />
          <div className="flex gap-[1.2vw]">
            <span className="px-[1vw] py-[0.8vh] rounded-lg text-[0.85vw] font-600 font-display tracking-wide border border-border text-muted">NIST FIPS 203/204</span>
            <span className="px-[1vw] py-[0.8vh] rounded-lg text-[0.85vw] font-600 font-display tracking-wide border border-border text-muted">NSM-10</span>
            <span className="px-[1vw] py-[0.8vh] rounded-lg text-[0.85vw] font-600 font-display tracking-wide border border-border text-muted">CNSA 2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
