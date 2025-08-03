'use client'

import { useState } from "react"
import InfiniteCards from "./infiniteCards";
import VirtualCards from "./virtualCards";

const CardsGrid = ( { datas, mode = "virtual" } ) => {

    return (
        <>
            { mode === "Infinite" ? (
                <InfiniteCards datas={datas}/>
            ) : (
                <VirtualCards datas={datas}/>
            )
            }
        </>
    )
}

export default CardsGrid