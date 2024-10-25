import React from "react"
import { GiTrophyCup } from "react-icons/gi"
import { LiaShippingFastSolid } from "react-icons/lia"
import { PiSealCheck } from "react-icons/pi"
import { RiCustomerService2Fill } from "react-icons/ri"

interface Feature {
    icon: React.ReactNode
    title: string
    description: string
}
const features = [
    {
        icon: <GiTrophyCup className="size-[60px] mx-auto sm:mx-0" />,
        title: "High Quality",
        description: "crafted from top materials",
    },
    {
        icon: <PiSealCheck className="size-[60px] mx-auto sm:mx-0" />,
        title: "Warranty Protection",
        description: "Over 2 years",
    },
    {
        icon: <LiaShippingFastSolid className="size-[60px] mx-auto sm:mx-0" />,
        title: "Free Shipping",
        description: "Order over 150 $",
    },
    {
        icon: (
            <RiCustomerService2Fill className="size-[60px] mx-auto sm:mx-0" />
        ),
        title: "24 / 7 Support",
        description: "Dedicated support",
    },
]
const Feature = ({ icon, title, description }: Feature) => {
    return (
        <div className="flex sm:flex-row flex-col sm:text-left text-center lg:justify-center sm:justify-start justify-center gap-2.5">
            {/* icon */}
            {icon}
            <div className="">
                <h4 className="text-2xl font-semibold">{title}</h4>
                <p className="text-xl font-medium text-[#898989]">
                    {description}
                </p>
            </div>
        </div>
    )
}
const Features = () => {
    return (
        <div className="bg-f9f">
            <div className="container mx-auto py-24 md:px-14 px-8 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-y-6">
                {features.map((feature) => (
                    <Feature
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                    />
                ))}
            </div>
        </div>
    )
}

export default Features
