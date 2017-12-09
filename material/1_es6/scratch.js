import {Provider} from `react-redux`

ReactDOM.render(
    <Provider store={store}>
        <MyRootComponent />
    </Provider>,
    rootEl
)