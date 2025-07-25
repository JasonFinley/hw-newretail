import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProviderChakra from "./providers/chakra";
import ContextFilter from "./context/filter";
import ContextDevice from "./context/device";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HW-Newretail",
  description: "Generated HW-Newretail by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ProviderChakra>
          <ContextDevice>
            <ContextFilter>
              {children}
            </ContextFilter>
          </ContextDevice>
        </ProviderChakra>
      </body>
    </html>
  );
}
