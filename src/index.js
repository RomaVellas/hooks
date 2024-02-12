import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {


  const [ id, setId ] = useState(1);

  const getPlanet = (id) => {
    return fetch(`https://swapi.dev/api/planets/${id}`)
  .then( (res) => res.json())
  .then(data => data)
};
  const useRequest = (request) => {

    const [ dataState, setDataState ] = useState({
      data: null,
      loading: true,
      error: null
    });

    useEffect(() => {
      setDataState({
        data: null,
        loading: true,
        error: null
      });

      let censoled = false;

      request()
        .then(data => !censoled && setDataState({
          data,
          loading: false,
          error: null
        }))
        .catch(error => !censoled && setDataState({
          data: null,
          loading: false,
          error
        }));

        return () => censoled = true;
    }, [ request ]);
    return dataState;
  };

  const usePlanetInfo = (id) => {
    const request = useCallback(() => getPlanet(id), [ id ])
    return useRequest(request);
  };
  const { data, loading, error } = usePlanetInfo(id);

  if(error) {
    return <div>Something is wrong</div>
  };

  if (loading) {
    return <div>loading ...</div>
  };

  return (
    <div style={{ padding: '10px'}}>
      <button onClick={() => setId((i) => i + 1)}>+</button>
      <button onClick={() => setId((i) => i - 1)}>-</button>
      <div>{id} - {data.name}</div>
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

