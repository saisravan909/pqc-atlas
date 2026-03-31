const PptxGenJS = require("pptxgenjs");

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_16x9";
pptx.title = "PQC-Atlas: Conference Deck";
pptx.author = "Sai Sravan Cherukuri & Sai Saketh Cherukuri";

const C = {
  bg: "050C1A",
  card: "0D1A2F",
  primary: "00D4FF",
  accent: "7C3AED",
  safe: "10B981",
  danger: "EF4444",
  warn: "F59E0B",
  text: "F0F6FF",
  muted: "8892A4",
  border: "1E3A5F",
};

function addSlide(cb) {
  const slide = pptx.addSlide();
  slide.background = { color: C.bg };
  cb(slide);
  return slide;
}

// ─── SLIDE 1: TITLE ────────────────────────────────────────────────────────
addSlide((s) => {
  s.addText("CONFERENCE SUBMISSION", {
    x: 0.5, y: 0.4, w: 6, h: 0.3,
    fontSize: 10, bold: true, color: C.primary, charSpacing: 6,
    fontFace: "Calibri",
  });
  s.addText("PQC-Atlas", {
    x: 0.5, y: 0.85, w: 6.5, h: 1.5,
    fontSize: 72, bold: true, color: C.primary,
    fontFace: "Calibri",
  });
  s.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 2.45, w: 1.8, h: 0.04,
    fill: { color: C.primary },
    line: { color: C.primary },
  });
  s.addText("Automated Cryptographic Discovery & Observability Engine", {
    x: 0.5, y: 2.6, w: 7, h: 0.5,
    fontSize: 20, bold: false, color: C.text,
    fontFace: "Calibri",
  });
  s.addText("Find every quantum-vulnerable algorithm in your codebase before a quantum computer finds it for you.", {
    x: 0.5, y: 3.2, w: 7, h: 0.6,
    fontSize: 13, color: C.muted, fontFace: "Calibri",
  });
  s.addText("Sai Sravan Cherukuri & Sai Saketh Cherukuri  |  Innovators, PQC-Atlas", {
    x: 0.5, y: 4.0, w: 6, h: 0.3,
    fontSize: 11, bold: true, color: C.text, fontFace: "Calibri",
  });
  s.addText("github.com/saisravan909/pqc-atlas  |  Apache 2.0  |  Go 1.21+", {
    x: 0.5, y: 4.35, w: 6, h: 0.25,
    fontSize: 10, color: C.muted, fontFace: "Calibri",
  });

  // Right panel stat box
  s.addShape(pptx.ShapeType.rect, {
    x: 7.8, y: 0.8, w: 2.0, h: 3.8,
    fill: { color: C.card },
    line: { color: C.border, size: 1 },
  });
  s.addText("17", { x: 7.8, y: 1.0, w: 2.0, h: 0.8, fontSize: 48, bold: true, color: C.primary, align: "center", fontFace: "Calibri" });
  s.addText("vulnerabilities found", { x: 7.8, y: 1.75, w: 2.0, h: 0.3, fontSize: 9, color: C.muted, align: "center", fontFace: "Calibri" });
  s.addShape(pptx.ShapeType.rect, { x: 8.0, y: 2.15, w: 1.6, h: 0.02, fill: { color: C.border }, line: { color: C.border } });
  s.addText("3", { x: 7.8, y: 2.25, w: 2.0, h: 0.7, fontSize: 40, bold: true, color: C.accent, align: "center", fontFace: "Calibri" });
  s.addText("languages scanned", { x: 7.8, y: 2.9, w: 2.0, h: 0.3, fontSize: 9, color: C.muted, align: "center", fontFace: "Calibri" });
  s.addShape(pptx.ShapeType.rect, { x: 8.0, y: 3.3, w: 1.6, h: 0.02, fill: { color: C.border }, line: { color: C.border } });
  s.addText("3.51ms", { x: 7.8, y: 3.4, w: 2.0, h: 0.6, fontSize: 28, bold: true, color: C.safe, align: "center", fontFace: "Calibri" });
  s.addText("total scan time", { x: 7.8, y: 3.95, w: 2.0, h: 0.3, fontSize: 9, color: C.muted, align: "center", fontFace: "Calibri" });
});

