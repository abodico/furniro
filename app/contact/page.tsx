import React from "react"
import PagesHero from "../shop/_components/PagesHero"
import Features from "../shop/_components/Features"
import ContactForm from "./_components/ContactForm"
import ContactComponent from "./_components/ContactComponent"

const Contact = () => {
    return (
        <div>
            <PagesHero title="Contact" route="Contact" />
            <ContactComponent />
            <Features />
        </div>
    )
}

export default Contact
