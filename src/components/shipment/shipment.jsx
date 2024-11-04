import './shipment.css';

import infoIcon from '../../assets/icons/info.png';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

export default function Shipment({data, properties}){
    const [showDetailes, setShowDetails] = useState(false);
    const [details, setDetails] = useState([])
    const infoRef = useRef(null);
    const infoIconRef = useRef(null)

    useEffect(() => {
        const detailsProperties = properties.filter(propertie => {
            if(propertie != ('email' && 'subject' && 'event' && 'processed')) return propertie
        })
        setDetails(detailsProperties)
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleClickOutside = (e) => {
        if((infoRef.current && infoIconRef.current) && (!infoRef.current.contains(e.target) && !infoIconRef.current.contains(e.target))){
            setShowDetails(false)
        }
    }

    const Details = () => {
        return (
            <div ref={infoRef} className='shipment-details'>
                {details.map((detail, i) => 
                    <p><strong>{detail}:</strong> {data[detail]}</p>
                )}
                {/* <p><strong>Id de mensaje:</strong> {data.message_id}</p>
                <p><strong>Id de plantilla:</strong> {data.template_id}</p> */}
            </div>
        )
    }

    return(
        <div className='shipment-container'>
            <p className='shipment-data'><strong>Receptor:</strong> <span>{data.email}</span></p>
            <p className='shipment-data'><strong>Asunto:</strong> <span>{data.subject ? data.subject : 'Sin asunto'}</span></p>
            <p className='shipment-data'><strong>Estado:</strong> <span className={`email-state ${data.event}`}>{data.event}</span></p>
            <p className='shipment-data'><strong>Fecha:</strong> <time dateTime="{data.processed}">{data.processed}</time></p>
            <img ref={infoIconRef} onClick={() => setShowDetails(!showDetailes)} className='shipment-info' src={infoIcon} alt="Información del envio" />
            {showDetailes && <Details/>}
        </div>
    )
}