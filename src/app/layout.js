import { Inter } from 'next/font/google'
import './globals.css'
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MealFixr: AI-powered Meal Planning for Healthy & Delicious Eating',
  description: "Struggling with meal planning? MealFixr's AI creates personalized, healthy meal plans based on your preferences, goals, and ingredients. Get recipe suggestions, track calories, and generate grocery lists. Eat well, save time, stress less with MealFixr.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
      <MantineProvider defaultColorScheme="light">{children}</MantineProvider>
      </body>
    </html>
  )
}
