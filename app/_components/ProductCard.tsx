import React from "react"
import { Product } from "./Products"
import { MdCompareArrows, MdShare } from "react-icons/md"
import { FaRegHeart } from "react-icons/fa"
import Link from "next/link"

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <li className="relative group">
            <div className="w-full h-full bg-black/40 absolute top-0 left-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-200 flex flex-col items-center justify-center">
                <Link
                    href={"/product-details/" + product.documentId}
                    className="inline-block  bg-white px-8 py-3 text-sm font-medium text-primary-main transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-primary-light"
                >
                    Add to cart
                </Link>
                <div className="flex text-white text-sm gap-2 justify-between mt-6">
                    <p className="flex items-center hover:text-primary-main transition cursor-pointer gap-1 font-semibold">
                        <MdShare className="text-lg/none" />
                        Share
                    </p>
                    <p className="flex items-center hover:text-primary-main transition cursor-pointer gap-1 font-semibold">
                        <MdCompareArrows className="text-lg/none" />
                        Compare
                    </p>
                    <p className="flex items-center hover:text-primary-main transition cursor-pointer gap-1 font-semibold">
                        <FaRegHeart className="text-lg/none" />
                        Like
                    </p>
                </div>
            </div>
            <div className=" block overflow-hidden">
                <div className="relative">
                    <img
                        src={product?.image?.url || ""}
                        alt=""
                        className="h-[301px] w-full object-cover object-top transition duration-500 group-hover:scale-105 "
                    />
                    {(product.hasDiscount || product.new) && (
                        <p
                            className={`rounded-full absolute top-6 right-6 flex items-center justify-center w-12 h-12 text-white font-medium ${
                                product.new ? "bg-[#2EC1AC]" : "bg-[#E97171]"
                            }`}
                        >
                            {product.hasDiscount
                                ? "-" + product.discount + "%"
                                : "New"}
                        </p>
                    )}
                </div>

                <div className="relative bg-[#F4F5F7] pt-4 pb-8 px-4  ">
                    <h3 className="text-black font-semibold text-2xl ">
                        {product.title}
                    </h3>
                    <p className="text-[#898989] font-medium py-2">
                        {product.description}
                    </p>

                    <div className="flex items-center gap-4">
                        <p className="tracking-wider text-black font-semibold">
                            ${product.price}
                        </p>
                        {product.hasDiscount && (
                            <p className=" text-[#B0B0B0] line-through">
                                ${product.oldPrice}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </li>
    )
}

export default ProductCard
