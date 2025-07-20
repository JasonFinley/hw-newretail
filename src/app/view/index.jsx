'use client'

import { useFilterContext } from "@/app/context/filter";
import { useEffect, useMemo } from "react";
import TableList from "../components/tableList";
import CardsList from "../components/cardsList";
import { useBreakpointValue } from "@chakra-ui/react";
import { useDeviceContext } from "../context/device";

const ViewProducts = ({ datas }) => {

    const filterContext = useFilterContext();
    const deviceContext = useDeviceContext();
    const bpV = useBreakpointValue({
        base: "mobile",
        xl: "table",
    });

    const filterDatas = useMemo( () => {

        const { name, price, category, inStock } = filterContext.filter;

        const minPrice = Math.min( price.min, price.max );
        const maxPrice = Math.max( price.min, price.max );

        const datasFilter = datas.filter( item => {

            const matchesName = name ? item.name.includes(name) : true;
            const matchesPrice = price ? item.price >= minPrice && item.price <= maxPrice : true;
            const matchesCategory = category.length > 0 ? category.includes(item.category) : true;
            const matchesInStock = inStock !== '0' ? item.inStock === (inStock === '1') : true;

            return matchesName && matchesPrice && matchesCategory && matchesInStock;
        });

        return datasFilter;

    }, [ datas, filterContext.filter ] );

    return (
        <>
            { bpV == "mobile" || deviceContext.device == "mobile" ? (
                    <CardsList datas={ filterDatas }/>
                ) : (
                    <TableList datas={ filterDatas }/>
                )
            }
        </>
    )
}

export default ViewProducts;