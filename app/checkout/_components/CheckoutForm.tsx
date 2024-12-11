"use client"
import { Product } from "@/app/_components/Products"
import { CartContext } from "@/app/_context/cartContext"
import { useDeleteData, usePostData } from "@/utils/useQueries"
import { useUser } from "@clerk/nextjs"
import { PaymentElement } from "@stripe/react-stripe-js"
import { useStripe, useElements } from "@stripe/react-stripe-js"
import { FormEvent, useContext, useState } from "react"

const CheckoutForm = ({
    buyButtonRef,
    amount,
}: {
    buyButtonRef: React.RefObject<HTMLButtonElement>
    amount: Number
}) => {
    const stripe = useStripe()
    const elements = useElements()
    const { cart, setCart } = useContext(CartContext)
    const { user } = useUser()
    const [errorMessage, setErrorMessage] = useState()
    const [loading, setLoading] = useState(false)
    const { mutate } = usePostData("/orders")
    const { mutate: deleteCart } = useDeleteData()
    const handleError = (error: any) => {
        setLoading(false)
        setErrorMessage(error.message)
    }
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }
        createOrder()
        const { error: submitError } = await elements.submit()
        if (submitError) {
            handleError(submitError)
            return
        }
        const res = await fetch("/api/create-intent", {
            method: "POST",
            body: JSON.stringify({
                amount: amount,
            }),
        })
        const clientSecret = await res.json()
        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            clientSecret: clientSecret,
            confirmParams: {
                return_url: "http://localhost:3000/payment-confirm",
            },
        })

        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message)
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    }

    const createOrder = () => {
        const data = {
            data: {
                email: user?.primaryEmailAddress?.emailAddress,
                username: user?.fullName,
                amount,
                products: cart.products.map(
                    (product: Product) => product.documentId
                ),
                quantities: cart.quantities,
            },
        }
        mutate(data, {
            onSuccess: () => {
                deleteCart(`/carts/${cart.id}`, {
                    onSuccess: () => {
                        setCart({
                            id: "",
                            products: [],
                            quantities: {},
                        })
                    },
                })
            },
        })
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <PaymentElement />
            <button ref={buyButtonRef} type="submit" className="hidden">
                submit
            </button>
        </form>
    )
}

export default CheckoutForm
