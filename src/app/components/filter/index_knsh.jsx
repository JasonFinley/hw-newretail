'use client'

import { useCallback, useEffect, useState } from "react";
import { Stack, Checkbox } from "@chakra-ui/react"
import { useFilterContext, KnshFilterObj } from "@/app/context/filter";

function bitOperation(base, mask) {
    // 如果 base 已經有 mask 的所有 bit，代表要「清除」
    if ((base & mask) === mask) {
        return (base & ~mask) >>> 0; // 清掉 mask bit
    } else {
        return (base | mask) >>> 0;  // 加上 mask bit
    }
}

const componentFilter = () => {

    const defaultOption = {
        school: 0x00000fff,
        book:   0x0fffffff,
        type:   0x0fffffff
    }

    const filterContext = useFilterContext();
    const [ filterObjs, setFilterObjs ] = useState( defaultOption );
    const [ schools, setSchools ] = useState([ 
        KnshFilterObj.school7, 
        KnshFilterObj.school8, 
        KnshFilterObj.school9
    ]);
    const [ books, setBooks ] = useState( [ 
        KnshFilterObj.bookCN, 
        KnshFilterObj.bookEN, 
        KnshFilterObj.bookMA,
        KnshFilterObj.bookMC,
        KnshFilterObj.bookNA,
        KnshFilterObj.bookSO,
        KnshFilterObj.bookTC
    ] );
    const [ types, setTypes ] = useState( [ 
        KnshFilterObj.typeAU, 
        KnshFilterObj.typeCA, 
        KnshFilterObj.typeEX,
        KnshFilterObj.typeLI,
        KnshFilterObj.typePR,
        KnshFilterObj.typeSB,
        KnshFilterObj.typeTX
    ] );

    useEffect( () => {

        filterContext.setFilter( filterObjs );

    }, [filterObjs] );

    const handleonChangeSchool = useCallback( ( school ) => {
        setFilterObjs( ( pre ) => {
            const newValue = {...pre};
            newValue.school = bitOperation( newValue.school, school.value );
            return newValue;
        } );
    }, [] );
    const handleonChangeBook = useCallback( ( book ) => {
        setFilterObjs( ( pre ) => {
            const newValue = {...pre};
            newValue.book = bitOperation( newValue.book, book.value );
            return newValue;
        } );
    }, [] );
    const handleonChangeType = useCallback( ( type ) => {
        setFilterObjs( ( pre ) => {
            const newValue = {...pre};
            newValue.type = bitOperation( newValue.type, type.value );
            return newValue;
        } );
    }, [] );

    return (
        <>
            <div style={{display: "flex", marginBottom: "16px"}}>
                <label style={{ marginRight: "16px"}}>年級 : </label>
                <Stack spacing={[1, 5]} direction={['column', 'row']}>
                    {
                        schools.map( (item) => {
                            return (
                                <Checkbox 
                                    key={item.name} 
                                    value={ item.value }
                                    isChecked={ (filterObjs.school & item.value ) > 0 ? true : false }
                                    onChange={ () => handleonChangeSchool( item ) }
                                >
                                    { item.name }
                                </Checkbox>
                            )
                        } )
                    }
                </Stack>
            </div>
            <div style={{display: "flex", marginBottom: "16px"}}>
                <label style={{ marginRight: "16px"}}>科目 : </label>
                    <Stack spacing={5} direction='row'>
                        {
                            books.map( (item) => {
                                return (
                                    <Checkbox 
                                        key={item.name} 
                                        value={ item.value }
                                        isChecked={ (filterObjs.book & item.value ) > 0 ? true : false }
                                        onChange={ () => handleonChangeBook( item ) }
                                    >
                                        { item.name }
                                    </Checkbox>
                                )
                            } )
                        }
                    </Stack>
            </div>
            <div style={{display: "flex", marginBottom: "16px"}}>
                <label style={{ marginRight: "16px"}}>種類 : </label>
                    <Stack spacing={5} direction='row'>
                        {
                            types.map( (item) => {
                                return (
                                    <Checkbox 
                                        key={item.name} 
                                        value={ item.value }
                                        isChecked={ (filterObjs.type & item.value ) > 0 ? true : false }
                                        onChange={ () => handleonChangeType( item ) }
                                    >
                                        { item.name }
                                    </Checkbox>
                                )
                            } )
                        }
                    </Stack>
            </div>
        </>
    )
}

export default componentFilter;