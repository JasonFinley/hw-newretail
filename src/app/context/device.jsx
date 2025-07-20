'use client'

import { createContext, useContext, useState } from "react";

const DeviceContext = createContext({
    device: "table",
    setDevice: null,
});

export const useDeviceContext = () => { return useContext( DeviceContext ) }

const ContextDevice = ({ children }) => {

    const [ device, setDevice ] = useState("table");

    return (
    <DeviceContext.Provider value={{
        device: device,
        setDevice: ( dev ) => setDevice( dev )
    }}>
        { children }
    </DeviceContext.Provider>
    )
}

export default ContextDevice;