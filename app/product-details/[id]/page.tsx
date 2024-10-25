"use client"
import { useGetData } from "@/utils/useQueries"
import Image from "next/image"
import React from "react"
import { FaChevronRight } from "react-icons/fa"

const ProductDetails = ({ params }: any) => {
    const { data } = useGetData(`/products/${params.id}?populate=*`)
    console.log(data?.data.data)
    return (
        <div>
            {/* breadCrumb */}
            <div className="bg-f9f py-9">
                <div className="container-mx-auto px-24">
                    <div className="flex items-center gap-1.5">
                        <a href="/" className="font-medium">
                            Home
                        </a>
                        <FaChevronRight className="ml-3.5 mr-6" />
                        <a href="/shop" className="font-medium">
                            Shop
                        </a>
                        <FaChevronRight className="ml-3.5 mr-6" />
                        <p className="">{data?.data.data.title}</p>
                    </div>
                </div>
            </div>
            <div className="flex container mx-auto gap-20 px-24 mt-9">
                <div className="bg-f9f rounded-[10px] overflow-hidden">
                    <Image
                        src={data?.data.data.image.url}
                        alt={data?.data.data.title}
                        width={423}
                        height={500}
                        className="object-cover"
                    />
                </div>
                <div className="">
                    <h2 className="text-[42px]">{data?.data.data.title}</h2>
                    <p className="text-[#9F9F9F] text-2xl font-medium mb-4">
                        $ {data?.data.data.price}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
