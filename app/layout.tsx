import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://growthcircle-community.uttkarshdungriyal.chatgpt.site"),
  title: "althingsattention — Learn marketing. Build real projects. Grow together.",
  description: "An India-rooted, globally open community for marketers to learn, connect, share work, and find opportunities.",
  openGraph: { title: "althingsattention", description: "Learn marketing. Build real projects. Grow together.", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "althingsattention — Learn marketing. Build real projects. Grow together." }] },
  twitter: { card: "summary_large_image", title: "althingsattention", description: "Learn marketing. Build real projects. Grow together.", images: ["/og.jpg"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
