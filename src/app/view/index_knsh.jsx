'use client'

import { KnshFilterObj, useFilterContext } from "@/app/context/filter";
import { useMemo } from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import { useDeviceContext } from "../context/device";
import CardsGrid from "../components/cardsgrid";

function checkMaskValue( baseMask, filterMask ){
    return (filterMask & baseMask) > 0 ? true : false
}

const ViewProducts = ({ datas }) => {

    const filterContext = useFilterContext();
    const deviceContext = useDeviceContext();

    const filterDatas = useMemo( () => {

        const { school, type, book } = filterContext.filter;
        
        const datasFilter = datas.filter( item => {

            // 逐個判斷是否符合條件
            let matchSchool = false;
            let matchBook = false;
            let matchType = false;

            // 處理 school: 將數字 7, 8, 9 轉成對應的 mask
            if (item.school === 7) { matchSchool = checkMaskValue( KnshFilterObj.school7.value, school );
            }else if (item.school === 8) { matchSchool = checkMaskValue( KnshFilterObj.school8.value, school );
            }else if (item.school === 9) { matchSchool = checkMaskValue( KnshFilterObj.school9.value, school );
            }else { matchSchool = true; }

            // 處理 book: 將 'CN'、'EN' 等轉成對應的 mask
            if (item.book && KnshFilterObj[`book${item.book}`])
                matchBook = checkMaskValue( KnshFilterObj[`book${item.book}`].value, book );

            // 處理 type: 將 'SB'、'LI' 等轉成對應的 mask
            if (item.type && KnshFilterObj[`type${item.type}`])
                matchType = checkMaskValue( KnshFilterObj[`type${item.type}`].value, type);

            return matchSchool && matchBook && matchType;
        });

        return datasFilter;

    }, [ datas, filterContext.filter ] );

    console.log( deviceContext.device );

    return (
        <>
            <CardsGrid 
                datas={ filterDatas }
                mode={ deviceContext.device === "table" ? "virtual" : "Infinite" }
            />
        </>
    )
}

export default ViewProducts;