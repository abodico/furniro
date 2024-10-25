"use client"
import Image from "next/image"
import React from "react"
import { SignInButton, UserButton, useUser } from "@clerk/nextjs"
import { FaRegHeart } from "react-icons/fa"
import { FiShoppingCart } from "react-icons/fi"
import { BiSearch } from "react-icons/bi"

const tabs = [
    { title: "Home", link: "/" },
    { title: "Shop", link: "/shop" },
    { title: "About", link: "/about" },
    { title: "Contact", link: "/contact" },
]
const Header = () => {
    const user = useUser()
    return (
        user && (
            <header className="bg-white">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="md:flex md:items-center md:gap-12">
                            <a className="block" href="/">
                                <span className="sr-only">Home</span>
                                <Image
                                    src="https://res.cloudinary.com/dthieqyqq/image/upload/v1728750471/logo_1c569b588d.svg"
                                    alt="logo"
                                    width={185}
                                    height={41}
                                />
                            </a>
                        </div>

                        <div className="hidden md:block">
                            <nav aria-label="Global">
                                <ul className="flex items-center gap-20 text-sm">
                                    {tabs.map((tab) => (
                                        <li key={tab.title}>
                                            <a
                                                key={tab.title}
                                                className="text-black transition hover:text-primary-main active:text-primary-main font-medium"
                                                href={tab.link}
                                            >
                                                {tab.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        <div className="flex items-center gap-4">
                            {user ? (
                                <>
                                    <BiSearch className="text-xl/none" />
                                    <FaRegHeart />
                                    <FiShoppingCart />
                                    <UserButton />
                                </>
                            ) : (
                                <div className="sm:flex sm:gap-4">
                                    <button className="inline-block rounded-md bg-primary-main px-5 py-2.5 text-base font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:bg-primary-light">
                                        <SignInButton />
                                    </button>

                                    <div className="hidden sm:flex">
                                        <a
                                            className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:scale-110 hover:shadow-xl focus:outline-none"
                                            href="/sign-up"
                                        >
                                            Register
                                        </a>
                                    </div>
                                </div>
                            )}

                            <div className="block md:hidden">
                                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    )
}

export default Header
