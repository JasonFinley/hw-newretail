'use client'

import { useCallback, useMemo, useState, useEffect } from "react"
import { useInView } from "react-intersection-observer";
import { Grid, GridItem } from '@chakra-ui/react'
import CardTheme from "./cardstyle";

function useInfiniteScroll( loadMore, hasMore ) {
    const { ref, inView } = useInView();
    const loadMoreCb = useCallback(() => {
        if (hasMore) loadMore();
    }, [loadMore, hasMore]);

    useEffect(() => {
        if (inView && hasMore) loadMoreCb();
    }, [inView, hasMore, loadMoreCb]);

    return { ref };
}

const InfiniteCards = ( { datas, setMode } ) => {

    const PAGE_SIZE = 20;
    const keyCounter = new Map();
    const [priceSortCount, setPriceSortCount] = useState(0);
    const [ pageNum, setPageNum ] = useState(1);

    const sortDatas = useMemo( () => {

        if( priceSortCount % 3 == 1 ){
            return [...datas].sort( (a, b) => a.price - b.price );
        }else if( priceSortCount % 3 == 2 ){
            return [...datas].sort( (a, b) => b.price - a.price );
        }

        return datas;

    }, [ datas, priceSortCount ] );

    const listCards = useMemo(() => {

        return sortDatas.slice(0, pageNum * PAGE_SIZE);

    }, [sortDatas, pageNum]);

    const hasMore = listCards.length < datas.length;
    const loadMore = () => {
        setPageNum( num => num + 1 );
    }
    const { ref } = useInfiniteScroll( loadMore, hasMore );

    const handleSortPrice = () => {
        setPageNum(1);
        setPriceSortCount( priceSortCount + 1 );
    }

    const getSortName = ( index ) => {
        const names = [ "無", "低", "高" ];
        let idx = index % names.length;
        return names[ idx ];
    }

    return (
        <div style={{
            overflowY: "hidden"
        }}>
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
                    onClick={ () => { setMode("virtual") } }
                >
                    { "USE Virtual List" }
                </button>
            </div>
            <div style={{
                height: "60vh",
                overflowY: "auto"
            }}>
                <Grid
                    templateColumns='repeat(2, 1fr)' gap={2}
                >
                    {
                        listCards.map( ( item, index ) => {
                            const count = keyCounter.get( item.name ) || 0 ;
                            const key = `${item.name}-${count}`;
                            keyCounter.set( item.name, count + 1 );
                            return (
                                <GridItem key={key} w='100%'>
                                    <CardTheme item={item}/>
                                </GridItem>
                            )
                        } )
                    }
                </Grid>
                {hasMore && (<div ref={ref} style={{ padding: 16, textAlign: 'center' }}> 加載中... </div> )}
                {!hasMore && <div style={{ padding: 16, textAlign: 'center' }}>已讀取全部資料</div>}
            </div>
        </div>
    )
}

export default InfiniteCards