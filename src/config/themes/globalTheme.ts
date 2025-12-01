import type { ThemeConfig } from "antd";
import { Rubik } from "next/font/google";

export const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
});

const globalTheme: ThemeConfig = {
  token: {
    fontFamily: rubik.style.fontFamily,
    borderRadius: 20,
  },
  components: {
    Card: {},
  },
};

export default globalTheme;
