'use client'
import { Header } from "@/components";
import { Providers } from "./Providers";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;

}>) {
  return (
    <Providers>
      <div className={'flex flex-col gap-3 p-5'}>
        <Header />
        <main>
          {children}
        </main>
      </div>
    </Providers>
  );
}
