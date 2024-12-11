import React from "react"

const Skeleton = () => {
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:flex-row flex-col-reverse text-center lg:text-left items-center container mx-auto lg:gap-20 gap-12 xl:px-24 lg:px-16 md:px-8 px-6 mt-9">
                <div className=" col-span-1">
                    <div className="bg-f9f rounded-[10px] overflow-hidden h-fit max-h-[500px]  ">
                        <div className="w-full h-[301px] bg-slate-200 animate-pulse "></div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="h-5 w-96 bg-slate-200 animate-pulse"></div>
                    <div className="h-5 w-12 bg-slate-200 animate-pulse mb-4 mt-4"></div>
                    <div className="h-5 w-96 bg-slate-200 animate-pulse sm:max-w-[80%] lg:mx-0 mx-auto"></div>
                    <div className="h-5 w-96 bg-slate-200 animate-pulse sm:max-w-[80%] lg:mx-0 mx-auto mt-2"></div>
                </div>
            </div>
            <div className="lg:px-24 sm:px-16 px-8 pt-12 mt-14 border-y pb-9 text-center lg:text-left">
                <h3 className="font-medium text-2xl text-center">
                    Description
                </h3>
                <div className="h-5 w-full bg-slate-200 animate-pulse mt-9"></div>
                <div className="h-5 w-full bg-slate-200 animate-pulse mt-2"></div>
                <div className="h-5 w-full bg-slate-200 animate-pulse mt-2"></div>
            </div>
        </div>
    )
}

export default Skeleton
