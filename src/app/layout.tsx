import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simbiox Movies",
  description: "Simbiox Favorite Movies",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;

}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
