"use client"
import Features from "../../shop/_components/Features"
import PagesHero from "../../shop/_components/PagesHero"
import ComparisonTable from "../_components/ComparisonTable"

const Copmarison = ({ params }: any) => {
    return (
        <div>
            <PagesHero title="Product Comparison" route="Comparison" />
            <ComparisonTable id={params.id} />
            <Features />
        </div>
    )
}

export default Copmarison
