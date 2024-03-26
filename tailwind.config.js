/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#3b82f6",
          "secondary": "#d077e5",
          "accent": "#e8efff",
          "neutral": "#140f00",
          "base-100": "#fff",
          "info": "#00e1ff",
          "success": "#4ade80",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