// ─── SLIDE 2: THE STAKES ───────────────────────────────────────────────────
addSlide((s) => {
  s.addText("THE THREAT", {
    x: 0.5, y: 0.3, w: 4, h: 0.3,
    fontSize: 10, bold: true, color: C.danger, charSpacing: 5, fontFace: "Calibri",
  });
  s.addText("Your Encrypted Data Is Being\nCollected Right Now.", {
    x: 0.5, y: 0.7, w: 6.2, h: 1.4,
    fontSize: 32, bold: true, color: C.text, fontFace: "Calibri",
  });
  s.addText("Adversaries are running a strategy called HNDL — Harvest Now, Decrypt Later. They store encrypted data today and wait for a quantum computer to break it. The encryption protecting your systems may already be compromised. It just has not been decrypted yet.", {
    x: 0.5, y: 2.2, w: 6.0, h: 0.9,
    fontSize: 12, color: C.muted, fontFace: "Calibri",
  });

  const bullets = [
    ["RSA-2048 and ECC are broken by quantum computers", "Shor's Algorithm reduces RSA-2048 to hours on a CRQC. No patch exists — only migration.", C.danger],
    ["NSM-10 and CNSA 2.0 mandate migration by 2030", "Federal agencies and critical infrastructure operators face hard deadlines. Non-compliance is a national security failure.", C.warn],
    ["The bottleneck is discovery, not knowledge", "Most organizations know they need to migrate. They do not know which systems are vulnerable.", C.primary],
  ];
  bullets.forEach(([title, body, color], i) => {
    const y = 3.2 + i * 0.72;
    s.addShape(pptx.ShapeType.rect, { x: 0.5, y, w: 0.06, h: 0.45, fill: { color }, line: { color } });
    s.addText(title, { x: 0.7, y, w: 5.8, h: 0.22, fontSize: 11, bold: true, color: C.text, fontFace: "Calibri" });
    s.addText(body, { x: 0.7, y: y + 0.22, w: 5.8, h: 0.28, fontSize: 10, color: C.muted, fontFace: "Calibri" });
  });

  // Big 2030
  s.addText("2030", {
    x: 6.8, y: 1.0, w: 3.0, h: 2.2,
    fontSize: 100, bold: true, color: C.danger, align: "center", fontFace: "Calibri",
  });
  s.addText("CNSA 2.0 Full Compliance Deadline", {
    x: 6.8, y: 3.1, w: 3.0, h: 0.3,
    fontSize: 9, color: C.muted, align: "center", fontFace: "Calibri",
  });
  s.addShape(pptx.ShapeType.rect, { x: 7.0, y: 3.5, w: 2.6, h: 0.02, fill: { color: C.border }, line: { color: C.border } });
  s.addText("2027", { x: 6.8, y: 3.65, w: 1.4, h: 0.45, fontSize: 22, bold: true, color: C.warn, align: "center", fontFace: "Calibri" });
  s.addText("New systems\nPQC-only", { x: 6.8, y: 4.1, w: 1.4, h: 0.35, fontSize: 8, color: C.muted, align: "center", fontFace: "Calibri" });
  s.addText("2035", { x: 8.3, y: 3.65, w: 1.4, h: 0.45, fontSize: 22, bold: true, color: C.text, align: "center", fontFace: "Calibri" });
  s.addText("Estimated\nCRQC arrival", { x: 8.3, y: 4.1, w: 1.4, h: 0.35, fontSize: 8, color: C.muted, align: "center", fontFace: "Calibri" });
});

