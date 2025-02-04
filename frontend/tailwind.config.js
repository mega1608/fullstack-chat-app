import daisyui from 'daisyui'



/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui:{
    themes:[
      "light","valentine","halloween","garden","forest","aqua",
      "dark",
      "cupcake","corporate","synthwave","cyberpunk",
       "retro","bumblebee","emarald"
    ]
  }
}