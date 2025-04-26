/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
      },
    },
    extend: {
      gridTemplateColumns: {
        20: "repeat(20, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-13": "span 13 / span 13",
        "span-14": "span 14 / span 14",
        "span-15": "span 15 / span 15",
        "span-16": "span 16 / span 16",
        "span-17": "span 17 / span 17",
        "span-18": "span 18 / span 18",
        "span-19": "span 19 / span 19",
        "span-20": "span 20 / span 20",
      },
      colors: {
        main: "#BF5523",
        peach: "#FFEBE1",
        lightPeach: "#FFCDb4",
        lightGray: "#DDD8D6",
      },
      backgroundImage: {
        "gradient-black": "linear-gradient(to right, #000000, #00000000)",
        "gradient-peach-gray": "linear-gradient(to right, #FFCB4, #DDD8D6)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#3498db",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
