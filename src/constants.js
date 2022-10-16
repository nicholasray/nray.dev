const screens = {
  sm: `${640 / 16}rem`,
  md: `${768 / 16}rem`,
  lg: `${1024 / 16}rem`,
  xl: `${1280 / 16}rem`,
  "2xl": `${1536 / 16}rem`,
};

module.exports = {
  url: "https://www.nray.dev",
  screens,
  animations: `(prefers-reduced-motion: no-preference) and (min-width: ${screens.sm})`,
};
