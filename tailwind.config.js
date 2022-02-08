const tw_plugin = require("tw-elements/dist/plugin");
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [tw_plugin],
  theme: {
    backgroundImage: {
      "pack-train": "url('https://vesting-bsc.galaxywar.io/static/media/bodybg.8b61e43f.jpg')",
    },
    extend: {},
  },
};
