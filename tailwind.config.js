/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
        
          "primary": "#5c0003",
                  
          "secondary": "#FFFFFF",
                  
          "accent": "#3b2123",
                  
          "neutral": "#dc2626",
                  
          "base-100": "#393e41",
                  
          "info": "#3abff8",
                  
          "success": "#44bba4",
                  
          "warning": "#fbbd23",
                  
          "error": "#f87272",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
  ],
}
