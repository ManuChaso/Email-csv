import './loading.css';

import loadingGif from '../../assets/gifs/loading.gif';

export default function Loading(){
    return(
        <div className='loading'>
            <img src={loadingGif} alt="" />
        </div>
    )
}