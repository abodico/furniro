import ProductCard from "@/app/_components/ProductCard"
import { Product } from "@/app/_components/Products"
import { useGetData } from "@/utils/useQueries"
import React from "react"

const RelatedProducts = () => {
    const { data: products } = useGetData("/products?populate=*")

    return (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products &&
                products?.data?.data.map((product: Product) => (
                    <ProductCard product={product} key={product.documentId} />
                ))}
        </ul>
    )
}

export default RelatedProducts
