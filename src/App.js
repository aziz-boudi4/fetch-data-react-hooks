import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import './App.css';

const SearchResults = () => {

  const [data, setData] = useState({ hits:[] });
  const [query, setQuery] = useState("react");

  // using async directly in the useEffect function isn't allowed.
  // Let's implement a workaround for it, by using the async function inside the effect.

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const result = await axios('https://hn.algolia.com/api/v1/search?query=' + query);
      if (!ignore) setData(result.data);
    }

    fetchData();

    return () => { ignore = true; }
  },[query])

  return (
    <div className="App">
      <input className="Input" value={query} onChange={e => setQuery(e.target.value)} />
      <ul>
        {data.hits.map(item => (
          <li className="List" key={item.objectID}>
            <a className="Link" style={{ }} href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
