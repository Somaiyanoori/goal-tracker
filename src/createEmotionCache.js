import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
  key: "muiltr",
});

const createEmotionCache = (direction) => {
  return direction === "rtl" ? cacheRtl : cacheLtr;
};

export default createEmotionCache;