// ─── SLIDE 3: CRYPTOGRAPHIC BLINDNESS ─────────────────────────────────────
addSlide((s) => {
  s.addText("THE PROBLEM", { x: 0.5, y: 0.3, w: 5, h: 0.3, fontSize: 10, bold: true, color: C.accent, charSpacing: 5, fontFace: "Calibri" });
  s.addText("Most Organizations Are Cryptographically Blind", {
    x: 0.5, y: 0.65, w: 9.5, h: 0.8,
    fontSize: 30, bold: true, color: C.text, fontFace: "Calibri",
  });
  s.addText("The primary barrier to PQC migration is not technology — it is visibility. Before you can replace a vulnerable algorithm, you must first find it.", {
    x: 0.5, y: 1.5, w: 9.0, h: 0.4,
    fontSize: 12, color: C.muted, fontFace: "Calibri",
  });

  const cards = [
    { stat: "99%", label: "of codebases contain quantum-vulnerable cryptography", body: "RSA, ECC, and DSA are deeply embedded across languages, frameworks, and libraries. Most instances are invisible to engineers.", color: C.danger },
    { stat: "Hours", label: "to break RSA-2048 on a Cryptographically-Relevant Quantum Computer", body: "Shor's Algorithm factorizes the mathematical foundation of RSA and ECC in hours, not billions of years.", color: C.warn },
    { stat: "Now", label: "HNDL attacks are active — data is being collected today", body: "Nation-state actors store encrypted traffic today. Retroactive decryption requires no access — only the harvested data.", color: C.primary },
  ];
  cards.forEach(({ stat, label, body, color }, i) => {
    const x = 0.4 + i * 3.3;
    s.addShape(pptx.ShapeType.rect, { x, y: 2.1, w: 3.1, h: 2.6, fill: { color: C.card }, line: { color: C.border, size: 1 } });
    s.addText(stat, { x, y: 2.15, w: 3.1, h: 0.85, fontSize: 44, bold: true, color, align: "center", fontFace: "Calibri" });
    s.addShape(pptx.ShapeType.rect, { x: x + 0.3, y: 3.0, w: 0.5, h: 0.04, fill: { color }, line: { color } });
    s.addText(label, { x, y: 3.1, w: 3.1, h: 0.5, fontSize: 10, bold: true, color: C.text, align: "center", fontFace: "Calibri" });
    s.addText(body, { x, y: 3.62, w: 3.1, h: 0.7, fontSize: 9, color: C.muted, align: "center", fontFace: "Calibri" });
  });

  s.addShape(pptx.ShapeType.rect, { x: 0.4, y: 4.8, w: 9.7, h: 0.55, fill: { color: C.card }, line: { color: C.border, size: 1 } });
  s.addText("The gap is discovery.  Security teams know quantum migration is required. They do not have a systematic inventory of which cryptographic primitives exist, where they live, or how urgent each one is.  PQC-Atlas closes this gap.", {
    x: 0.5, y: 4.85, w: 9.5, h: 0.4, fontSize: 10, color: C.muted, fontFace: "Calibri",
  });
});

