'use client'

import { useEffect, useState } from "react";
import { Stack, RadioGroup, Radio, Checkbox, CheckboxGroup } from "@chakra-ui/react"
import InputDebounce from "../inputDebounce";
import { useFilterContext } from "@/app/context/filter";

const componentFilter = ({ datas }) => {

    const defaultOption = {
        name: "",
        price: { min: 0, max: 999999 },
        category: [],
        stock: "1",
    }

    const filterContext = useFilterContext();
    const [ filterName, setFilterName ] = useState( defaultOption.name );
    const [ filterPrice, setFilterPrice ] = useState( defaultOption.price );
    const [ filterCategory, setFilterCategory ] = useState( defaultOption.category );
    const [ filterInStock, setFilterInStock ] = useState( defaultOption.stock );

    const [ allCategory, setAllCategory ] = useState([]);

    useEffect( () => {
        //reset filter...

        const allcategory = [...new Set(datas.map(item => item.category))];
        const sort = allcategory.sort( (a, b) => a.localeCompare(b) );
        setAllCategory(sort);
        setFilterCategory( [sort[0]] );
        setFilterName( defaultOption.name );
        setFilterPrice( defaultOption.price );
        setFilterInStock( defaultOption.stock );
        const filter = {
            name: defaultOption.name,
            price: defaultOption.price,
            category: [sort[0]],
            inStock: defaultOption.stock,
        }
        filterContext.setFilter( filter );

    }, [datas] );

    const handleOnDebouncedName = ( text ) => {
        setFilterName( text );
    }
    const handleOnDebouncedMinPrice = ( text ) => {
        setFilterPrice( ( pre ) => {
            return {
                min: parseInt( text ),
                max: pre.max
            }
        } );
    }
    const handleOnDebouncedMaxPrice = ( text ) => {
        setFilterPrice( ( pre ) => {
            return {
                min: pre.min,
                max: parseInt( text )
            }
        } );
    }

    const handleOnChangeCategory = ( value ) => {
        setFilterCategory( ( prev) => {
            return prev.includes(value) 
            ? prev.filter( (item) => item !== value ) // 取消勾選
            : [...prev, value];                        // 新增勾選
        });
    }

    const handleOnChangeStock = ( val ) => {
        setFilterInStock( val );
    }

    useEffect( () => {

        filterContext.setFilter({
            name: filterName,
            price: filterPrice,
            category: filterCategory,
            inStock: filterInStock,
        })

    }, [filterCategory, filterName, filterPrice, filterInStock] );

    return (
        <>
            <div style={{display: "flex", marginBottom: "16px"}}>
                <label style={{ marginRight: "16px"}}>類別 : </label>
                <CheckboxGroup colorScheme='green' value={ filterCategory }>
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                        {
                            allCategory.map( (item) => {
                                return (
                                    <Checkbox 
                                        key={item} 
                                        value={ item }
                                        isChecked={ filterCategory.includes(item) }
                                        onChange={ () => handleOnChangeCategory( item ) }
                                    >
                                        { item }
                                    </Checkbox>
                                )
                            } )
                        }
                        
                    </Stack>
                </CheckboxGroup>
            </div>
            <div style={{display: "flex", marginBottom: "16px"}}>
                <label style={{ marginRight: "16px"}}>名稱搜尋 : </label>
                <InputDebounce
                    type="text"
                    placeholder="請輸入關鍵字"
                    onDebounced={ handleOnDebouncedName }
                />
            </div>
            <div style={{display: "flex", marginBottom: "16px"}}>
                <label style={{ marginRight: "16px"}}>價格範圍 : </label>
                <InputDebounce
                    type="number"
                    placeholder="請輸入最小金額"
                    onDebounced={ handleOnDebouncedMinPrice }
    
                />
                <label style={{ marginLeft: "16px", marginRight: "16px"}}>～</label>
                <InputDebounce
                    type="number"
                    placeholder="請輸入最大金額"
                    onDebounced={ handleOnDebouncedMaxPrice }
    
                />
            </div>
            <div style={{display: "flex", marginBottom: "16px"}}>
                <label style={{ marginRight: "16px"}}>庫存篩選 : </label>
                <RadioGroup defaultValue={ defaultOption.stock } onChange={ handleOnChangeStock }>
                    <Stack spacing={5} direction='row'>
                        <Radio colorScheme='green' value="0">
                            全部
                        </Radio>
                        <Radio colorScheme='green' value="1">
                            有庫存
                        </Radio>
                    </Stack>
                </RadioGroup>
            </div>
        </>
    )
}

export default componentFilter;