import { 
    Geist, 
    Geist_Mono, 
    Playfair_Display, 
    Roboto_Serif, 
    Oswald, 
    Poppins,
    Raleway
  } from "next/font/google";
  
  // Main system font (Geist)
  export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });
  
  export const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });
  
  // Heading font alternatives
  export const playfairDisplay = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
  });
  
  export const robotoSerif = Roboto_Serif({
    variable: "--font-roboto-serif",
    subsets: ["latin"],
  });
  
  // Display/accent font alternative
  export const oswald = Oswald({
    variable: "--font-oswald",
    subsets: ["latin"],
  });
  
  // Secondary sans-serif alternatives
  export const poppins = Poppins({
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
    subsets: ["latin"],
  });
  
  export const raleway = Raleway({
    variable: "--font-raleway",
    subsets: ["latin"],
  });