// ─── SLIDE 4: HOW IT WORKS ─────────────────────────────────────────────────
addSlide((s) => {
  s.addText("THE SOLUTION", { x: 0.5, y: 0.3, w: 5, h: 0.3, fontSize: 10, bold: true, color: C.primary, charSpacing: 5, fontFace: "Calibri" });
  s.addText("Three Steps.  Zero Guesswork.", {
    x: 0.5, y: 0.65, w: 9.5, h: 0.7,
    fontSize: 34, bold: true, color: C.text, fontFace: "Calibri",
  });
  s.addText("PQC-Atlas transforms your codebase from an unmapped cryptographic risk surface into a prioritized, standards-compliant migration roadmap.", {
    x: 0.5, y: 1.4, w: 9.0, h: 0.4, fontSize: 12, color: C.muted, fontFace: "Calibri",
  });

  const steps = [
    {
      num: "01", title: "Scan", color: C.primary,
      desc: "Deep static analysis across Go, Python, and Java. AST parsing for Go finds structural usage. Regex scanning for Python and Java catches framework-level patterns.",
      bullets: ["RSA, ECC, DSA, ECDSA", "MD5, SHA-1, DES", "Zero code execution required"],
    },
    {
      num: "02", title: "Score", color: C.accent,
      desc: "Every finding receives a Quantum Exposure Score (QES) — a quantitative risk metric mapping algorithm strength, key size, and NIST migration urgency.",
      bullets: ["CRITICAL: QES 1.00-1.10 (RSA)", "HIGH: QES 0.60-0.99 (MD5)", "MEDIUM: QES < 0.60 (SHA-1)"],
    },
    {
      num: "03", title: "Report", color: C.safe,
      desc: "Exports a CycloneDX 1.7 Cryptographic Bill of Materials — a machine-readable inventory with exact NIST FIPS 203/204 replacement guidance per finding.",
      bullets: ["CycloneDX 1.7 CBOM JSON", "FIPS 203/204 migration map", "GRC platform ingestible"],
    },
  ];
  steps.forEach(({ num, title, color, desc, bullets }, i) => {
    const x = 0.4 + i * 3.3;
    s.addShape(pptx.ShapeType.rect, { x, y: 2.0, w: 3.1, h: 3.3, fill: { color: C.card }, line: { color: C.border, size: 1 } });
    s.addText(num, { x: x + 1.8, y: 2.05, w: 1.1, h: 0.5, fontSize: 28, bold: true, color, fontFace: "Calibri", transparency: 60 });
    s.addText(title, { x, y: 2.1, w: 3.1, h: 0.45, fontSize: 22, bold: true, color, align: "center", fontFace: "Calibri" });
    s.addText(desc, { x: x + 0.1, y: 2.6, w: 2.9, h: 0.85, fontSize: 9.5, color: C.muted, fontFace: "Calibri" });
    bullets.forEach((b, bi) => {
      s.addShape(pptx.ShapeType.ellipse, { x: x + 0.15, y: 3.53 + bi * 0.28, w: 0.1, h: 0.1, fill: { color }, line: { color } });
      s.addText(b, { x: x + 0.32, y: 3.47 + bi * 0.28, w: 2.7, h: 0.25, fontSize: 10, color: C.muted, fontFace: "Calibri" });
    });
  });

  s.addShape(pptx.ShapeType.rect, { x: 0.4, y: 5.38, w: 9.7, h: 0.35, fill: { color: C.card }, line: { color: C.border, size: 1 } });
  s.addText("Go — AST    |    Python — Regex    |    Java — Regex    →    LSDB OID Mapping    →    QES Scoring    →    CycloneDX 1.7 CBOM", {
    x: 0.5, y: 5.43, w: 9.5, h: 0.25, fontSize: 9, color: C.muted, align: "center", fontFace: "Calibri",
  });
});

// ─── SLIDE 5: LIVE RESULTS ─────────────────────────────────────────────────
addSlide((s) => {
  s.addText("LIVE DEMONSTRATION", { x: 0.5, y: 0.3, w: 5, h: 0.3, fontSize: 10, bold: true, color: C.primary, charSpacing: 5, fontFace: "Calibri" });
  s.addText("Real Code.  Real Findings.  Real Time.", {
    x: 0.5, y: 0.65, w: 9.5, h: 0.65, fontSize: 32, bold: true, color: C.text, fontFace: "Calibri",
  });
  s.addText("Scanned against examples/legacy-app/ — a realistic microservice included in the repository. No mocked output.", {
    x: 0.5, y: 1.35, w: 8.5, h: 0.35, fontSize: 12, color: C.muted, fontFace: "Calibri",
  });

  const stats = [
    { val: "17", label: "Findings", sub: "Cryptographic vulnerabilities across all files", color: C.primary },
    { val: "3", label: "Languages", sub: "Go (AST), Python (Regex), Java (Regex)", color: C.accent },
    { val: "3.51ms", label: "Scan Time", sub: "Full AST parse and regex scan", color: C.safe },
  ];
  stats.forEach(({ val, label, sub, color }, i) => {
    const x = 0.4 + i * 3.3;
    s.addShape(pptx.ShapeType.rect, { x, y: 1.85, w: 3.1, h: 1.8, fill: { color: C.card }, line: { color: C.border, size: 1 } });
    s.addText(val, { x, y: 1.9, w: 3.1, h: 0.85, fontSize: 52, bold: true, color, align: "center", fontFace: "Calibri" });
    s.addText(label, { x, y: 2.72, w: 3.1, h: 0.28, fontSize: 12, bold: true, color: C.text, align: "center", fontFace: "Calibri" });
    s.addText(sub, { x: x + 0.1, y: 3.0, w: 2.9, h: 0.28, fontSize: 9, color: C.muted, align: "center", fontFace: "Calibri" });
  });

  // Terminal output block
  s.addShape(pptx.ShapeType.rect, { x: 0.4, y: 3.55, w: 9.7, h: 2.0, fill: { color: "030812" }, line: { color: C.border, size: 1 } });
  s.addText("$ go run main.go scan --path examples/", { x: 0.6, y: 3.6, w: 9.0, h: 0.25, fontSize: 9, color: C.muted, fontFace: "Courier New" });
  const lines = [
    ["[java]   TokenService.java:16  — RSA-Legacy", C.danger],
    ["[java]   TokenService.java:24  — ECC-Legacy", C.danger],
    ["[python] auth_service.py:13    — RSA-Legacy", "3776AB"],
    ["[python] auth_service.py:21    — ECC-Legacy", "3776AB"],
    ["[go]     main.go:15            — RSA-Legacy-2048", "00ADD8"],
    ["[go]     main.go:24            — ECDSA-Legacy", "00ADD8"],
  ];
  lines.forEach(([text, color], i) => {
    const col = i % 2 === 0 ? 0 : 4.85;
    const row = Math.floor(i / 2);
    s.addText(text, { x: 0.6 + col, y: 3.9 + row * 0.28, w: 4.5, h: 0.25, fontSize: 8.5, color, fontFace: "Courier New" });
  });
  s.addText("[+] Scan Complete.  Found 17 cryptographic primitives in 3.51ms.  CBOM written.", {
    x: 0.6, y: 5.26, w: 9.0, h: 0.22, fontSize: 9, color: C.safe, fontFace: "Courier New",
  });
});

