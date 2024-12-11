import React from "react"
import PagesHero from "../shop/_components/PagesHero"
import Features from "../shop/_components/Features"
import CartTable from "./_components/CartTable"

const CartPage = () => {
    return (
        <div>
            <PagesHero title="Cart" route="Cart" />
            <CartTable />
            <Features />
        </div>
    )
}

export default CartPage
