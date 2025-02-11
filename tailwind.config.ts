import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4869D9",
        "primary-dark": "#3C56AB",
      },
    },
  },
  plugins: [forms],
} satisfies Config;
