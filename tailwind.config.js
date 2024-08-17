const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./(components)/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(dropdown|menu|divider|popover|button|ripple|spinner).js",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#c7ab62 !important",
        primaryColor: "#444 !important",
        textColor: "#666",
        linkColor: "#999",
        priceColor: "#888",
        mainBlack: "#222",
      },

      backgroundColor: {
        bgColor: "rgba(0, 0, 0, .5) !important",
        mainbgColor: "#222 !important",
        darkColor: "#212529",
        AlertColor: "#e2e3e5",
      },

      backgroundSize: {
        bgSize: "587.906px 587.906px",
      },

      backgroundImage: {
        bgCoverImage: "url('/images/cover-image.jpg')",
      },

      width: {
        customWidth: "600px",
      },

      screens: {
        xs: { min: "0px", max: "767px" },
        sm: { min: "768px", max: "990px" },
        md: { min: "991px", max: "1439px" },
        lg: { min: "1440px" },
      },

      fontSize: {
        "font-size-one": "calc(0.1rem + 3vw)",
        "font-size-two": "calc(0.1rem + 1.5vw)",
        "font-size-tree": "calc(0.3rem + 1vw)",
      },

      zIndex: {
        "primary-Zindex": "1000",
        "second-Zindex": "2000",
        "third-Zindex": "3000",
        "fourth-Zindex": "4000",
        "Fifth-Zindex": "5000",
        "sixth-Zindex": "6000",
        "Seventh-Zindex": "7000",
        "eighth-Zindex": "8000",
      },

      opacity: {
        "btn-disabled": "0.65",
      },

      borderColor: {
        borderColor: "#dee2e6",
      },
      maxHeight: {
        "max-height": "40rem !important",
      },
    },
    plugins: [nextui()],
  },
};
