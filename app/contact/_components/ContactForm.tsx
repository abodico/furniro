"use client"
import { AlertContext } from "@/app/_context/alertContext"
import { usePostData } from "@/utils/useQueries"
import React, { ChangeEvent, FormEvent, useContext, useState } from "react"

interface Form {
    name: string
    email: string
    subject: string
    message: string
}
const ContactForm = () => {
    const { mutate } = usePostData("/contacts")
    const alertContext = useContext(AlertContext)
    const [form, setForm] = useState<Form>({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate(
            { data: form },
            {
                onSuccess: (_: any, res: any) => {
                    alertContext?.setAlert({
                        alertType: "Check",
                        title: "Done",
                        text: "Form submitted successfully, thank you for your time.",
                        open: true,
                        status: true,
                    })
                    setForm({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                    })
                },
            }
        )
    }
    return (
        <div className="lg:w-[576px] md:w-[450px] w-full px-14 pb-16">
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="mb-2 font-medium block" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="w-full rounded-lg border-gray-200 border p-3 text-sm mb-3"
                        placeholder="Abc"
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="mb-2 font-medium block" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full rounded-lg border-gray-200 border p-3 text-sm mb-3"
                        placeholder="Abc@def.com"
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="mb-2 font-medium block" htmlFor="subject">
                        Subject
                    </label>
                    <input
                        className="w-full rounded-lg border-gray-200 border p-3 text-sm mb-3"
                        placeholder="This is Optional"
                        type="text"
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="mb-2 font-medium block" htmlFor="message">
                        Message
                    </label>

                    <textarea
                        className="w-full rounded-lg border-gray-200 border p-3 text-sm mb-12"
                        placeholder="Message"
                        rows={8}
                        id="message"
                        name="message"
                        required
                        minLength={4}
                        maxLength={250}
                        value={form.message}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button
                    className="inline-block bg-primary-main px-20 py-3 !mt-0 text-base font-bold text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:bg-primary-dark rounded"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default ContactForm
