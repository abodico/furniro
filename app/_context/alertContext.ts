import { createContext } from "react"
import { AlertContextType } from "../_components/Alert"

export const AlertContext = createContext<AlertContextType | null>(null)
