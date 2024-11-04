import { useEffect, useRef, useState } from 'react'
import './header.css'

export default function Header({properties, filter, exportCSV}){
    const [filters, setFilters] = useState([])
    const propertiesRef = useRef(null)
    const operatorsRef = useRef(null)
    
    useEffect(() => {
        console.log('ahora')
        filter(filters)
    }, [filters])

    const removeFilter = (i) => {
        const newArray = [...filters];
        newArray.splice(i, 1)
        setFilters(newArray)
    }

    const handleFilters = (e) => {
        if(e.key === 'Enter'){
            const newFilter = {
                propertie: propertiesRef.current.value, 
                operator: operatorsRef.current.value,
                value: e.target.value
            };
            setFilters([...filters, newFilter])
            e.target.value = ''
            propertiesRef.current.value = 'all'
            operatorsRef.current.value = 'equal'
        }
    }


    return(
        <header className='header'>
            <div className='header-container'>
                <div className='filter'>
                    <select ref={propertiesRef} name="properties" id="properties">
                        <option value="all">Todo</option>
                        {properties.map((propertie, i) => 
                            <option key={i} value={propertie}>{propertie}</option>
                        )}
                    </select>

                    <select ref={operatorsRef} name="operator" id="operator">
                        <option value="equal">Igual que</option>
                        <option value="greater">Mayor que</option>
                        <option value="less">Menor que</option>
                        <option value="greaterEqual">Mayor o igual que</option>
                        <option value="lessEqual">Menor o igual que</option>
                    </select>

                    <input onKeyDown={handleFilters} type="text" placeholder='Valor...'/>
                </div>

                <div className='filters'>
                        {filters.map((filter, i) => 
                            <p key={i}>{filter.propertie} {filter.operator} {filter.value} <img onClick={() => removeFilter(i)} src="https://png.pngtree.com/png-vector/20230527/ourmid/pngtree-red-cross-paint-clipart-transparent-background-vector-png-image_7110618.png" alt="" /></p>
                        )}
                </div>
                <button onClick={exportCSV} className='export-button'>Export</button>
            </div>
        </header>
    )
}