import React from "react"

const imgs = [
    {
        img: "bg-[url(https://res.cloudinary.com/dthieqyqq/image/upload/v1728749779/dining_8a9d57764e.png)]",
        title: "Dining",
    },
    {
        img: "bg-[url(https://res.cloudinary.com/dthieqyqq/image/upload/v1728749781/living_941457f7f1.png)]",
        title: "Living",
    },
    {
        img: "bg-[url(https://res.cloudinary.com/dthieqyqq/image/upload/v1728749780/hero_863c121748.png)]",
        title: "Bedroom",
    },
]
const BrowseTheRange = () => {
    return (
        <section className="">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="mx-auto max-w-lg text-center">
                    <h2 className="text-3xl font-bold sm:text-4xl">
                        Browse The Range
                    </h2>

                    <p className="mt-4 text-[#666]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>

                <div className="mt-8 grid grid-cols-1 lg:gap-5 gap-2 lg:grid-cols-3 place-items-center">
                    {imgs.map((img) => (
                        <div className="block rounded-xl w-full">
                            <div
                                className={`${img.img} bg-contain bg-center bg-no-repeat h-[480px] rounded-xl w-full`}
                            ></div>

                            <p className="text-center mt-8 font-semibold lg:text-2xl text-lg">
                                {img.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BrowseTheRange
