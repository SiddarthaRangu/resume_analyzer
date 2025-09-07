/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          'blue': '#3A86FF',    
          'dark-blue': '#03045E', 
        },
        'accent': {
          'yellow': '#FFBE0B',  
        },
        'neutral': {
          'bg': '#F7F9FC',      
          'card': '#FFFFFF',    
          'border': '#E2E8F0',  
          'text-primary': '#1E293B', 
          'text-secondary': '#64748B', 
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};