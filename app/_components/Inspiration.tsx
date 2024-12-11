"use client"
import React from "react"
import { Navigation, Pagination } from "swiper/modules"

import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Image from "next/image"

const slides = Array.from(
    { length: 4 },
    () =>
        "https://res.cloudinary.com/dthieqyqq/image/upload/v1728749779/bedroom1_901be0de55.png"
)

const Inspiration = () => {
    return (
        <div className="container mx-auto py-12 px-6 flex lg:flex-row flex-col items-center bg-fcf">
            <div className="lg:text-left text-center">
                <h2 className="font-bold lg:text-[40px] sm:text-3xl text-2xl">
                    50+ Beautiful rooms inspiration
                </h2>
                <p className="font-medium mt-2 sm:max-w-[60%] lg:max-w-full mx-auto">
                    Our designer already made a lot of beautiful prototipe of
                    rooms that inspire you
                </p>
                <a
                    className="inline-block px-9 py-3 text-sm font-medium mt-6 bg-primary-main text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:bg-primary-light"
                    href="/shop"
                >
                    Show More
                </a>
            </div>
            <div className="lg:max-w-[66%] max-w-full flex items-center justify-center lg:mt-0 mt-8">
                <Swiper
                    modules={[Navigation, Pagination, EffectCoverflow]}
                    spaceBetween={24}
                    slidesPerView={2}
                    navigation
                    effect={"coverflow"}
                    centeredSlides={true}
                    pagination={{ clickable: true }}
                    // onSwiper={(swiper) => console.log(swiper)}
                    // onSlideChange={() => console.log("slide change")}
                >
                    {slides.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Image
                                src={item}
                                alt="img"
                                width={372}
                                height={486}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default Inspiration
