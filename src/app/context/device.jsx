'use client'

import { createContext, useContext, useState } from "react";

const DeviceContext = createContext({
    device: "mobile",
    setDevice: null,
});

export const useDeviceContext = () => { return useContext( DeviceContext ) }

const ContextDevice = ({ children }) => {

    const [ device, setDevice ] = useState("mobile");

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