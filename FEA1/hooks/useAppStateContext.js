import { useContext } from "react"
import { AppStateContext } from "../context/AppStateProvider"

export const useAppStatContext = () => {
  return useContext(AppStateContext)
}