/** @type {import('tailwindcss').Config} */
module.exports = {
  // ! Don't forger
  // damtanja :)))
  content: ["./*.{html,js}", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      // Colors
      colors: {
        greenish: "#20EEB0",
        blackish: "#0D0D0D",
        gray: "#888888",
        input: "#EBEFF2",
      },
      // Font Sizes
      fontSize: {
        subtitle: "18px",
        "list-time": "14px",
        input: "14px",
        title: "48px",
      },
      // Font Families
      fontFamily: {
        inter: ["'Inter', sans-serif;"],
        "russo-one": ["'Russo One', sans-serif"],
      },
      // Widths
      width: {
        icon: "24px",
        container: "430px",
        btn: "80px",
      },
      // Max Width
      maxWidth: {
        icon: "24px",
        container: "430px",
      },
      // Height
      height: {
        icon: "24px",
        title: "202px",
      },
      // Spacing
      spacing: {
        "container-padding": "28px",
        main: "24px",
        "input-todos": "36px",
        icons: "14px",
        todos: "5px",
      },
      // Gap
      gap: {
        main: "24px",
      },
      // ! Background Image
      backgroundImage: {
        flowers: "url(imgs/background.svg)",
      },
      // Screens
      screens: {
        sm: "410px",
      },
    },
  },
  plugins: [],
};
