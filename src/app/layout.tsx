import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Inter } from "next/font/google";
import { Toast } from "@heroui/react";
import LenisProvider from "@/components/lenis-provider";

export const metadata: Metadata = {
  title: {
    default: "Rare-Icons — Premium Icon Library",
    template: "%s | Rare-Icons",
  },
  description:
    "Rare-Icons is a premium, open-source SVG icon library for React and Next.js. Browse 3000+ meticulously crafted icons across 59 categories.",
  keywords: [
    "icons",
    "svg icons",
    "react icons",
    "next.js icons",
    "icon library",
    "rare-icons",
  ],
  openGraph: {
    title: "Rare-Icons — Premium Icon Library",
    description: "Browse 3000+ icons across 59 categories.",
    type: "website",
  },
};
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('rare-icons-theme');
                  var theme = stored || 'dark';
                  if (theme === 'system') {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  var root = document.documentElement;
                  if (theme === 'light') {
                    root.classList.remove('dark');
                    root.classList.add('light');
                  } else {
                    root.classList.remove('light');
                    root.classList.add('dark');
                  }
                  root.setAttribute('data-theme', theme);
                  root.style.colorScheme = theme;
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} font-inter bg-background text-foreground min-h-screen antialiased`}
      >
        <Toast.Provider placement="bottom end" isExpanded />
        <ThemeProvider>
          <LenisProvider>{children}</LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
