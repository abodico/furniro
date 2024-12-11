"use client"
import { useGetData, usePostData, useUpdateData } from "@/utils/useQueries"
import Image from "next/image"
import React, { useContext, useEffect } from "react"
import { FaChevronRight } from "react-icons/fa"
// import RelatedProducts from "./_components/RelatedProducts"
import Skeleton from "./_components/Skeleton"
import { useUser } from "@clerk/nextjs"
import { CartContext } from "@/app/_context/cartContext"

const ProductDetails = ({ params }: any) => {
    const { user } = useUser()
    const { data: product } = useGetData(`/products/${params.id}?populate=*`)
    const { mutate, mutateAsync } = usePostData("/carts")
    const { cart, setCart } = useContext(CartContext)
    const { mutate: updateCart } = useUpdateData(`/carts/${cart?.id ?? ":id"}`)

    const { data: cartItems, refetch } = useGetData(
        `/carts?populate[products][populate]=image&filters[email][$eq]=${user?.primaryEmailAddress?.emailAddress}`
    )
    useEffect(() => {
        cartItems?.data?.data[0] &&
            setCart({
                id: cartItems?.data.data[0]?.documentId,
                products: cartItems?.data.data[0]?.products,
                quantities: cartItems?.data.data[0]?.quantities,
            })
    }, [cartItems])

    const handleIncrement = () => {
        const addCart = {
            data: {
                username: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
                products: [product?.data.data?.documentId],
                quantities: {
                    [product?.data.data?.documentId]: 1,
                },
            },
        }

        const editCart = (type: "increment" | "decrement") => ({
            data: {
                username: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
                products: [
                    ...cart.products.map((product: any) => product.documentId),
                    product?.data.data.documentId,
                ],
                quantities: {
                    ...cart.quantities,
                    [product?.data.data?.documentId]:
                        type === "increment"
                            ? cart.quantities[product?.data.data?.documentId] +
                                  1 || 1
                            : cart.quantities[product?.data.data?.documentId] -
                                  1 || 0,
                },
            },
        })
        cart.id
            ? updateCart(editCart("increment"), {
                  onSuccess: (_: any, res: any) => {
                      setCart({
                          id: cart.id,
                          products:
                              cart.quantities[product?.data.data?.documentId] >
                              0
                                  ? cart.products
                                  : [...cart.products, product?.data.data],
                          quantities: {
                              ...cart.quantities,
                              [product?.data.data?.documentId]:
                                  cart.quantities?.[
                                      product?.data.data?.documentId
                                  ] + 1 || 1,
                          },
                      })
                  },
              })
            : mutate(addCart, {
                  onSuccess: (_: any, res: any) => {
                      refetch()
                  },
              })
    }

    const handleDecrement = () => {
        const data = {
            data: {
                username: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
                products: [product?.data.data?.id],
            },
        }
        mutateAsync(data)
    }
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
                        <p className="">{product?.data.data.title}</p>
                    </div>
                </div>
            </div>
            {product ? (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:flex-row flex-col-reverse text-center lg:text-left items-center container mx-auto lg:gap-20 gap-12 xl:px-24 lg:px-16 md:px-8 px-6 mt-9">
                        <div className=" col-span-1">
                            <div className="bg-f9f rounded-[10px] overflow-hidden h-fit max-h-[500px]  ">
                                <Image
                                    src={product?.data.data?.image?.url}
                                    alt={product?.data.data.title}
                                    width={423}
                                    height={500}
                                    className="object-fill size-full"
                                />
                            </div>
                        </div>
                        <div className="lg:max-w-[50%]l col-span-1">
                            <h2 className="lg:text-[42px] text-4xl ">
                                {product?.data.data.title}
                            </h2>
                            <p className="text-[#9F9F9F] lg:text-2xl text-xl font-medium mb-4">
                                <span className="font-normal">Price: </span>${" "}
                                {product?.data.data.price}
                            </p>
                            <p className="sm:max-w-[80%] lg:mx-0 mx-auto">
                                Setting the bar as one of the loudest speakers
                                in its class, the Kilburn is a compact,
                                stout-hearted hero with a well-balanced audio
                                which boasts a clear midrange and extended highs
                                for a sound.
                            </p>
                            <div className="flex flex-wrap justify-center lg:gap-5 gap-3 mt-8">
                                <div className="border border-primary-main rounded-[10px] flex items-center gap-4 px-4 w-fit lg:text-xl text-lg text-primary-main">
                                    <p
                                        onClick={handleDecrement}
                                        className="lg:p-5 p-3 cursor-pointer hover:scale-150 transition-all "
                                    >
                                        -
                                    </p>
                                    {cart.quantities[
                                        product?.data.data.documentId
                                    ] || 0}
                                    <p
                                        onClick={handleIncrement}
                                        className="lg:p-5 p-3 cursor-pointer hover:scale-150 transition-all "
                                    >
                                        +
                                    </p>
                                </div>
                                <div className="flex lg:gap-5 gap-3">
                                    <button className="inline-block rounded-[10px] border border-current lg:px-8 px-4 py-3 font-medium text-primary-main lg:text-xl text-lg transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-primary-main">
                                        Download
                                    </button>
                                    <button className="inline-block rounded-[10px] border border-current lg:px-8 px-4 py-3 font-medium text-primary-main lg:text-xl text-lg transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-primary-main">
                                        + Compare
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:px-24 sm:px-16 px-8 pt-12 mt-14 border-y pb-9 text-center lg:text-left">
                        <h3 className="font-medium text-2xl text-center">
                            Description
                        </h3>
                        <p className="mt-9 text-[#9f9f9f] ">
                            Weighing in under 7 pounds, the Kilburn is a
                            lightweight piece of vintage styled engineering.
                            Setting the bar as one of the loudest speakers in
                            its class, the Kilburn is a compact, stout-hearted
                            hero with a well-balanced audio which boasts a clear
                            midrange and extended highs for a sound that is both
                            articulate and pronounced. The analogue knobs allow
                            you to fine tune the controls to your personal
                            preferences while the guitar-influenced leather
                            strap enables easy and stylish travel.
                        </p>
                    </div>
                </>
            ) : (
                <Skeleton />
            )}
            {/* <div className="py-14">
                <RelatedProducts />
            </div> */}
        </div>
    )
}

export default ProductDetails
