import { useState } from 'react';
import './pagesButton.css';
import { useEffect } from 'react';


export default function PagesButtons({page, setPage, dataLength}){
    const [pagesArray, setPagesArray] = useState([]);

    useEffect(() => {
        console.log(dataLength)
        console.log('ahora sube')
        document.querySelector('.app').scrollTo(0,0)
        setPagesNum()
    }, [page]);

    const setPagesNum = () => {
        let pagesNum = []
        for (let i = page - 3; i <= page + 3; i++) {
            pagesNum.push(i)
        }
        setPagesArray(pagesNum)
    }

    return(
        <div className='pages-button'>
            {pagesArray?.map((p, i) => 
                <button
                    style={(p < 0) || (p > dataLength) ? {opacity: 0.3, color: 'transparent'} : {opacity: 1, color: 'white'}}
                    key={i}
                    onClick={() => ((p >= 0) && (p < dataLength)) && setPage(p)} className={p === page ? 'button-page active' : 'button-page'}>{p}</button>
            )}
        </div>
    )
}