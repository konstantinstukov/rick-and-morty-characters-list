import { Roboto } from "next/font/google";
import "./global.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Providers } from "../providers";

export const metadata = {
  title: "Rick and Morty Characters List",
  description: "Rick and Morty Characters List",
  keywords: "Rick and Morty, characters, List",
  openGraph: {
    title: "Rick and Morty Characters",
    description: "Rick and Morty Characters List",
    type: "website",
    url: "http://localhost:3000/",
    images: [
      {
        url: "http://localhost:3000/rick-and-morty.jpg",
        width: 800,
        height: 600,
        alt: "Rick and Morty Characters",
      },
    ],
  },
};

const roboto = Roboto({
  subsets: ["latin"],
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-google-analytics-opt-out=""
      className={roboto.className}
    >
      <body className="min-h-dvh flex flex-col">
        <Header />
        <Providers>
          <main className="w-full max-w-7xl flex-grow mx-auto">{children}</main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
