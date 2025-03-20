import { Roboto } from "next/font/google";
import "./global.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Providers } from "../providers";

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
