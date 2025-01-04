"use client"
import React, { useContext, useRef } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./_components/CheckoutForm"
import { CartContext } from "../_context/cartContext"
import { Product } from "../_components/Products"
import { IsLoadingCartItemsContext } from "../_context/isLoadingCartItemsContext"
import CircularProgress from "../_components/CircularProgress"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import Features from "../shop/_components/Features"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY!)

interface StripeOptions {
    mode: "payment" | "setup" | "subscription" | undefined
    currency: "usd"
    amount: number
}
const Checkout = () => {}
const Suspensed = () => {
    const searchParams = useSearchParams()
    const options: StripeOptions = {
        mode: "payment",
        currency: "usd",
        amount: +Number(searchParams.get("amount")) * 100,
    }
    const buyButtonRef = useRef<HTMLButtonElement>(null)
    const { cart } = useContext(CartContext)
    const { isLoadingCartItems } = useContext(IsLoadingCartItemsContext)

    return (
        <Suspense>
            <div className="container mx-auto px-2 flex gap-6 pt-24 pb-20">
                <div className="px-20 w-1/2">
                    <h2 className="font-semibold text-4xl mb-9">
                        Billing Details
                    </h2>
                    <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm
                            buyButtonRef={buyButtonRef}
                            amount={+Number(searchParams.get("amount"))}
                        />
                    </Elements>
                </div>
                {/* Cart Total */}
                <div className="bg-f9f pt-3 pb-20 w-1/2 lg:mt-0 mt-8 px-10">
                    <div className="flex items-center justify-between mt-14 gap-14 font-medium text-2xl">
                        <p>Product</p>
                        <p>Subtotal</p>
                    </div>
                    {isLoadingCartItems ? (
                        <CircularProgress />
                    ) : (
                        <>
                            {/* products-subtotal */}
                            {cart?.products?.map((product: Product) => (
                                <div
                                    key={product.documentId}
                                    className="flex items-center justify-between mt-6 gap-14 "
                                >
                                    <p className="text-gray-400">
                                        {product.title}{" "}
                                        <span className="text-black text-xs">
                                            x{" "}
                                            {
                                                cart.quantities[
                                                    product.documentId
                                                ]
                                            }
                                        </span>
                                    </p>
                                    <p
                                        className="text-gray-400
                     text-base "
                                    >
                                        $
                                        {cart.quantities[product.documentId] *
                                            product.price}
                                    </p>
                                </div>
                            ))}
                            {/* subtotal */}
                            <div className="flex items-center justify-between mt-6 gap-14 ">
                                <p className="">Subtotal</p>
                                <p
                                    className="text-gray-400
                     text-base "
                                >
                                    $
                                    {cart.products.reduce(
                                        (
                                            subtotal: number,
                                            product: Product
                                        ) => {
                                            const quantity =
                                                cart.quantities[
                                                    product.documentId
                                                ] || 0
                                            return (
                                                subtotal +
                                                product.price * quantity
                                            )
                                        },
                                        0
                                    )}
                                </p>
                            </div>
                            {/* total */}
                            <div className="flex items-center justify-between mt-6 gap-14">
                                <p className="">Total</p>
                                <p className="text-primary-main text-xl font-semibold ">
                                    $
                                    {cart.products.reduce(
                                        (
                                            subtotal: number,
                                            product: Product
                                        ) => {
                                            const quantity =
                                                cart.quantities[
                                                    product.documentId
                                                ] || 0
                                            return (
                                                subtotal +
                                                product.price * quantity
                                            )
                                        },
                                        0
                                    )}
                                </p>
                            </div>
                        </>
                    )}

                    <hr className="mt-8 border-gray-300" />
                    <p className="mt-5">
                        Your personal data will be used to support your
                        experience throughout this website, to manage access to
                        your account, and for other purposes described in our
                        privacy policy.
                    </p>
                    <button
                        className="block w-fit mt-10 mx-auto rounded-[15px] border border-current px-8 py-3 text-sm font-medium text-black transition hover:scale-110 hover:shadow-xl focus:outline-none "
                        onClick={() => buyButtonRef.current?.click()}
                    >
                        Place order
                    </button>
                </div>
            </div>
            <Features />
        </Suspense>
    )
}

export default Checkout
