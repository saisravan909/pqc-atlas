export default function Slide02Stakes() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg font-body">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 80% at 80% 50%, rgba(239,68,68,0.12) 0%, #050c1a 60%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 50% at 20% 50%, rgba(124,58,237,0.07) 0%, transparent 60%)" }} />

      <div className="absolute inset-0 flex">
        <div className="flex flex-col justify-center px-[8vw] w-[55vw]">
          <div className="mb-[2.5vh]">
            <span className="font-display text-[1vw] font-600 tracking-[0.35em] uppercase text-danger opacity-90">The Threat</span>
          </div>

          <h1 className="font-display text-[4.2vw] font-700 text-text leading-tight tracking-tight mb-[3vh]">
            Your Encrypted Data Is
            <span className="text-danger block">Being Collected Right Now.</span>
          </h1>

          <p className="font-body text-[1.35vw] text-muted leading-relaxed mb-[4vh] max-w-[44vw]">
            Adversaries are running a strategy called <span className="text-text font-600">HNDL — Harvest Now, Decrypt Later</span>. They store encrypted data today and wait for a quantum computer to break it. The encryption protecting your systems may already be compromised. It just has not been decrypted yet.
          </p>

          <div className="flex flex-col gap-[2vh]">
            <div className="flex items-start gap-[1.5vw] p-[1.8vh_2vw] rounded-xl border border-border bg-card">
              <div className="w-[0.4vw] h-[5vh] rounded-full bg-danger flex-shrink-0 mt-[0.3vh]" />
              <div>
                <p className="font-display text-[1.1vw] font-600 text-text mb-[0.4vh]">RSA-2048 and ECC are broken by quantum computers</p>
                <p className="font-body text-[1vw] text-muted">Shor's Algorithm reduces RSA-2048 from computationally infeasible to hours on a CRQC. No patch exists — only migration.</p>
              </div>
            </div>

            <div className="flex items-start gap-[1.5vw] p-[1.8vh_2vw] rounded-xl border border-border bg-card">
              <div className="w-[0.4vw] h-[5vh] rounded-full bg-warn flex-shrink-0 mt-[0.3vh]" />
              <div>
                <p className="font-display text-[1.1vw] font-600 text-text mb-[0.4vh]">NSM-10 and CNSA 2.0 mandate migration by 2030</p>
                <p className="font-body text-[1vw] text-muted">Federal agencies and critical infrastructure operators face hard deadlines. Non-compliance is not a fine — it is a national security failure.</p>
              </div>
            </div>

            <div className="flex items-start gap-[1.5vw] p-[1.8vh_2vw] rounded-xl border border-border bg-card">
              <div className="w-[0.4vw] h-[5vh] rounded-full bg-primary flex-shrink-0 mt-[0.3vh]" />
              <div>
                <p className="font-display text-[1.1vw] font-600 text-text mb-[0.4vh]">The bottleneck is discovery, not knowledge</p>
                <p className="font-body text-[1vw] text-muted">Most organizations know they need to migrate. They do not know which systems use vulnerable cryptography. You cannot migrate what you cannot find.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-[42vw] px-[4vw]">
          <div className="text-center">
            <p className="font-display text-[1.1vw] font-600 tracking-[0.3em] uppercase text-danger mb-[1.5vh] opacity-80">CNSA 2.0 Full Compliance Deadline</p>
            <div className="font-display font-700 text-danger leading-none mb-[1.5vh]" style={{ fontSize: "16vw", textShadow: "0 0 6vw rgba(239,68,68,0.5)" }}>
              2030
            </div>
            <p className="font-body text-[1.3vw] text-muted mb-[4vh]">RSA and ECC officially deprecated for federal use</p>
            <div className="w-full h-[1px] bg-border mb-[3vh]" />
            <div className="flex justify-center gap-[4vw]">
              <div className="text-center">
                <div className="font-display text-[2.8vw] font-700 text-warn leading-none mb-[0.5vh]">2027</div>
                <div className="font-body text-[0.9vw] text-muted">New systems PQC-only</div>
              </div>
              <div className="text-center">
                <div className="font-display text-[2.8vw] font-700 text-text leading-none mb-[0.5vh]">2035</div>
                <div className="font-body text-[0.9vw] text-muted">Estimated CRQC arrival</div>
              </div>
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
