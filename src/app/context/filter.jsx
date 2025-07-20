'use client'

import { createContext, useContext, useState } from "react";

const FilterContext = createContext({
    filter: {
        name: "",
        price: { min: 0, max: 999999 },
        category: [],
        inStock: "0",
    },
    setFilter: null,
});

export const useFilterContext = () => { return useContext( FilterContext ) }

const ContextFilter = ({ children }) => {

    const [ filter, setFilter ] = useState({
        name: "",
        price: { min: 0, max: 999999 },
        category: [],
        inStock: "0",
    });

    return (
    <FilterContext.Provider value={{
        filter: filter,
        setFilter: ( obj ) => setFilter( obj )
    }}>
        { children }
    </FilterContext.Provider>
    )
}

export default ContextFilter;