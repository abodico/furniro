"use client"
import CircularProgress from "@/app/_components/CircularProgress"
import ProductCard from "@/app/_components/ProductCard"
import { Product } from "@/app/_components/Products"
import { useGetData } from "@/utils/useQueries"
import React, { useEffect, useState } from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"

const sortOptions = ["Title, DESC", "Title, ASC", "Price, DESC", "Price, ASC"]
const filterOptions = ["Has Discount", "New", "Price"]

interface Filter {
    type: string
    from: number
    to: number
}

const ProductsList = () => {
    const [sort, setSort] = useState<string>("")
    const [filter, setFilter] = useState<Filter>({
        type: "",
        from: 0,
        to: 0,
    })
    const [page, setPage] = useState(1)

    const { refetch, data, isLoading, isFetching } = useGetData(
        `/products?` +
            `sort=` +
            `${sort.toLocaleLowerCase().replace(", ", ":")}&` +
            `${
                filter.type === "Price"
                    ? `filters[price][$between]=${filter.from}&filters[price][$between]=${filter.to}&`
                    : filter.type === "New" || filter.type === "Has Discount"
                    ? `filters[${
                          filter.type[0]?.toLocaleLowerCase() +
                          filter.type?.slice(1).replace(" ", "")
                      }]=true&`
                    : ""
            }` +
            `pagination[page]=${page}&pagination[pageSize]=16&` +
            `populate=*`
    )

    useEffect(() => {
        const handler = setTimeout(() => {
            refetch()
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [filter, sort])
    const handleFilterChange = (value: string) => {
        setFilter({
            type: value,
            from: 0,
            to: 1000,
        })
    }

    useEffect(() => {
        refetch()
    }, [page])

    const handlePriceNumberChange = (
        limitType: "from" | "to",
        value: number
    ) => {
        setFilter((prev) => ({
            ...prev,
            [limitType]: value,
        }))
    }

    const handleSortChange = (value: string) => {
        setSort(value)
    }

    const handlePageChange = (page: number) => {
        setPage(page)
    }

    return (
        <div className="">
            <div className="bg-f9f">
                <div className="container mx-auto py-5 flex justify-between items-center lg:px-24 ">
                    <div className="flex items-center justify-center gap-2">
                        <select
                            id="FilterBy"
                            className="h-10 rounded border-gray-300 text-sm"
                            onChange={(e) => handleFilterChange(e.target.value)}
                        >
                            <option hidden>Filter By</option>
                            <option value={""}>All</option>
                            {filterOptions.map((item) => (
                                <option value={item} key={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        {filter.type === "Price" && (
                            <div className="flex justify-between gap-2">
                                <label className="flex items-center gap-1">
                                    <span className="text-sm text-gray-600">
                                        $
                                    </span>

                                    <input
                                        type="number"
                                        id="FilterPriceFrom"
                                        placeholder="From"
                                        className="w-16 rounded-md border-gray-200 shadow-sm sm:text-sm"
                                        onChange={(e) =>
                                            handlePriceNumberChange(
                                                "from",
                                                +e.target.value
                                            )
                                        }
                                    />
                                </label>

                                <label className="flex items-center gap-1">
                                    <span className="text-sm text-gray-600">
                                        $
                                    </span>

                                    <input
                                        type="number"
                                        id="FilterPriceTo"
                                        placeholder="To"
                                        className="w-16 rounded-md border-gray-200 shadow-sm sm:text-sm"
                                        onChange={(e) =>
                                            handlePriceNumberChange(
                                                "to",
                                                +e.target.value
                                            )
                                        }
                                    />
                                </label>
                            </div>
                        )}

                        <p className="">
                            {(data?.data.meta.pagination.page - 1) *
                                data?.data.meta.pagination.pageSize +
                                1}
                            -
                            {data?.data.meta.pagination.page *
                                data?.data.meta.pagination.pageSize <
                            data?.data.meta.pagination.total
                                ? data?.data.meta.pagination.page *
                                  data?.data.meta.pagination.pageSize
                                : data?.data.meta.pagination.total}{" "}
                            of {data?.data.meta.pagination.total} results
                        </p>
                    </div>
                    <label htmlFor="SortBy" className="sr-only">
                        SortBy
                    </label>

                    <select
                        id="SortBy"
                        className="h-10 rounded border-gray-300 text-sm"
                        onChange={(e) => handleSortChange(e.target.value)}
                    >
                        <option hidden>Sort By</option>
                        {sortOptions.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {!isLoading ? (
                <>
                    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-16 xl:px-24 md:px-12 px-8">
                        {data?.data.data.map((product: Product) => (
                            <ProductCard
                                product={product}
                                key={product.documentId}
                            />
                        ))}
                    </ul>
                    <ol className="mt-8 flex justify-center gap-1 text-xl font-medium pb-16 pt-10">
                        <li
                            onClick={() =>
                                page > 1 && handlePageChange(page - 1)
                            }
                            className="inline-flex items-center justify-center rounded-[10px] cursor-pointer size-[60px] bg-f9f text-sm font-medium transition hover:scale-110 focus:outline-none active:bg-primary-main"
                        >
                            <BiChevronLeft />
                        </li>

                        {Array.from(
                            {
                                length: data?.data.meta.pagination.pageCount,
                            },
                            (_, index) => index + 1
                        ).map((item) => (
                            <li
                                key={item}
                                onClick={() => handlePageChange(item)}
                                className={`rounded-[10px] cursor-pointer size-[60px] flex items-center justify-center hover:bg-primary-main transition text-center leading-8 ${
                                    item === data.data.meta.pagination.page
                                        ? "bg-primary-main text-white "
                                        : "bg-f9f text-black "
                                }`}
                            >
                                {item}
                            </li>
                        ))}

                        <li
                            onClick={() =>
                                page < data?.data.meta.pagination.pageCount &&
                                handlePageChange(page + 1)
                            }
                            className="inline-flex items-center justify-center rounded-[10px] cursor-pointer size-[60px] bg-f9f text-sm font-medium transition hover:scale-110 focus:outline-none active:bg-primary-main"
                        >
                            <BiChevronRight />
                        </li>
                    </ol>
                </>
            ) : (
                <CircularProgress />
            )}
        </div>
    )
}

export default ProductsList
