import React from "react"
import PagesHero from "./_components/PagesHero"
import ProductsList from "./_components/ProductsList"
import CircularProgress from "../_components/CircularProgress"
import Features from "./_components/Features"

const Shop = () => {
    return (
        <div>
            <PagesHero title="Shop" route="Shop" />
            <ProductsList />
            <Features />
        </div>
    )
}

export default Shop
