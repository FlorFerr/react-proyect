import { createContext } from "react";

const FavContext = createContext({
    addItem: (item) => {},
    removeItem: (id) => {}
})

export default FavContext