import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

console.log("Running Fire Dragon Quality & Integrity Audit Checks...\n");

let failures = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
  } else {
    console.error(`  [FAIL] ${message}`);
    failures++;
  }
}

// 1. Verify critical public assets exist
console.log("1. Checking referenced static assets in public directory:");
const publicAssets = [
  "Mohamed-Samir-Khonany.pdf",
  "assets/images/logo/logo-banner.png",
  "assets/images/logo/logo.png",
  "assets/images/profilePhoto.png",
  "assets/images/projects/FlashStore.png",
  "assets/images/projects/Pe2pia.png",
];

for (const relPath of publicAssets) {
  const fullPath = path.join(rootDir, "public", relPath);
  assert(fs.existsSync(fullPath), `Public asset exists: public/${relPath}`);
}

// 2. Check LightboxModal syntax and export
console.log("\n2. Checking LightboxModal component integrity:");
const lightboxPath = path.join(rootDir, "components", "UI", "LightboxModal", "LightboxModal.tsx");
const lightboxContent = fs.readFileSync(lightboxPath, "utf-8");
assert(
  lightboxContent.includes("useRef<HTMLDivElement>(null)"),
  "LightboxModal uses typed HTMLDivElement ref"
);
assert(
  !lightboxContent.includes("({event}:{ event: MouseEvent })"),
  "LightboxModal uses valid MouseEvent parameter signature"
);

// 3. Check React 19 ref safety in glowCursor
console.log("\n3. Checking GlowCursor React 19 ref safety:");
const cursorPath = path.join(rootDir, "components", "UI", "glowCursor", "glowCursor.tsx");
const cursorContent = fs.readFileSync(cursorPath, "utf-8").replace(/\r\n/g, "\n");
assert(
  !cursorContent.includes("const cfgRef = useRef(\n    {} as"),
  "GlowCursor initializes cfgRef with non-empty props"
);
assert(
  cursorContent.includes("useEffect(() => {\n    cfgRef.current = {"),
  "GlowCursor updates cfgRef inside useEffect instead of render scope"
);

// 4. Check scanline animation in terminalBlock
console.log("\n4. Checking TerminalBlock performance optimization:");
const terminalPath = path.join(rootDir, "components", "UI", "not-found", "terminalBlock.tsx");
const terminalContent = fs.readFileSync(terminalPath, "utf-8");
assert(
  !terminalContent.includes("setScanPos"),
  "TerminalBlock scanline no longer uses 60Hz React state updates (setScanPos removed)"
);
assert(
  terminalContent.includes("animate-[scanline_2s_linear_infinite]"),
  "TerminalBlock uses hardware-accelerated CSS keyframe for scanline"
);

// 5. Check Header scroll passive flag
console.log("\n5. Checking Header scroll performance optimization:");
const headerPath = path.join(rootDir, "components", "UI", "layout", "header", "header.tsx");
const headerContent = fs.readFileSync(headerPath, "utf-8");
assert(
  headerContent.includes("{ passive: true }"),
  "Header window scroll listener uses passive: true"
);
assert(
  headerContent.includes("requestAnimationFrame"),
  "Header window scroll listener uses requestAnimationFrame throttling"
);

console.log("\n" + "=".repeat(60));
if (failures === 0) {
  console.log("All audit integrity checks PASSED successfully!");
  process.exit(0);
} else {
  console.error(`Audit checks completed with ${failures} failure(s).`);
  process.exit(1);
}
