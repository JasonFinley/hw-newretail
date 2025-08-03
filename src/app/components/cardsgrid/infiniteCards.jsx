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

const InfiniteCards = ( { datas } ) => {

    const PAGE_SIZE = 8;
    const keyCounter = new Map();
    const [ pageNum, setPageNum ] = useState(1);

    const sortDatas = datas;

    const listCards = useMemo(() => {

        return sortDatas.slice(0, pageNum * PAGE_SIZE);

    }, [sortDatas, pageNum]);

    const hasMore = listCards.length < datas.length;
    const loadMore = () => {
        setPageNum( num => num + 1 );
    }
    const { ref } = useInfiniteScroll( loadMore, hasMore );

    return (
        <div style={{
            overflowY: "hidden"
        }}>
            <div style={{
                height: "70vh",
                overflowY: "auto"
            }}>
                <Grid
                    templateColumns='repeat(1, 1fr)' gap={2}
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