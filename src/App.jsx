import { useEffect, useState } from 'react'
import './App.css'
import InputFile from './components/inputFile/inputFile'
import { useCSVLoader } from './hooks/useCSVLoader'
import Header from './components/header/header'
import PagesButtons from './components/pagesButton/pagesButton'
import Loading from './components/loading/loading'
import parseCSV from './utils/parseCSV'
import Shipment from './components/shipment/shipment'

const worker = new Worker(new URL('./utils/filterWorker.js', import.meta.url))

function App() {
  const [file, setFile] = useState(null);
  const [filteredData, setFileteredData] = useState([]);
  const {data, properties, setData, parseCsv, error, loading, setLoading} = useCSVLoader();
  const [showData, setShowData] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 20;


  useEffect(() => {
    if(file){
      parseCsv(file)
    }
  }, [file])

  useEffect(() => {
    if(!filteredData.length){
      if(data.length){
        if(page * pageSize < data.length && page >= 0){
          const newData = data.slice(pageSize * page, (page + 1) * pageSize);
          console.log(data)
          setShowData(newData)
        }
      }
    }else{
        if(page * pageSize < filteredData.length && page >= 0){
          const newData = filteredData.slice(pageSize * page, (page + 1) * pageSize);
          setShowData(newData)
        }
    }
  }, [data, page, filteredData])

  const exportCSV = () => {
      const csvData = parseCSV(filteredData.length ? filteredData : data);
      const blob = new Blob([csvData], {type: 'text/csv'});
      const url = URL.createObjectURL(blob)

      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name}`;
      a.click()
      console.log(blob)
  }

  const applyFilterWithWorker = (filters) => {
    setLoading(true)
    setPage(0)
    worker.postMessage({data, filters});
    worker.onmessage = (e) => {
      setLoading(false);
      setFileteredData(e.data)
    }
  }

  return (
    <>
      <Header properties={properties} filter={applyFilterWithWorker} exportCSV={exportCSV}/>
      {data.length && <PagesButtons page={page} setPage={setPage} dataLength={filteredData.length ? filteredData.length / 20 : data.length / 20}/>}
      <div className='app'>
        {loading ? <Loading/> : (
          !file ?
          <InputFile file={file} setFile={setFile}/>
          :
          <>
            {showData?.map((row, i) => 
              <Shipment key={i} data={row} properties={properties}/>
            )}
          </>
        )
        }
      </div>
    </>
  )
}

export default App
