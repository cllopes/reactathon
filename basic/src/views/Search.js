import React from 'react'
import queryString from 'query-string'

const Search = (props) => {
	const parsedParams = queryString.parse(props.location.search) // {"city":"Toronto","name":"Jim"}
	return <div>Searching for {parsedParams.name} from {parsedParams.city}</div>
}

export default Search