// ─── SLIDE 6: CI/CD GATE ───────────────────────────────────────────────────
addSlide((s) => {
  s.addText("CI/CD INTEGRATION", { x: 0.5, y: 0.3, w: 5, h: 0.3, fontSize: 10, bold: true, color: C.safe, charSpacing: 5, fontFace: "Calibri" });
  s.addText("Block Violations Before They Reach Production", {
    x: 0.5, y: 0.65, w: 9.5, h: 0.8, fontSize: 28, bold: true, color: C.text, fontFace: "Calibri",
  });
  s.addText("PQC-Atlas integrates as a GitHub Actions gate. Every pull request is scanned automatically. Quantum-vulnerable code cannot merge until it is remediated.", {
    x: 0.5, y: 1.5, w: 8.5, h: 0.4, fontSize: 12, color: C.muted, fontFace: "Calibri",
  });

  // Flow boxes
  const boxes = [
    { label: "Developer\nOpens PR", color: C.muted },
    { label: "PQC-Atlas\nScans", color: C.primary },
  ];
  boxes.forEach(({ label, color }, i) => {
    const x = 0.4 + i * 3.0;
    s.addShape(pptx.ShapeType.rect, { x, y: 2.1, w: 2.7, h: 2.6, fill: { color: C.card }, line: { color, size: 1.5 } });
    s.addText(label, { x, y: 2.9, w: 2.7, h: 0.8, fontSize: 16, bold: true, color, align: "center", fontFace: "Calibri" });
    if (i < boxes.length - 1) {
      s.addShape(pptx.ShapeType.rect, { x: x + 2.7, y: 3.35, w: 0.3, h: 0.05, fill: { color: C.border }, line: { color: C.border } });
    }
  });

  // Blocked box
  s.addShape(pptx.ShapeType.rect, { x: 6.6, y: 2.1, w: 3.1, h: 1.2, fill: { color: "1A0505" }, line: { color: C.danger, size: 1.5 } });
  s.addText("BLOCKED", { x: 6.6, y: 2.25, w: 3.1, h: 0.45, fontSize: 18, bold: true, color: C.danger, align: "center", fontFace: "Calibri" });
  s.addText("RSA-Legacy detected.\nMerge prevented. Engineer must migrate to ML-DSA.", { x: 6.7, y: 2.72, w: 2.9, h: 0.5, fontSize: 9, color: C.muted, align: "center", fontFace: "Calibri" });

  // Approved box
  s.addShape(pptx.ShapeType.rect, { x: 6.6, y: 3.5, w: 3.1, h: 1.2, fill: { color: "051A10" }, line: { color: C.safe, size: 1.5 } });
  s.addText("APPROVED", { x: 6.6, y: 3.65, w: 3.1, h: 0.45, fontSize: 18, bold: true, color: C.safe, align: "center", fontFace: "Calibri" });
  s.addText("No violations. CBOM artifact\nuploaded. Merge allowed.", { x: 6.7, y: 4.12, w: 2.9, h: 0.4, fontSize: 9, color: C.muted, align: "center", fontFace: "Calibri" });

  // Arrow from scan to both
  s.addShape(pptx.ShapeType.rect, { x: 6.3, y: 3.38, w: 0.3, h: 0.05, fill: { color: C.border }, line: { color: C.border } });

  // Bottom info bar
  s.addShape(pptx.ShapeType.rect, { x: 0.4, y: 4.85, w: 9.7, h: 0.75, fill: { color: C.card }, line: { color: C.border, size: 1 } });
  s.addText("Trigger: Every PR and push to main  |  On Violation: Build fails, exact NIST replacement shown  |  On Pass: Signed CBOM uploaded, retained 90 days", {
    x: 0.5, y: 5.05, w: 9.5, h: 0.35, fontSize: 10, color: C.muted, align: "center", fontFace: "Calibri",
  });
});

