import Image from "next/image"
import Link from "next/link"
import React from "react"

const PaymentConfirm = () => {
    return (
        <div className="flex flex-col items-center justify-center px-5 mt-4 py-24 ">
            <img
                src="https://res.cloudinary.com/dthieqyqq/image/upload/v1733331587/verified_cf8399c0db.gif"
                alt="check"
                className="w-32 h-32"
            />
            <h2 className="text-2xl">Payment Successfull!</h2>
            <h2 className="text-center mt-6 text-gray-500">
                We sent and email with you order confirmation along with Digital
                Content
            </h2>
            <Link
                href="/"
                // className="p-2 mt-6 text-white rounded-md bg-primary-main"
                className="block w-fit mt-10 mx-auto rounded-[15px] bg-primary-main px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none "
            >
                Go to Home
            </Link>
        </div>
    )
}

export default PaymentConfirm
