import { createStore, applyMiddleware } from 'redux'
import reducers from '../Reducers/reducers'
import thunk from 'redux-thunk'

const configureStore = () => {
    const store = createStore(reducers, applyMiddleware(thunk))
    return store
}
export default configureStore