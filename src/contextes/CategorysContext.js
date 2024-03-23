import { createContext } from "react";

const CategorysContext = createContext({
    category : "",
    changeCategory : (categoryName) => {}
})

export default CategorysContext;