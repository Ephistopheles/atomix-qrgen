import type { Metadata } from "next";
import { ConfigProvider } from "antd";
import globalTheme, { rubik } from "@/config/themes/globalTheme";
import esES from "antd/locale/es_ES";
import "antd/dist/reset.css";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: "QrGen | AtomixTools",
  description: "Generate QR codes quickly and easily with AtomixTools.",
  keywords: [
    "qr code",
    "qr generator",
    "generate qr",
    "qr maker",
    "qr scanner",
    "generador de qr",
    "crear qr",
    "atomixtools",
    "AtomixTools",
    "utility tool",
  ],

  authors: [{ name: "Johan Amed", url: "https://github.com/Ephistopheles" }],
  applicationName: "QrGen",
  generator: "Next.js",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-120x120.png", sizes: "120x120", type: "image/png" },
    ],
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="es">
      <body className={`${rubik.className} antialiased`}>
        <ConfigProvider locale={esES} theme={globalTheme}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
};

export default RootLayout;
