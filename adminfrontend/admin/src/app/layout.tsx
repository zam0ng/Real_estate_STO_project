import "./globals.css";
import type { Metadata } from "next";

import Link from "next/link";


export const metadata: Metadata = {
  title: "🐣STO PROJECT🐣",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        
        <h3> 목차 </h3>
        <Link href="/"> home 으로 이동 </Link> <br></br>
        <Link href = {"/admin/main"} > 🚀🚀🚀 어드민 페이지 이동 </Link>

        {/* page 내용들 */}
        {children}
      

      </body>
    </html>
  );
}
