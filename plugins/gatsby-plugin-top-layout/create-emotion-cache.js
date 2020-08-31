import createCache from "@emotion/cache";

export const createMyCache = () =>
  createCache({
    key: "my-prefix-key",
    stylisPlugins: [
      /* your plugins here */
    ],
    // prefix based on the css property
    prefix: (key) => {
      switch (key) {
        case "flex":
          return false;
        case "transform":
        default:
          return true;
      }
    },
  });

export const myCache = createMyCache();
