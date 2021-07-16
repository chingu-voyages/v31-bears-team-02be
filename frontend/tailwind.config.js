module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
      400: "400px",
      600: "600px",
    },
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
