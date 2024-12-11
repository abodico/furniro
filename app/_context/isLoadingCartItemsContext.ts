import { createContext } from "react"

export interface LoadingContextType {
    isLoadingCartItems: boolean
    setIsLoadingCartItems: React.Dispatch<React.SetStateAction<boolean>>
}

export const IsLoadingCartItemsContext = createContext<LoadingContextType>({
    isLoadingCartItems: true,
    setIsLoadingCartItems: () => undefined,
})
