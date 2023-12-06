"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
 
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'


const queryClient = new QueryClient()

const Providers = ({ children}: {children: ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>

    <SessionProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          >
        { children }
        </NextThemesProvider>
    </SessionProvider>
    </QueryClientProvider>
  )
}

export default Providers