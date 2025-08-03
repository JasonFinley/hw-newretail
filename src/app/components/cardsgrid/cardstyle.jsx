'use client'

import { Text } from '@chakra-ui/react'
import { MdOutlineShoppingCart } from "react-icons/md";
import Image from 'next/image';

const CardTheme = ({ item, isPriority }) => {
    return (
        <div
            style={{ 
                height: "410px",
                width: "350px"
            }}
        >
            <Image
                width={350} 
                height={180} 
                src={ item.url } 
                alt={ item.name } 
                priority={ isPriority }
                style={{ width: "350px", height: "180px" }}
            />
            <div style={{
                width: "100%",
                height: "128px"
            }}>
                <div style={{display: "flex"}}>
                    <div
                        style={{
                            fontSize: "18px",
                            padding: "4px 8px",
                            borderWidth: "2px",
                            borderColor: "gray.500",
                            borderRadius: "4px"
                        }}
                    >{ item.tag }</div>
                </div>
                <h2
                    style={{
                        fontSize: "22px",
                    }}
                >
                    { item.name }
                </h2>
            </div>
            <div>
                <Text>價格:<span style={{ fontSize: "24px", color: "red", fontWeight: "700" }}>{item.price}</span></Text>
                <div
                    style={{
                        display: "flex",
                        width: "100%"
                    }}
                >
                    <button
                        style={{
                            fontWeight: "700",
                            fontSize: "20px",
                            color: "white",
                            borderRadius: "8px",
                            backgroundColor: "red",
                            width: "60%",
                            padding: "8px 16px"
                        }}
                    >立即購買</button>
                    <button
                        style={{
                            marginLeft: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "28px",
                            color: "red",
                            borderRadius: "8px",
                            borderStyle: "solid",
                            borderColor: "red",
                            borderWidth: "2px",
                            width: "72px",
                            padding: "8px 16px"
                        }}
                    >
                        <MdOutlineShoppingCart/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardTheme;