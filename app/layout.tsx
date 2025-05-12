import { Inter, Orbitron, Exo_2, Montserrat, Poppins, Raleway } from "next/font/google"
import { Syncopate, Quicksand, Audiowide, Rajdhani, Gruppo } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import PageTransition from "@/components/page-transition"
import BackgroundParticles from "@/components/background-particles"
import MouseTrailEffect from "@/components/mouse-trail-effect"

// Original fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" })
const exo2 = Exo_2({ subsets: ["latin"], variable: "--font-exo2" })
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})
const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
})

// New eye-catching fonts
const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-syncopate",
})
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
})
const audiowide = Audiowide({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-audiowide",
})
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
})
const gruppo = Gruppo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-gruppo",
})

export const metadata = {
  title: "Olanike | Developer Portfolio",
  description: "Professional portfolio for a software developer with 3+ years of experience",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${inter.variable} ${orbitron.variable} ${exo2.variable} ${montserrat.variable} 
          ${poppins.variable} ${raleway.variable} ${syncopate.variable} ${quicksand.variable}
          ${audiowide.variable} ${rajdhani.variable} ${gruppo.variable}
          font-quicksand
        `}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/90">
            <BackgroundParticles />
            <MouseTrailEffect />
            <Navbar />
            <main className="flex-grow">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
