import Header from "@/components/layout/Header";
import Background from "@/components/layout/Background";
import { CartProvider } from "@/context/CartContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ShoeShop",
  description:
    "Discover a wide selection of trendy sneakers, shoes and accessories on ShoeShop. Enjoy fast delivery and free returns. Shop now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}  antialiased flex flex-col min-h-screen`}
      >
        <CartProvider>
          <Background />
          <Header />
          <main className="relative z-10 flex-grow">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
