'use client'

import { useState, useEffect, useRef, useCallback } from "react";

function debounce(fn, delay = 500) {

    let timer;
    return (...args) => {
        
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

const InputDebounce = ({ value, onChange, onDebounced, ...props }) => {

    const [ inputValue, setInputValue ] = useState( value || "");

    const debounceRef = useRef( debounce( ( text ) => {
        
        if( onDebounced ) onDebounced( text )

    } ) );

    useEffect(() => {
        setInputValue( value || '');
    }, [value]);

    const handleOnChange = useCallback( (e) => {
            const val = e.target.value;
            setInputValue(val);

            if( onChange ) onChange(val);   // 即時輸入處理（非 debounce

            debounceRef.current(val);       // debounce 處理
        },
        [onChange, onDebounced]
    );

    return ( <input {...props} value={ inputValue } onChange={ handleOnChange }/> )
}

export default InputDebounce;