'use client'

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  Button
} from '@chakra-ui/react'
import { ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import InputDebounce from "../inputDebounce";

const TRRenderIfVisible = ({ item, index }) => {

    return (
        <Tr
            height={"40px"}
        >
            <Td fontSize={"xl"}>{ item.name }</Td>
            <Td fontSize={"xl"}>{ item.category }</Td>
            <Td fontSize={"xl"} isNumeric>{ item.price }</Td>
            <Td fontSize={"xl"} textAlign={"center"}>{ item.inStock ? "有" : "無" }</Td>
        </Tr>
    );
};

const TableList = ({ datas }) => {

    const pageSize = 10;
    const keyCounter = new Map();
    const [ priceSortCount, setPriceSortCount ] = useState(0);

    const [ pageIndex, setPageIndex ] = useState(0);
    const [ gotoInput, setGotoInput ] = useState("1");

    const parseList = useMemo( () => {

        let baseDatas;
        if( priceSortCount % 3 === 1 ){
            baseDatas = [...datas].sort( (a, b) => a.price - b.price );
        }else if( priceSortCount % 3 === 2 ){
            baseDatas = [...datas].sort( (a, b) => b.price - a.price );
        }else{
            baseDatas = datas;
        }

        const totalPage = Math.ceil(baseDatas.length / pageSize);

        const start = pageIndex * pageSize;
        const curPageDatas = baseDatas.slice(start, start + pageSize);
        return {
            totalPage,
            curPageDatas
        }

    }, [ datas, priceSortCount, pageIndex ] );

    const handleSortPrice = () => {
        setPageIndex(0);
        setPriceSortCount( priceSortCount + 1 );
    }

    const handleOnChangeGotoPage = ( e ) => {

        const rawValue = e.target.value.trim();
        if (rawValue === '') {
            setGotoInput("");
            return;
        }

        const num = Number(rawValue);
        if (Number.isNaN(num)) return;

        const pageNum = Math.round(num);
        handleGotoNextPage( pageNum );
    }

    const handleGotoNextPage = ( pageNum ) => {
        const clamped = Math.min( Math.max( pageNum, 1 ), parseList.totalPage );
        setGotoInput( clamped.toString() );
        setPageIndex( clamped - 1 );
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
                        parseList.curPageDatas.map( ( item, index ) => {

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
            <Flex
                fontSize={"xl"}
                height={"44px"}
                alignItems={"center"}
                justifyContent={"space-around"}
            >
                <Button
                    fontSize={"3xl"}
                    disabled={ pageIndex <= 0 ? true : false }
                    onClick={ () => { handleGotoNextPage( pageIndex - 1 ) } }
                > <ChevronLeftIcon/> </Button>
                <Flex>
                    <input
                        type="number"
                        value={ gotoInput }
                        style={{
                            width: "72px",
                            borderWidth: "2px",
                            borderColor: "black",
                            marginRight: "4px"
                        }}
                        onChange={ handleOnChangeGotoPage }
                    />
                    { ` / ${parseList.totalPage}` }
                </Flex>
                <Button
                    fontSize={"3xl"}
                    disabled={ pageIndex >= parseList.totalPage ? true : false }
                    onClick={ () => { handleGotoNextPage( pageIndex + 1 ) } }
                > <ChevronRightIcon/> </Button>
            </Flex>
        </TableContainer>
        </>
    )
}

export default TableList;
