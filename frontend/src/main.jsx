import ReactDOM from "react-dom/client";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from '../redux/store.js';
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
