import type { Metadata } from "next";
import { Playfair_Display, Lato, Montserrat, Great_Vibes } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Taart & Koek | Handgemaakte Taarten Rotterdam-Nesselande",
  description:
    "Handgemaakte taarten op maat voor verjaardagen, babyshowers, gender reveals en meer. Geen fondant, alleen heerlijke ganache. Rotterdam-Nesselande.",
  keywords: ["taart", "rotterdam", "nesselande", "verjaardagstaart", "babyshower", "gender reveal", "handgemaakt"],
  openGraph: {
    title: "Taart & Koek",
    description: "Droomtaarten op maat uit Rotterdam-Nesselande",
    images: ["/images/logo-taart-koek.jpeg"],
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${playfair.variable} ${lato.variable} ${montserrat.variable} ${greatVibes.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
