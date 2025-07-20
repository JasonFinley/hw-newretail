'use client'

import { useMemo, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { useInView } from "react-intersection-observer";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

const TRRenderIfVisible = ({ item, index }) => {
    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: false,
    });

    return (
        <Tr ref={ ref } 
            height={"40px"}
        >
            {inView ? (
                <>
                    <Td fontSize={"xl"}>{ item.name }</Td>
                    <Td fontSize={"xl"}>{ item.category }</Td>
                    <Td fontSize={"xl"} isNumeric>{ item.price }</Td>
                    <Td fontSize={"xl"} textAlign={"center"}>{ item.inStock ? "有" : "無" }</Td>
                </>
            ) : (
                <>
                    <Td colSpan={4}/>
                </>
            )

            }
            
        </Tr>
    );
};

const TableList = ({ datas }) => {

    const keyCounter = new Map();
    const [priceSortCount, setPriceSortCount] = useState(0);

    const tableList = useMemo( () => {

        if( priceSortCount % 3 === 1 ){

            return [...datas].sort( (a, b) => a.price - b.price );

        }else if( priceSortCount % 3 === 2 ){

            return [...datas].sort( (a, b) => b.price - a.price );
            
        }

        return datas;

    }, [ datas, priceSortCount ] );

    const handleSortPrice = () => {
        setPriceSortCount( priceSortCount + 1 );
    }
    
    return (
        <>
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                <Tr>
                    <Th fontSize={"2xl"}>商品名稱</Th>
                    <Th fontSize={"2xl"}>類別</Th>
                    <Th
                        fontSize={"2xl"}
                        isNumeric
                        onClick={ handleSortPrice }
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "end"
                            }}
                        >
                            <div>價格</div>
                            <div>
                                <div>
                                    <ChevronUpIcon 
                                        color={ priceSortCount%3 == 1 ? "white": "black" }
                                        fontSize={"lg"}
                                    />
                                </div>
                                <div>
                                    <ChevronDownIcon
                                        color={ priceSortCount%3 == 2 ? "white": "black" }
                                        fontSize={"lg"}
                                    />
                                </div>
                            </div>
                        </div>
                    </Th>
                    <Th fontSize={"2xl"} textAlign={"center"}>有庫存</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {
                        tableList.map( ( item, index ) => {

                            const count = keyCounter.get( item.name ) || 0 ;
                            const key = `${item.name}-${count}`;
                            keyCounter.set( item.name, count + 1 );
                            return ( 
                                <TRRenderIfVisible 
                                    key={key} 
                                    item={ item } 
                                    index={index}
                                />
                            )
                        } )
                    }
                </Tbody>
            </Table>
        </TableContainer>
        </>
    )
}

export default TableList;