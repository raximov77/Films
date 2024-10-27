import * as React from 'react';
import useDebounce from "../hooks/useDebounce"
import { useNavigate } from 'react-router';
import {useAxios} from "../hooks/useAxios"
import Autocomplete from '@mui/joy/Autocomplete';

export default function CustomSearch() {
    const navigate = useNavigate()
    const [searchInput, setSearchInput] = React.useState("")
    const [searchData, setSearchData] = React.useState([])

    function handleChange(e){
        setSearchInput(e.target.value);
    }
    const searchValue = useDebounce(searchInput, 1000)

    React.useEffect(() => {
        if(searchValue) {
            useAxios().get("/search/movie", {
                params : { query: searchValue }
            }).then(res => {
                setSearchData(res.data.results.map(item => {
                    const data = {
                        label: item.title,
                        year: item.id,
                    }
                    return data
                }))
            })
        }
    }, [searchValue])
  return (
    <Autocomplete
        onInput={handleChange}
        onChange={(e, a) => navigate(`/movie/${a.year}`)}
        placeholder={"Searching..."}
        options={searchData}
        sx={{ width: 300 }}
    />
  );
}