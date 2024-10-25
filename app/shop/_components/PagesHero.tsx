import React from "react"
import { FaChevronRight } from "react-icons/fa"
interface Props {
    title: string
    route: string
}
const PagesHero = ({ title, route }: Props) => {
    return (
        <div className="relative">
            <div className="bg-[url(https://res.cloudinary.com/dthieqyqq/image/upload/v1729250412/shop_Hero_3f64d5205a.jpg)] bg-cover bg-center bg-no-repeat h-80 w-full blur-[6px] opacity-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h2 className="text-5xl/normal font-medium ">{title}</h2>
                <div className="flex items-center gap-1.5">
                    <a href="/" className="font-medium">
                        Home
                    </a>
                    <FaChevronRight />
                    <p className="">{route}</p>
                </div>
            </div>
        </div>
    )
}

export default PagesHero
