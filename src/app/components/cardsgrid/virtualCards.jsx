'use client'

import { useCallback, useEffect, useMemo, useState } from "react"
import { useInView } from "react-intersection-observer";
import { Grid, GridItem, useBreakpoint } from '@chakra-ui/react'
import CardTheme from "./cardstyle";

function getPriorityLimit(breakpoint) {
    switch (breakpoint) {
        case '2xl':
        case 'xl':
        case 'lg':
            return 4;
        case 'md':
            return 2;
        default:
            return 1;
    }
}

const CardRenderIfVisible = ({ item, index, isPriority }) => {
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
                    <CardTheme item={item} isPriority={ isPriority }/>
                </>
            ) : (
                <>
                </>
            )

            }
            
        </div>
    );
};


const VirtualCards = ( { datas } ) => {

    const bp = useBreakpoint();

    const priorityLimit = getPriorityLimit( bp );

    const keyCounter = new Map();

    const listCards = datas;

    useEffect( () => {
        console.log( bp );
    }, [bp] );

    return (
        <>
            <Grid
                templateColumns={{ 
                    base: 'repeat(1, 1fr)',
                    md: 'repeat(2, 1fr)',
                    xl: 'repeat(4, 1fr)' 
                }}
                gap={2}
            >
                {
                    listCards.map( ( item, index ) => {
                        const count = keyCounter.get( item.name ) || 0 ;
                        const key = `${item.name}-${count}`;
                        keyCounter.set( item.name, count + 1 );
                        return (
                            <GridItem 
                                key={key} 
                                w='350px'
                                h="410px"
                            >
                                <CardRenderIfVisible 
                                    item={item} 
                                    index={index}
                                    isPriority={index < priorityLimit*2}
                                />
                            </GridItem>
                        )
                    } )
                }
            </Grid>
        </>
    )
}

export default VirtualCards