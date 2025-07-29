import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amazon Paperback Leaderboard",
  description: "Track and compare Amazon paperback books by Best Sellers Rank",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
