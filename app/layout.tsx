"use client"
import type { Metadata } from "next"
import "@fontsource/poppins"
import "@fontsource/poppins/700.css"
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/500.css"
import "./globals.css"
import Header from "./_components/Header"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Footer from "./_components/Footer"
import { ClerkProvider } from "@clerk/nextjs"
import { CartContext } from "./_context/cartContext"
import { AlertContext } from "./_context/alertContext"
import { useEffect, useState } from "react"
import Alert, { AlertProps } from "./_components/Alert"
import { IsLoadingCartItemsContext } from "./_context/isLoadingCartItemsContext"
import { usePathname } from "next/navigation"

const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
}

const queryClient = new QueryClient()

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    const [cart, setCart] = useState<{
        id: number | string
        products: object[]
        quantities: object
    }>({
        id: "",
        products: [],
        quantities: {},
    })
    const [alert, setAlert] = useState<AlertProps>({
        title: "Are you sure you want to do that?",
        text: "Doing that could have cause some issues elsewhere, are you 100% sure it's OK?",
        onClick: () => {},
        open: false,
        alertType: "Confirmation",
    })
    const [isLoadingCartItems, setIsLoadingCartItems] = useState<boolean>(true)

    return (
        <ClerkProvider>
            <CartContext.Provider value={{ cart, setCart }}>
                <AlertContext.Provider value={{ alert, setAlert }}>
                    <IsLoadingCartItemsContext.Provider
                        value={{ isLoadingCartItems, setIsLoadingCartItems }}
                    >
                        <html lang="en">
                            <body className="relative">
                                <QueryClientProvider client={queryClient}>
                                    {!pathname.includes("sign-in") &&
                                        !pathname.includes("sign-up") && (
                                            <Header />
                                        )}
                                    <Alert />
                                    {children}
                                    {!pathname.includes("sign-in") &&
                                        !pathname.includes("sign-up") && (
                                            <Footer />
                                        )}
                                </QueryClientProvider>
                            </body>
                        </html>
                    </IsLoadingCartItemsContext.Provider>
                </AlertContext.Provider>
            </CartContext.Provider>
        </ClerkProvider>
    )
}
