"use client"

import { useContext } from "react"
import { AlertContext } from "../_context/alertContext"

export interface AlertProps {
    title: string
    text: string
    onClick?: () => void
    open: boolean
    alertType: "Check" | "Confirmation"
    status?: boolean
}
export interface AlertContextType {
    alert: AlertProps
    setAlert: React.Dispatch<React.SetStateAction<AlertProps>>
}
const Alert = () => {
    const alertContext = useContext(AlertContext)

    return (
        alertContext?.alert.open && (
            <div className="fixed w-[100dvw] h-[100dvh] top-0 left-0 bg-black/20 z-20">
                {alertContext?.alert.alertType === "Confirmation" ? (
                    <div className="rounded-lg bg-white p-8 shadow-2xl absolute inset-0 w-fit h-fit -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-30 ">
                        <h2 className="text-lg font-bold">
                            {alertContext?.alert.title}
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            {alertContext?.alert.text}
                        </p>

                        <div className="mt-4 flex gap-2">
                            <button
                                type="button"
                                className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
                                onClick={alertContext?.alert.onClick}
                            >
                                Yes, I'm sure
                            </button>

                            <button
                                type="button"
                                className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
                                onClick={() =>
                                    alertContext?.setAlert({
                                        ...alertContext?.alert,
                                        open: false,
                                    })
                                }
                            >
                                No, go back
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        role="alert"
                        className="rounded-xl border border-gray-100 bg-white p-4 absolute inset-0 w-fit h-fit -translate-x-1/2 -translate-y-1/2 top-1/3 left-1/2 z-30 "
                    >
                        <div className="flex items-start gap-4">
                            <span
                                className={`${
                                    alertContext.alert.status
                                        ? "text-green-600"
                                        : "text-red-800"
                                } `}
                            >
                                {alertContext.alert.status ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-5 "
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </span>

                            <div className="flex-1">
                                <strong
                                    className={`${
                                        alertContext.alert.status
                                            ? "text-gray-900"
                                            : "text-red-800"
                                    } block font-medium `}
                                >
                                    {alertContext?.alert.title}
                                </strong>

                                <p className="mt-1 text-sm text-gray-700">
                                    {alertContext?.alert.text}
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    alertContext?.setAlert({
                                        ...alertContext?.alert,
                                        open: false,
                                    })
                                }
                                className="text-gray-500 transition hover:text-gray-600"
                            >
                                <span className="sr-only">Dismiss popup</span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    )
}

export default Alert
