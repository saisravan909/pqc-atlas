export default function Slide05LiveResults() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg font-body">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,212,255,0.05) 0%, #050c1a 65%)" }} />
      <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)", backgroundSize: "8vw 8vw" }} />

      <div className="absolute inset-0 flex flex-col justify-center px-[8vw]">
        <div className="mb-[2vh]">
          <span className="font-display text-[1vw] font-600 tracking-[0.35em] uppercase text-primary opacity-80">Live Demonstration</span>
        </div>

        <h1 className="font-display text-[3.8vw] font-700 text-text leading-tight tracking-tight mb-[1vh]">
          Real Code. Real Findings.
          <span className="text-primary"> Real Time.</span>
        </h1>
        <p className="font-body text-[1.25vw] text-muted mb-[4vh] max-w-[55vw]">
          Scanned against <span className="text-text font-500">examples/legacy-app/</span> — a realistic microservice included in the repository. No mocked output.
        </p>

        <div className="flex gap-[3vw] mb-[4vh]">
          <div className="flex-1 rounded-2xl border border-border p-[3vh_2.5vw] text-center" style={{ background: "linear-gradient(135deg, #0d1a2f 0%, #0a1428 100%)", boxShadow: "0 0 4vw rgba(0,212,255,0.06)" }}>
            <div className="font-display font-700 text-primary leading-none mb-[1vh]" style={{ fontSize: "9vw", textShadow: "0 0 4vw rgba(0,212,255,0.5)" }}>17</div>
            <div className="w-[4vw] h-[0.25vh] bg-primary mx-auto mb-[1.5vh]" />
            <p className="font-display text-[1.3vw] font-600 text-text mb-[0.8vh]">Findings</p>
            <p className="font-body text-[1vw] text-muted">Cryptographic vulnerabilities identified across all three files</p>
          </div>

          <div className="flex-1 rounded-2xl border border-border p-[3vh_2.5vw] text-center" style={{ background: "linear-gradient(135deg, #0d1a2f 0%, #0a1225 100%)", boxShadow: "0 0 4vw rgba(124,58,237,0.06)" }}>
            <div className="font-display font-700 text-accent leading-none mb-[1vh]" style={{ fontSize: "9vw", textShadow: "0 0 4vw rgba(124,58,237,0.5)" }}>3</div>
            <div className="w-[4vw] h-[0.25vh] bg-accent mx-auto mb-[1.5vh]" />
            <p className="font-display text-[1.3vw] font-600 text-text mb-[0.8vh]">Languages</p>
            <p className="font-body text-[1vw] text-muted">Go (AST), Python (Regex), Java (Regex) — single pass</p>
          </div>

          <div className="flex-1 rounded-2xl border border-border p-[3vh_2.5vw] text-center" style={{ background: "linear-gradient(135deg, #0d1a2f 0%, #0a1225 100%)", boxShadow: "0 0 4vw rgba(16,185,129,0.06)" }}>
            <div className="font-display font-700 text-safe leading-none mb-[1vh]" style={{ fontSize: "7vw", textShadow: "0 0 4vw rgba(16,185,129,0.5)" }}>3.51ms</div>
            <div className="w-[4vw] h-[0.25vh] bg-safe mx-auto mb-[1.5vh]" />
            <p className="font-display text-[1.3vw] font-600 text-text mb-[0.8vh]">Scan Time</p>
            <p className="font-body text-[1vw] text-muted">Full AST parse and regex scan across all source files</p>
          </div>
        </div>

        <div className="rounded-xl border border-border overflow-hidden" style={{ background: "#030812" }}>
          <div className="flex items-center gap-[0.6vw] px-[1.5vw] py-[1.2vh] border-b border-border">
            <div className="w-[1vw] h-[1vw] rounded-full bg-[#ef4444]" />
            <div className="w-[1vw] h-[1vw] rounded-full bg-[#f59e0b]" />
            <div className="w-[1vw] h-[1vw] rounded-full bg-[#10b981]" />
            <span className="font-body text-[0.9vw] text-muted ml-[1vw]">$ go run main.go scan --path examples/</span>
          </div>
          <div className="px-[2vw] py-[2vh]">
            <div className="grid grid-cols-2 gap-x-[4vw] gap-y-[0.5vh]">
              <div className="font-body text-[0.9vw] text-[#ef4444]">[java]   TokenService.java:16  — RSA-Legacy</div>
              <div className="font-body text-[0.9vw] text-[#3776AB]">[python] auth_service.py:13   — RSA-Legacy</div>
              <div className="font-body text-[0.9vw] text-[#ef4444]">[java]   TokenService.java:24  — ECC-Legacy</div>
              <div className="font-body text-[0.9vw] text-[#3776AB]">[python] auth_service.py:21   — ECC-Legacy</div>
              <div className="font-body text-[0.9vw] text-[#ef4444]">[java]   TokenService.java:32  — DSA-Legacy</div>
              <div className="font-body text-[0.9vw] text-[#3776AB]">[python] auth_service.py:28   — DSA-Legacy</div>
              <div className="font-body text-[0.9vw] text-[#f59e0b]">[java]   TokenService.java:57  — MD5</div>
              <div className="font-body text-[0.9vw] text-[#00ADD8]">[go]     main.go:15            — RSA-Legacy-2048</div>
            </div>
            <div className="mt-[1.5vh] font-body text-[0.9vw] text-safe">[+] Scan Complete. Found 17 cryptographic primitives in 3.51ms.</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[3vh] left-[8vw]">
        <span className="font-display text-[0.9vw] tracking-widest uppercase text-muted">PQC-Atlas</span>
      </div>
    </div>
  );
}
