"use client"
import CircularProgress from "@/app/_components/CircularProgress"
import { Product } from "@/app/_components/Products"
import { AlertContext } from "@/app/_context/alertContext"
import { CartContext } from "@/app/_context/cartContext"
import { IsLoadingCartItemsContext } from "@/app/_context/isLoadingCartItemsContext"
import { useUpdateData } from "@/utils/useQueries"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext } from "react"

const CartTable = () => {
    const { user, isLoaded } = useUser()
    const router = useRouter()
    const { cart, setCart } = useContext(CartContext)
    const alertContext = useContext(AlertContext)
    const { isLoadingCartItems } = useContext(IsLoadingCartItemsContext)
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

    const handleQuantityChange = (e: string, documentId: string) => {
        const changeItemQuantities = {
            data: {
                username: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
                products: cart.products.map(
                    (product: Product) => product.documentId
                ),
                quantities: {
                    ...cart.quantities,
                    [documentId]: +e,
                },
            },
        }

        updateCart(changeItemQuantities, {
            onSuccess: (_: any, res: any) => {
                setCart({
                    ...cart,
                    products: cart.products,
                    quantities: {
                        ...cart.quantities,
                        [documentId]: +e,
                    },
                })
            },
        })
    }

    const getTotalPrice: () => number = () =>
        cart.products.reduce((subtotal: number, product: Product) => {
            const quantity = cart.quantities[product.documentId] || 1
            return subtotal + product.price * quantity
        }, 0)

    if (isLoadingCartItems || !isLoaded) {
        return <CircularProgress />
    }
    return (
        <div className="container mx-auto rounded-lg px-2 my-[72px] flex lg:items-start items-center lg:flex-row flex-col gap-7">
            <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right bg-f9f">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Product
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Price
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Quantity
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Subtotal
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {cart.products.map((product: Product) => (
                        <tr className="text-center">
                            <td className="whitespace-nowrap sm:px-4 sm:py-2 font-medium text-primary-main sm:text-lg text-base flex items-center gap-8 h-full">
                                <Link
                                    href={
                                        "/product-details/" + product.documentId
                                    }
                                >
                                    <Image
                                        src={product.image.url}
                                        alt={product.title}
                                        width={105}
                                        height={105}
                                        className="size-[105px] rounded-lg hover:shadow-md transition-shadow duration-200 sm:block hidden"
                                    />
                                </Link>
                                <Link
                                    href={
                                        "/product-details/" + product.documentId
                                    }
                                    className="py-6 sm:px-2 line-clamp-1"
                                >
                                    {product.title}
                                </Link>
                            </td>
                            <td className="whitespace-nowrap sm:px-4 sm:py-2 text-gray-700 ">
                                $ {product.price}
                            </td>
                            <td className="whitespace-nowrap sm:px-4 sm:py-2 text-gray-700 ">
                                <input
                                    value={cart.quantities[product.documentId]}
                                    onChange={(e) =>
                                        handleQuantityChange(
                                            e.target.value,
                                            product.documentId
                                        )
                                    }
                                    className="mx-auto w-8 text-center h-8 border rounded-lg "
                                />
                            </td>
                            <td className="whitespace-nowrap sm:px-4 sm:py-2 text-gray-700">
                                $
                                {cart.quantities[product.documentId] *
                                    product.price}
                            </td>
                            <td className="whitespace-nowrap sm:px-4 sm:py-2 text-gray-700">
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Cart Total */}
            <div className="bg-f9f px-18 pt-3 pb-20 min-w-fit lg:w-auto sm:w-[60%] lg:mt-0 mt-8">
                <h2 className="text-center font-bold text-3xl ">Cart Totals</h2>
                <div className=" flex items-center justify-evenly mt-14 gap-14">
                    <p className="">Subtotal</p>
                    <p
                        className="text-gray-400
                     text-base "
                    >
                        $
                        {cart.products.reduce(
                            (subtotal: number, product: Product) => {
                                const quantity =
                                    cart.quantities[product.documentId] || 0
                                return subtotal + product.price * quantity
                            },
                            0
                        )}
                    </p>
                </div>
                <div className="flex items-center justify-evenly mt-6 gap-14">
                    <p className="">Total</p>
                    <p className="text-primary-main text-xl font-semibold ">
                        $
                        {cart.products.reduce(
                            (subtotal: number, product: Product) => {
                                const quantity =
                                    cart.quantities[product.documentId] || 0
                                return subtotal + product.price * quantity
                            },
                            0
                        )}
                    </p>
                </div>
                <button
                    onClick={() =>
                        router.push(`/checkout?amount=${getTotalPrice()}`)
                    }
                    className="block w-fit mt-10 mx-auto rounded-[15px] border border-current px-8 py-3 text-sm font-medium text-black transition hover:scale-110 hover:shadow-xl focus:outline-none "
                >
                    Check Out
                </button>
            </div>
        </div>
    )
}

export default CartTable
