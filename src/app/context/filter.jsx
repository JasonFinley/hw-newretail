'use client'

import { createContext, useContext, useState } from "react";

const FilterContext = createContext({
    filter: {
        name: "",
        price: { min: 0, max: 999999 },
        category: [],
        inStock: "0",
        school: 0x00000fff,
        book: 0x0fffffff,
        type: 0x0fffffff
    },
    setFilter: null,
});

export const KnshFilterObj = {
    school7: { value: 0x0000000f, name: "7年級"},
    school8: { value: 0x000000f0, name: "8年級"},
    school9: { value: 0x00000f00, name: "9年級"},
    bookCN: { value: 0x0000000f, name: "國文"},
    bookEN: { value: 0x000000f0, name: "英文"},
    bookMA: { value: 0x00000f00, name: "數學"},
    bookNA: { value: 0x0000f000, name: "自然"},
    bookSO: { value: 0x000f0000, name: "社會"},
    bookMC: { value: 0x00f00000, name: "閩客語"},
    bookTC: { value: 0x0f000000, name: "科技"},
    typeSB: { value: 0x0000000f, name: "課本進度"},
    typeLI: { value: 0x000000f0, name: "素養主題"},
    typeTX: { value: 0x00000f00, name: "卓越盃"},
    typeCA: { value: 0x0000f000, name: "會考衝刺"},
    typeEX: { value: 0x000f0000, name: "段考複習"},
    typeAU: { value: 0x00f00000, name: "音檔"},
    typePR: { value: 0x0f000000, name: "國中先修"},
}

export const useFilterContext = () => { return useContext( FilterContext ) }

const ContextFilter = ({ children }) => {

    const [ filter, setFilter ] = useState({
        name: "",
        price: { min: 0, max: 999999 },
        category: [],
        inStock: "0",
        school: 0x00000fff,
        book: 0x0fffffff,
        type: 0x0fffffff
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