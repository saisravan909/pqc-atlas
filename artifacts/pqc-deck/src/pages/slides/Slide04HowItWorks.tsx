export default function Slide04HowItWorks() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg font-body">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(0,212,255,0.06) 0%, transparent 60%)" }} />

      <div className="absolute inset-0 flex flex-col justify-center px-[8vw]">
        <div className="mb-[1.5vh]">
          <span className="font-display text-[1vw] font-600 tracking-[0.35em] uppercase text-primary opacity-80">The Solution</span>
        </div>

        <h1 className="font-display text-[3.8vw] font-700 text-text leading-tight tracking-tight mb-[1.2vh]">
          Three Steps.
          <span className="text-primary"> Zero Guesswork.</span>
        </h1>

        <p className="font-body text-[1.25vw] text-muted mb-[4vh] max-w-[55vw]">
          PQC-Atlas transforms your codebase from an unmapped cryptographic risk surface into a prioritized, standards-compliant migration roadmap.
        </p>

        <div className="grid grid-cols-3 gap-[2vw]">
          <div className="relative rounded-2xl border border-border p-[3vh_2.5vw]" style={{ background: "linear-gradient(135deg, #0d1a2f 0%, #0a1428 100%)" }}>
            <div className="font-display text-[4vw] font-700 text-primary opacity-20 leading-none absolute top-[2vh] right-[2vw]">01</div>
            <div className="mb-[2vh]">
              <div className="inline-flex items-center justify-center w-[4vw] h-[4vw] rounded-xl border border-primary bg-[rgba(0,212,255,0.08)]">
                <svg width="2vw" height="2vw" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
            </div>
            <h3 className="font-display text-[1.6vw] font-700 text-primary mb-[1.5vh]">Scan</h3>
            <p className="font-body text-[1vw] text-muted leading-relaxed mb-[2vh]">Deep static analysis across Go, Python, and Java. AST parsing for Go finds structural usage. Regex scanning for Python and Java catches framework-level patterns.</p>
            <div className="flex flex-col gap-[0.8vh]">
              <div className="flex items-center gap-[0.8vw]">
                <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-primary flex-shrink-0" />
                <span className="font-body text-[0.95vw] text-muted">RSA, ECC, DSA, ECDSA</span>
              </div>
              <div className="flex items-center gap-[0.8vw]">
                <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-primary flex-shrink-0" />
                <span className="font-body text-[0.95vw] text-muted">MD5, SHA-1, DES</span>
              </div>
              <div className="flex items-center gap-[0.8vw]">
                <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-primary flex-shrink-0" />
                <span className="font-body text-[0.95vw] text-muted">Zero code execution</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl border border-border p-[3vh_2.5vw]" style={{ background: "linear-gradient(135deg, #0d1a2f 0%, #0a1225 100%)" }}>
            <div className="font-display text-[4vw] font-700 text-accent opacity-20 leading-none absolute top-[2vh] right-[2vw]">02</div>
            <div className="mb-[2vh]">
              <div className="inline-flex items-center justify-center w-[4vw] h-[4vw] rounded-xl border border-accent bg-[rgba(124,58,237,0.08)]">
                <svg width="2vw" height="2vw" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
              </div>
            </div>
            <h3 className="font-display text-[1.6vw] font-700 text-accent mb-[1.5vh]">Score</h3>
            <p className="font-body text-[1vw] text-muted leading-relaxed mb-[2vh]">Every finding receives a Quantum Exposure Score (QES) — a quantitative risk metric mapping algorithm strength, key size, and NIST migration urgency.</p>
            <div className="flex flex-col gap-[0.8vh]">
              <div className="flex items-center gap-[0.8vw]">
                <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-danger flex-shrink-0" />
                <span className="font-body text-[0.95vw] text-muted">CRITICAL: QES 1.00-1.10 (RSA)</span>
              </div>
              <div className="flex items-center gap-[0.8vw]">
                <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-warn flex-shrink-0" />
                <span className="font-body text-[0.95vw] text-muted">HIGH: QES 0.60-0.99 (MD5)</span>
              </div>
              <div className="flex items-center gap-[0.8vw]">
                <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-muted flex-shrink-0" />
                <span className="font-body text-[0.95vw] text-muted">MEDIUM: QES &lt; 0.60 (SHA-1)</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl border border-border p-[3vh_2.5vw]" style={{ background: "linear-gradient(135deg, #0d1a2f 0%, #0a1225 100%)" }}>
            <div className="font-display text-[4vw] font-700 text-safe opacity-20 leading-none absolute top-[2vh] right-[2vw]">03</div>
            <div className="mb-[2vh]">
              <div className="inline-flex items-center justify-center w-[4vw] h-[4vw] rounded-xl border border-safe bg-[rgba(16,185,129,0.08)]">
                <svg width="2vw" height="2vw" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
            </div>
            <h3 className="font-display text-[1.6vw] font-700 text-safe mb-[1.5vh]">Report</h3>
            <p className="font-body text-[1vw] text-muted leading-relaxed mb-[2vh]">Exports a CycloneDX 1.7 Cryptographic Bill of Materials — a machine-readable inventory with exact NIST FIPS 203/204 replacement guidance per finding.</p>
            <div className="flex flex-col gap-[0.8vh]">
              <div className="flex items-center gap-[0.8vw]">
                <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-safe flex-shrink-0" />
                <span className="font-body text-[0.95vw] text-muted">CycloneDX 1.7 CBOM JSON</span>
              </div>
              <div className="flex items-center gap-[0.8vw]">
                <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-safe flex-shrink-0" />
                <span className="font-body text-[0.95vw] text-muted">FIPS 203/204 migration map</span>
              </div>
              <div className="flex items-center gap-[0.8vw]">
                <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-safe flex-shrink-0" />
                <span className="font-body text-[0.95vw] text-muted">GRC platform ingestible</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[3vh] flex items-center justify-center gap-[1.5vw]">
          <div className="flex items-center gap-[0.8vw] px-[1.5vw] py-[1.2vh] rounded-lg border border-border bg-card">
            <div className="w-[0.6vw] h-[0.6vw] rounded-full bg-[#00ADD8]" />
            <span className="font-body text-[0.95vw] text-muted">Go — AST</span>
          </div>
          <div className="w-[2vw] h-[1px] bg-border" />
          <div className="flex items-center gap-[0.8vw] px-[1.5vw] py-[1.2vh] rounded-lg border border-border bg-card">
            <div className="w-[0.6vw] h-[0.6vw] rounded-full bg-[#3776AB]" />
            <span className="font-body text-[0.95vw] text-muted">Python — Regex</span>
          </div>
          <div className="w-[2vw] h-[1px] bg-border" />
          <div className="flex items-center gap-[0.8vw] px-[1.5vw] py-[1.2vh] rounded-lg border border-border bg-card">
            <div className="w-[0.6vw] h-[0.6vw] rounded-full bg-[#ED8B00]" />
            <span className="font-body text-[0.95vw] text-muted">Java — Regex</span>
          </div>
          <div className="flex-1 h-[1px] bg-border mx-[1vw]" />
          <div className="font-display text-[1vw] font-600 text-primary tracking-wide">LSDB OID Mapping</div>
          <div className="w-[2vw] h-[1px] bg-border" />
          <div className="font-display text-[1vw] font-600 text-accent tracking-wide">QES Scoring</div>
          <div className="w-[2vw] h-[1px] bg-border" />
          <div className="font-display text-[1vw] font-600 text-safe tracking-wide">CycloneDX 1.7 CBOM</div>
        </div>
      </div>

      <div className="absolute bottom-[3vh] left-[8vw]">
        <span className="font-display text-[0.9vw] tracking-widest uppercase text-muted">PQC-Atlas</span>
      </div>
    </div>
  );
}
