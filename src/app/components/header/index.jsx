'use client'

import { useDeviceContext } from "@/app/context/device";
import "./header.css"
import { useEffect, useState } from "react"

const Header = () => {

    const { device, setDevice } = useDeviceContext();
    const [ curDevice, setCurDevice ] = useState( "table" );
    const devices = [
        "mobile",
        "table",
    ];

    useEffect( () => {
        setCurDevice( device );
    }, [ device ] );

    const handleOnDevice = () => {
        let idx = devices.findIndex( item => item === curDevice );
        idx = (idx + 1) % 2;
        setCurDevice( devices[ idx ] );
        setDevice( devices[ idx ] );
    }

    return (
        <div style={{
            display: "flex"
        }}>
            <h1 className="header">Homework</h1>
            <button
                style={{
                    width: "80px",
                    color: "white",
                    background: "gray",
                    fontSize: "20px"
                }}
                onClick={ handleOnDevice }
            >
                { curDevice === "mobile" ? devices[1] : devices[0] }
            </button>
        </div>
    )
}

export default Header;