// ─── SLIDE 7: CLOSING ──────────────────────────────────────────────────────
addSlide((s) => {
  s.addText("PQC-Atlas", { x: 0, y: 0.3, w: 10, h: 0.3, fontSize: 10, bold: true, color: C.primary, charSpacing: 5, align: "center", fontFace: "Calibri" });
  s.addText("The 2030 Deadline\nIs Not Optional.", {
    x: 0.5, y: 0.7, w: 9.5, h: 1.5, fontSize: 44, bold: true, color: C.text, align: "center", fontFace: "Calibri",
  });
  s.addText("Migration begins with discovery. PQC-Atlas gives every security team, DevSecOps engineer, and compliance officer the visibility they need to begin — today.", {
    x: 1.0, y: 2.3, w: 8.0, h: 0.55, fontSize: 12, color: C.muted, align: "center", fontFace: "Calibri",
  });

  const actions = [
    { word: "Discover", color: C.primary, body: "Scan your entire codebase. Find every quantum-vulnerable algorithm. Build your complete cryptographic inventory." },
    { word: "Prioritize", color: C.accent, body: "QES scoring tells you which algorithms to migrate first. Focus engineering effort where HNDL risk is highest." },
    { word: "Comply", color: C.safe, body: "CycloneDX 1.7 CBOM output is ingestible by federal GRC platforms. CI gate prevents cryptographic drift from day one." },
  ];
  actions.forEach(({ word, color, body }, i) => {
    const x = 0.5 + i * 3.25;
    s.addShape(pptx.ShapeType.rect, { x, y: 3.0, w: 3.0, h: 1.55, fill: { color: C.card }, line: { color: C.border, size: 1 } });
    s.addText(word, { x, y: 3.08, w: 3.0, h: 0.45, fontSize: 20, bold: true, color, align: "center", fontFace: "Calibri" });
    s.addText(body, { x: x + 0.1, y: 3.58, w: 2.8, h: 0.8, fontSize: 9.5, color: C.muted, align: "center", fontFace: "Calibri" });
  });

  s.addShape(pptx.ShapeType.rect, { x: 3.8, y: 4.7, w: 2.8, h: 0.04, fill: { color: C.border }, line: { color: C.border } });
  s.addText("Sai Sravan Cherukuri  &  Sai Saketh Cherukuri  |  Innovators, PQC-Atlas", {
    x: 0, y: 4.85, w: 10, h: 0.3, fontSize: 11, bold: true, color: C.text, align: "center", fontFace: "Calibri",
  });
  s.addText("github.com/saisravan909/pqc-atlas  |  Apache 2.0  |  NIST FIPS 203/204  |  NSM-10  |  CNSA 2.0", {
    x: 0, y: 5.2, w: 10, h: 0.3, fontSize: 10, color: C.primary, align: "center", fontFace: "Calibri",
  });
});

// ─── WRITE FILE ────────────────────────────────────────────────────────────
pptx.writeFile({ fileName: "/home/runner/workspace/PQC-Atlas-Conference-Deck.pptx" })
  .then(() => console.log("DONE"))
  .catch(e => { console.error(e); process.exit(1); });
