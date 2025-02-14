import { SignUp } from "@clerk/nextjs"
import Image from "next/image"

export default function Page() {
    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src="https://res.cloudinary.com/dthieqyqq/image/upload/v1728749779/bedroom_1a0b4adb14.png"
                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                    />
                    <a className="block text-white" href="#">
                        <span className="sr-only">Home</span>
                        <Image
                            src="https://res.cloudinary.com/dthieqyqq/image/upload/v1729237272/logo_Sign_5e080972a2.svg"
                            alt="logo"
                            width={50}
                            height={32}
                        />
                    </a>

                    <div className="hidden lg:relative lg:block lg:p-12">
                        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                            Welcome to Furniro
                        </h2>

                        <p className="mt-4 leading-relaxed text-white/90">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Eligendi nam dolorum aliquam, quibusdam
                            aperiam voluptatum.
                        </p>
                    </div>
                </section>

                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <div className="relative block lg:hidden mb-4 text-center">
                            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl flex justify-center">
                                Welcome to Furniro
                                <a className=" " href="#">
                                    <span className="sr-only">Home</span>
                                    <Image
                                        src="https://res.cloudinary.com/dthieqyqq/image/upload/v1729237272/logo_Sign_5e080972a2.svg"
                                        alt="logo"
                                        width={50}
                                        height={32}
                                    />
                                </a>
                            </h1>

                            <p className="mt-4 leading-relaxed text-gray-500">
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Eligendi nam dolorum aliquam,
                                quibusdam aperiam voluptatum.
                            </p>
                        </div>
                        <div className="mx-auto w-fit">
                            <SignUp />
                        </div>
                    </div>
                </main>
            </div>
        </section>
    )
}
