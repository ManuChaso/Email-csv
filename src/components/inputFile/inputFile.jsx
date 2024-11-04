import { useEffect, useState } from 'react';
import './inputFile.css';

import uploadIcon from '../../assets/icons/upload.png';

export default function InputFile({file, setFile}){
    const [over, setOver] = useState(false);
    const [fileName, setFileName] = useState('')


    useEffect(() => {
        if(file && file.name){
            if(file.name.length > 25){
                setFileName(file.name.slice(0, 25).concat('...'))
            }else{
                setFileName(file.name)
            }
        }
    }, [file])

    const handleDrop = (e) => {
        e.preventDefault()
        if(e.dataTransfer.files && e.dataTransfer.files.length > 0){
            setFile(e.dataTransfer.files[0])
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setOver(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setOver(false)
    }

    return(
        <div className='file-container'>
            <input
                id='input-file'
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{display: 'none'}}
            />

            <label
                className={over ? 'file over' : 'file'}
                htmlFor="input-file"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >{fileName ? fileName : <img className={over ? 'icon icon-over': 'icon'} src={uploadIcon} alt="Icono de subida de archivo"/>}</label>

            {/* <button className='upload-file'>Subir</button> */}
        </div>
    )
}