module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        "img-slide": {
          "0%": {
            "object-position": "10% 10%",
            opacity: "0",
          },
          "1%": {
            opacity: 1,
          },
          "99%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
            "object-position": "90% 90%",
          },
        },
      },
      animation: {
        "img-slide": "img-slide 100s linear infinite",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
