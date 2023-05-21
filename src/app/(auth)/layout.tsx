import "../../app/globals.css"
import GlassPane from "@/components/GlassPane"
import { Inter } from "next/font/google"

const inter = Inter({
    subsets: ['latin']
})



export const metadata = {
      title: "Register Page",
        description: "Signin or signup page",
  }  
    
    export default function RootLayout({ children }: { children: React.ReactNode }) {
        return (
            <html lang="en" className={inter.className}>
                <body className="sm:p-4 p-2  rainbow-mesh min-h-screen">
                  <GlassPane className="w-full min-h-full px-4 py-6  sm:p-6 flex items-center justify-center">
                      {children}
                    </GlassPane>
                  </body>
                </html>
        )      
    }      
                                                                                                                                                                                                                       
