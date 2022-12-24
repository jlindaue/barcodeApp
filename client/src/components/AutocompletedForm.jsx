import { useState } from 'react';
import { BACKEND_URL } from '../config';

const AsyncTypeahead = require('react-bootstrap-typeahead').AsyncTypeahead;

export default function AutocompletedForm(props){
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([])

  return (
    <AsyncTypeahead
      className='my-1'
      id={`${props.source}Autocomplete`}
      isLoading={isLoading}
      placeholder={props.placeholder}
      labelKey="name"
      //labelKey={option=>option.label}
      onSearch={(query) => {
        setIsLoading(true);
        fetch(`${BACKEND_URL}/${props.source}?q=${query}`)
          .then(resp => resp.json())
          .then(json => {
            setIsLoading(false);
            setOptions(json);
          })}
      }
      onChange={(list)=>{
        console.log(list);
        if (props.setSelected) props.setSelected(list);
        if (list?.length !== 1) return;
        props.onEnter(list[0])
      }}
      allowNew={true}
      options={options}
      selected={props.selected ? props.selected : []}
      useCache={false}
    />
  );
} 

