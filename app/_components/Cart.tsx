import React, { useContext } from "react"
import { CartContext } from "../_context/cartContext"
import { Product } from "./Products"
import { AlertContext } from "../_context/alertContext"
import { useUser } from "@clerk/nextjs"
import { useUpdateData } from "@/utils/useQueries"
import { useRouter } from "next/navigation"

const Cart = ({ toggleCart }: { toggleCart: () => void }) => {
    const { user } = useUser()
    const router = useRouter()
    const { cart, setCart } = useContext(CartContext)
    const alertContext = useContext(AlertContext)
    const { mutate: updateCart } = useUpdateData(`/carts/${cart?.id ?? ":id"}`)

    const removeItem = (documentId: string) => {
        const removeCartItem = {
            data: {
                username: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
                products: [
                    ...cart.products
                        .filter(
                            (product: any) => product.documentId !== documentId
                        )
                        .map((product: Product) => product.documentId),
                ],
                quantities: {
                    ...cart.quantities,
                    [documentId]: 0,
                },
            },
        }

        updateCart(removeCartItem, {
            onSuccess: (_: any, res: any) => {
                setCart({
                    ...cart,
                    products: cart.products.filter(
                        (product: any) => product.documentId !== documentId
                    ),
                    quantities: {
                        ...cart.quantities,
                        [documentId]: 0,
                    },
                })

                alertContext?.setAlert({ ...alertContext?.alert, open: false })
            },
        })
    }

    const getTotalPrice: () => number = () =>
        cart.products.reduce((subtotal: number, product: Product) => {
            const quantity = cart.quantities[product.documentId] || 1
            return subtotal + product.price * quantity
        }, 0)
    return (
        <div
            className="relative w-screen max-w-sm border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8 "
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
        >
            <h3 className="font-semibold text-2xl ">Shopping Cart</h3>
            <button
                onClick={toggleCart}
                className="absolute end-4 top-4 text-gray-600 transition hover:scale-110"
            >
                <span className="sr-only">Close cart</span>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            <div className="mt-4 space-y-6 pt-10 border-t-2 ">
                <ul className="space-y-4 max-h-[50vh] overflow-auto">
                    {cart.products.map((product: Product) => (
                        <li
                            key={product.documentId}
                            className="flex items-center gap-4"
                        >
                            <img
                                src={product.image.url}
                                alt={product.title}
                                className="size-[105px] rounded object-cover"
                            />

                            <div>
                                <h3 className="text-sm text-gray-900">
                                    {product.title}
                                </h3>

                                <div className="flex items-center gap-4 mt-0.5 space-y-px text-sm text-gray-600">
                                    <span className="block text-black text-base ">
                                        {cart.quantities[product.documentId]}
                                    </span>
                                    <span className="block">X</span>
                                    <span className="block text-primary-main">
                                        ${product.price}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-1 items-center justify-end gap-2">
                                <button
                                    onClick={() =>
                                        alertContext?.setAlert({
                                            ...alertContext?.alert,
                                            open: true,
                                            onClick: () =>
                                                removeItem(product.documentId),
                                        })
                                    }
                                    className="text-gray-600 transition hover:text-red-600"
                                >
                                    <span className="sr-only">Remove item</span>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="space-y-4 text-center">
                    <div className="border-t flex items-center justify-evenly mt-2">
                        <p className="">Subtotal</p>
                        <p className="text-primary-main text-lg font-bold">
                            ${getTotalPrice()}
                        </p>
                    </div>
                    <a
                        href="/cart"
                        className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
                        onClick={toggleCart}
                    >
                        View my cart (
                        {Number(
                            Object.values(cart.quantities).reduce(
                                (accumulator: number, currentValue) =>
                                    accumulator + Number(currentValue),
                                0
                            )
                        )}
                        )
                    </a>

                    <button
                        onClick={() => {
                            router.push(`/checkout?amount=${getTotalPrice()}`)
                            toggleCart()
                        }}
                        className="block w-full rounded bg-primary-main px-5 py-3 text-sm text-gray-100 transition hover:bg-primary-dark"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart
