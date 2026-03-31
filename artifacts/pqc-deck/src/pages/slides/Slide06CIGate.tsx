export default function Slide06CIGate() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg font-body">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(16,185,129,0.06) 0%, transparent 60%)" }} />

      <div className="absolute inset-0 flex flex-col justify-center px-[8vw]">
        <div className="mb-[1.5vh]">
          <span className="font-display text-[1vw] font-600 tracking-[0.35em] uppercase text-safe opacity-90">CI/CD Integration</span>
        </div>

        <h1 className="font-display text-[3.8vw] font-700 text-text leading-tight tracking-tight mb-[1.2vh]">
          Block Violations
          <span className="text-safe"> Before They Reach Production</span>
        </h1>

        <p className="font-body text-[1.25vw] text-muted mb-[4vh] max-w-[60vw]">
          PQC-Atlas integrates as a GitHub Actions gate. Every pull request is scanned automatically. Quantum-vulnerable code cannot merge until it is remediated.
        </p>

        <div className="flex items-stretch gap-[0] mb-[3.5vh]">
          <div className="flex flex-col items-center gap-[1.5vh] p-[2.5vh_2vw] rounded-l-2xl border border-border bg-card flex-1 text-center">
            <div className="w-[4vw] h-[4vw] rounded-xl border border-border flex items-center justify-center">
              <svg width="1.8vw" height="1.8vw" viewBox="0 0 24 24" fill="none" stroke="#8892a4" strokeWidth="1.5" strokeLinecap="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </div>
            <p className="font-display text-[1.1vw] font-600 text-text">Developer Opens PR</p>
            <p className="font-body text-[0.9vw] text-muted leading-relaxed">Code pushed, pull request created against main branch</p>
          </div>

          <div className="flex items-center px-[0.5vw] flex-shrink-0 bg-[#050c1a]">
            <svg width="1.5vw" height="1.5vw" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>

          <div className="flex flex-col items-center gap-[1.5vh] p-[2.5vh_2vw] border-t border-b border-border bg-card flex-1 text-center">
            <div className="w-[4vw] h-[4vw] rounded-xl border border-primary bg-[rgba(0,212,255,0.06)] flex items-center justify-center">
              <svg width="1.8vw" height="1.8vw" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <p className="font-display text-[1.1vw] font-600 text-primary">PQC-Atlas Scans</p>
            <p className="font-body text-[0.9vw] text-muted leading-relaxed">Scans all Go, Python, and Java files. QES scores assigned to every finding.</p>
          </div>

          <div className="flex items-center px-[0.5vw] flex-shrink-0 bg-[#050c1a]">
            <svg width="1.5vw" height="1.5vw" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>

          <div className="flex flex-col gap-[1.5vh] flex-1">
            <div className="flex flex-col items-center gap-[1vh] p-[2vh_2vw] rounded-tr-2xl border border-t border-r border-danger bg-[rgba(239,68,68,0.05)] text-center flex-1">
              <div className="w-[3.5vw] h-[3.5vw] rounded-xl border border-danger bg-[rgba(239,68,68,0.08)] flex items-center justify-center">
                <svg width="1.6vw" height="1.6vw" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </div>
              <p className="font-display text-[1vw] font-600 text-danger">BLOCKED</p>
              <p className="font-body text-[0.85vw] text-muted">RSA-Legacy detected. Merge prevented. Engineer must migrate.</p>
            </div>

            <div className="flex flex-col items-center gap-[1vh] p-[2vh_2vw] rounded-br-2xl border border-b border-r border-safe bg-[rgba(16,185,129,0.05)] text-center flex-1">
              <div className="w-[3.5vw] h-[3.5vw] rounded-xl border border-safe bg-[rgba(16,185,129,0.08)] flex items-center justify-center">
                <svg width="1.6vw" height="1.6vw" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <p className="font-display text-[1vw] font-600 text-safe">APPROVED</p>
              <p className="font-body text-[0.85vw] text-muted">No violations. CBOM artifact uploaded. Merge allowed.</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border p-[2vh_2.5vw]" style={{ background: "#030812" }}>
          <div className="grid grid-cols-3 gap-[3vw]">
            <div>
              <p className="font-display text-[0.95vw] font-600 text-primary mb-[1vh]">Trigger</p>
              <p className="font-body text-[0.9vw] text-muted">Every pull request and push to main — automatic, zero configuration required.</p>
            </div>
            <div>
              <p className="font-display text-[0.95vw] font-600 text-accent mb-[1vh]">On Violation</p>
              <p className="font-body text-[0.9vw] text-muted">Build fails with exit code 1. GitHub shows which algorithms triggered the block and the exact NIST replacement.</p>
            </div>
            <div>
              <p className="font-display text-[0.95vw] font-600 text-safe mb-[1vh]">On Pass</p>
              <p className="font-body text-[0.9vw] text-muted">CBOM JSON uploaded as a signed artifact, retained for 90 days. Full cryptographic audit trail in every build.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[3vh] left-[8vw]">
        <span className="font-display text-[0.9vw] tracking-widest uppercase text-muted">PQC-Atlas</span>
      </div>
    </div>
  );
}
