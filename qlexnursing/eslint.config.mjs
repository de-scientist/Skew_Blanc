import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      // Allow apostrophes in user-facing copy for readability.
      "react/no-unescaped-entities": "off",
      // Fonts are loaded via a stylesheet link (no build-time fetch).
      "@next/next/no-page-custom-font": "off",
      // These components intentionally sync external state (localStorage / OS
      // preferences, media queries) into React on mount — a documented
      // exception to the no-setState-in-effect rule.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
