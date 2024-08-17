import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { MenuProvider } from "@/context/MenuContext";
import { NextAuthProvider } from "./providers/AuthProvider";
import Header from "./elements/header/header";
import HeaderBottom from "./elements/headerBottom/headerBottom";
import Footer from "./elements/footer/footer";
import GlobalForm from "./elements/authentification/globalForm";
import CartModel from "./elements/cartModel/cartModel";
import Alert from "./elements/alert/alert";
import Menu from "./elements/menu/menu";
import SeccessAuth from "./elements/seccessAuth/seccessAuth";
import { ReduxProvider } from "./providers/ReduxProvider";

const listItems = ["home", "shop", "about", "contact", "faq"];

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Comfy",
  description: "Where Luxury Meets Comfort",
  icons: {
    icon: [{ url: "/logo.png" }, { url: "/logo.png", sizes: "32x32" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="icon"
          href="/logo.png"
        />
      </Head>
      <body className={inter.className}>
        <NextAuthProvider>
          <MenuProvider>
            <ReduxProvider>
              <GlobalForm />
              <CartModel />
              <SeccessAuth />
              <Alert />
              <Header />
              <Menu listItems={listItems} />
              {children}
              <Footer />
              <HeaderBottom />
            </ReduxProvider>
          </MenuProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
