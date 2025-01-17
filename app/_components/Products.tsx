"use client"
import { useGetData, usePostData } from "@/utils/useQueries"
import React from "react"
import { FaRegHeart } from "react-icons/fa"
import { MdCompareArrows, MdShare } from "react-icons/md"
import ProductCard from "./ProductCard"

interface Details {
    general: {
        salesPackage: string
        modelNumber: string
        secondaryMaterial: string
        configuration: string
        upholsteryMaterial: string
        upholsteryColor: string
    }
    product: {
        fillingMaterial: string
        finishType: string
        adjustableHeadrest: string
        maximumLoadCapacity: string
        originOfManufature: string
    }
    dimensions: {
        width: string
        height: string
        depth: string
        weight: string
        seatHeight: string
        legHeight: string
    }
}
export interface Product {
    createdAt: string
    description: string
    discount: number | null
    documentId: string
    hasDiscount: boolean
    id: number
    image: any
    locale: null
    localizations: any[]
    new: null | boolean
    oldPrice: null | number
    price: number
    publishedAt: string
    title: string
    updatedAt: string
    details: Details
}
const Products = () => {
    const { data: products } = useGetData("/products?populate=*")
    const { mutate } = usePostData("/products")
    // mutate
    return (
        <section
        // onClick={() => {
        //     mutate({
        //         data: {
        //             title: "post one",
        //             description: "description one",
        //             price: 99,
        //             hasDiscount: false,
        //             new: true,
        //             // image: "../../public/logo.svg",
        //         },
        //     })
        // }}
        >
            <div className="mx-auto container xl:px-24 md:px-12 px-8 py-8 sm:px-6 sm:py-12 ">
                <h2 className="text-[40px] text-center font-bold text-black sm:text-3xl">
                    Our Products
                </h2>

                <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {products?.data.data.slice(0, 8).map((product: Product) => (
                        <ProductCard
                            product={product}
                            key={product.documentId}
                        />
                    ))}
                </ul>
                <div className="flex justify-center mt-8">
                    <a
                        className="inline-block border border-current px-18 py-3 text-sm font-medium text-primary-main transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-primary-light"
                        href="/shop"
                    >
                        Show More
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Products
