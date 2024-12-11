import React from "react"
import { FaLocationDot } from "react-icons/fa6"
import ContactForm from "./ContactForm"
import { FaClock, FaPhoneAlt } from "react-icons/fa"
interface InfoCard {
    icon: React.ReactNode
    title: string
    fText: string
    sText?: string
}
const InfoCard = ({ icon, title, fText, sText }: InfoCard) => (
    <div className="flex items-start gap-8 ">
        {icon}
        <div className="md:max-w-52 max-w-[247px] mt-3">
            <h3 className="font-medium text-2xl">{title}</h3>
            <p className="">{fText}</p>
            {sText && <p className="">{sText}</p>}
        </div>
    </div>
)

const ContactComponent = () => {
    return (
        <div className="pt-24">
            <h2 className="text-center text-4xl font-semibold">
                Get In Touch With Us
            </h2>
            <p className="text-gray-400 text-center lg:max-w-[50%] mx-auto mt-2">
                For More Information About Our Product & Services. Please Feel
                Free To Drop Us An Email. Our Staff Always Be There To Help You
                Out. Do Not Hesitate!
            </p>
            <div className="flex md:flex-row flex-col items-start justify-center lg:gap-8 gap-4 md:mt-32 mt-16">
                {/* contact info */}
                <div className="flex md:flex-col flex-row flex-wrap items-start justify-center gap-10 lg:px-11 px-4">
                    <InfoCard
                        icon={<FaLocationDot className="text-2xl" />}
                        title="Address"
                        fText="236 5th SE Avenue, New York NY10000, United States"
                    />
                    <InfoCard
                        icon={<FaPhoneAlt className="text-2xl" />}
                        title="Phone"
                        fText="Mobile: +(84) 546-6789"
                        sText="Hotline: +(84) 456-6789"
                    />
                    <InfoCard
                        icon={<FaClock className="text-2xl" />}
                        title="Working Time"
                        fText="Monday-Friday: 9:00 - 22:00"
                        sText="Saturday-Sunday: 9:00 - 21:00"
                    />
                </div>
                <ContactForm />
            </div>
        </div>
    )
}

export default ContactComponent
