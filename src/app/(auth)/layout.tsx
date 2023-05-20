import "../../app/globals.css"
import GlassPane from "@/components/GlassPane"

export const metadata = {
      title: "Register Page",
        description: "Signin or signup page",
  }  
    
    export default function RootLayout({ children }: { children: React.ReactNode }) {
        return (
            <html>
                <body className="p-6 rainbow-mesh h-screen w-screen">
                  <GlassPane className="w-full h-full flex items-center justify-center">
                      {children}
                    </GlassPane>
                  </body>
                </html>
        )      
    }      
                                                                                                                                                                                                                       
