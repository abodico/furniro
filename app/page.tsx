import Image from "next/image"
import Hero from "./_components/Hero"
import BrowseTheRange from "./_components/BrowseTheRange"
import Products from "./_components/Products"
import Inspiration from "./_components/Inspiration"
import ShareSetup from "./_components/ShareSetup"

export default function Home() {
    return (
        <div className="">
            <Hero />
            <BrowseTheRange />
            <Products />
            <Inspiration />
            <ShareSetup />
        </div>
    )
}
