import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from '../reducers';

const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore() {
    return createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(reduxThunk))
    );
}
const store = configureStore();

export default store;
