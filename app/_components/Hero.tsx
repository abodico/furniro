import React from "react"

const Hero = () => {
    return (
        <section className="relative container mx-auto bg-[url(https://res.cloudinary.com/dthieqyqq/image/upload/v1728749779/bedroom_1a0b4adb14.png)] bg-cover bg-center bg-no-repeat h-[calc(100vh-64px)] overflow-hidden flex flex-row-reverse">
            {/* <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div> */}

            <div className="relative md:mx-16 mx-6 max-w-screen-xl px-4 py-32 sm:px-6 flex lg:h-full items-center bottom-24 lg:px-8 w-fit justify-end">
                <div className="max-w-xl md:text-left text-center rtl:text-right bg-3e3 md:px-10 md:pt-16 md:pb-9 p-8 rounded-xl">
                    <p className="font-semibold text-black">New Arrival</p>
                    <h1 className="text-3xl font-bold text-primary-main md:text-[52px] md:leading-[65px] md:mt-0 mt-2">
                        Discover Our <br /> New Collection
                    </h1>

                    <p className="mt-4 max-w-lg text-black font-medium sm:text-lg/6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut elit tellus, luctus nec ullamcorper mattis.
                    </p>

                    <div className="md:mt-11 mt-5 md:text-left text-center">
                        <a
                            className="inline-block  bg-primary-main md:px-18 md:py-6 px-8 py-3 text-base font-bold text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-primary-light"
                            href="#"
                        >
                            BUY NOW
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
