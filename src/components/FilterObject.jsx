import { useEffect, useState } from "react";
import dataPulsa from "../helpers/dataPulsa.json";

function FilterObject() {
    const [filteredDenoms, setFilteredDenoms] = useState([]);
    const [originalDenoms, setOriginalDenoms] = useState([]);
  
    useEffect(() => {
      // Simpan data denoms sebelum filter
      setOriginalDenoms(dataPulsa.data.response.billdetails.map(item => item.body[0]));
  
      // Filter data denoms sesuai kriteria dan simpan index array
      const filteredResult = dataPulsa.data.response.billdetails
        .map(item => parseInt(item.body[0].split(' ')[2]))
        .filter((denom, index) => denom >= 100000 && index);

      setFilteredDenoms(filteredResult);
    }, []);
  
    return (
      <div>
        <h1>Data Sebelum Filter</h1>
        <pre>{JSON.stringify(originalDenoms, null, 2)}</pre>
  
        <h1>Data Setelah Filter</h1>
        <pre>{JSON.stringify(filteredDenoms, null, 2)}</pre>
      </div>
    );
  }
  
  export default FilterObject;