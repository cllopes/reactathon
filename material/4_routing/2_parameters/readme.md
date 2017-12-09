# Parameters

## Path Parameters

The `Route` `path` prop can contain placeholders for path parameters using the syntax `/:paramName`.

`<Route path="profile/:id" component={Profile}/>`

Within the  **Route Component** the parameter can be extracted from the `match.params` property:

```javascript 1.8
const Profile = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
)
```

### Optional Request Parameters

You can put place holder for **optional** path parameters using the syntax `/:optionalParameter?`.

```javascript 1.8
<Route path="/to/page/:pathParam?" component={MyPage} />
```

Similarly you can have more than one path parameter:

<Route path="/to/page/:pathParam1/:optionalParam1?/:optionalParam1?" component={MyPage} />

## Query Parameters

Query parameters are not part of the `location` so will not be matched in the `Route` `path` prop but you may still
want to access them in the **Route Component**.

This is done using the `location.search` prop passed to the **Route Component**, but this just returns you the full
unparsed query string:

`/search?name=Jim&city=Toronto` --> `?name=Jim&city=Toronto`

React Router has deliberately left out parameter parsing functionality from the library (see [Gibhub tread](https://github.com/ReactTraining/react-router/issues/4527))
but there are some good 3rd party solutions if you don't want to parse it yourself.

One easy to use library is [query-string](https://github.com/sindresorhus/query-string), which allows you to simply parse
the query string into an object.

```javascript 1.8
import queryString from 'query-string'

const Search = (props) => {
	const parsedParams = queryString.parse(props.location.search) // {"city":"Toronto","name":"Jim"}
	return <div>Searching for {parsedParams.name} from {parsedParams.city}</div>
}
```



##### Next up: [Authenticated Route](../3_authenticated_routes/readme.md)