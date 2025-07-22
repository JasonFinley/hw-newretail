'use client'

import { useState } from "react"
import InfiniteCards from "./infiniteCards";
import VirtualCards from "./virtualCards";

const CardsList = ( { datas } ) => {

    const [ mode, setMode ] = useState( "virtual" );

    return (
        <>
            { mode === "Infinite" ? (
                <InfiniteCards datas={datas} setMode={ setMode }/>
            ) : (
                <VirtualCards datas={datas} setMode={ setMode }/>
            )
            }
        </>
    )
}

export default CardsList