import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // isMounted pattern (useEffect(() => setMounted(true), [])) is intentional
      // for SSR/hydration mismatch prevention — a well-established React pattern.
      "react-hooks/set-state-in-effect": "off",
      // Math.random() for visual texture arrays is intentional (not render logic).
      "react-hooks/purity": "off",
    },
  },
]);

export default eslintConfig;
