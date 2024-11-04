import Papa from 'papaparse'
import { useEffect, useState } from 'react';

export const useCSVLoader = () => {
  const [data, setData] = useState([]);
  const [properties, setProperties] = useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const defProperties = ['email', 'subject', 'event', 'processed']

  useEffect(() => {
    if(properties.length && !defProperties.every(propertie => properties.includes(propertie))){
        setError('Archivo csv no compatible');
    }
  }, [properties])

  const parseCsv = (file) => {
    setLoading(true);
    setError(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data)
        setProperties(results.meta.fields)
        setLoading(false)
      },
      error: (err) => {
        setError(err.message);
        setLoading(false)
      }
    })
  }

  return {data, properties, setData, parseCsv, setLoading, error, loading}
};
