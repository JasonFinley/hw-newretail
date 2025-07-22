'use client'

import { useCallback, useMemo, useState } from "react"
import { useInView } from "react-intersection-observer";
import { Grid, GridItem } from '@chakra-ui/react'
import CardTheme from "./cardstyle";

const CardRenderIfVisible = ({ item, index }) => {
    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: false,
    });

    return (
        <div ref={ ref } 
            style={{ 
                height: "180px",
                width: "180px",
            }}
        >
            {inView ? (
                <>
                    <CardTheme item={item}/>
                </>
            ) : (
                <>
                </>
            )

            }
            
        </div>
    );
};

const VirtualCards = ( { datas, setMode } ) => {

    const keyCounter = new Map();
    const [priceSortCount, setPriceSortCount] = useState(0);

    const calculateOrder = useCallback( ( item, index ) => {

        let order = 0;
        if( priceSortCount % 3 == 1 ){
            order = (item.price * 1000 + index)
        }else if( priceSortCount % 3 == 2 ){
            order = (item.price * 1000 + index) * -1;
        }else{
            order = 0;
        }
        
        return order;

    }, [ priceSortCount ] );

    const listCards = datas;

    const handleSortPrice = () => {
        setPriceSortCount( priceSortCount + 1 );
    }

    const getSortName = ( index ) => {
        const names = [ "無", "低", "高" ];
        let idx = index % names.length;
        return names[ idx ];
    }

    return (
        <>
            <div>
                <button
                    style={{
                        margin: "4px",
                        padding: "8px 4px",
                        borderRadius: "8px",
                        borderWidth: "2px",
                        borderColor: "blue",
                        fontSize: "18px",
                        color: "black"
                    }}
                    onClick={ handleSortPrice }
                >{`依價格排序 : ${ getSortName( priceSortCount ) }`}</button>
                <button
                    style={{
                        width: "160px",
                        margin: "4px",
                        padding: "8px 4px",
                        borderRadius: "8px",
                        borderWidth: "2px",
                        borderColor: "blue",
                        fontSize: "18px",
                        color: "black"
                    }}
                    onClick={ () => { setMode("Infinite") } }
                >
                    { "USE Infinite List" }
                </button>
            </div>
            <Grid
                templateColumns='repeat(2, 1fr)' gap={2}
            >
                {
                    listCards.map( ( item, index ) => {
                        const count = keyCounter.get( item.name ) || 0 ;
                        const key = `${item.name}-${count}`;
                        keyCounter.set( item.name, count + 1 );
                        return (
                            <GridItem key={key} w='100%' order={ calculateOrder( item, index ) }>
                                <CardRenderIfVisible item={item} index={index}/>
                            </GridItem>
                        )
                    } )
                }
            </Grid>
        </>
    )
}

export default VirtualCards