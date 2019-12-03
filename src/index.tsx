import * as React from 'react';
import * as ReactDom from 'react-dom';

// import 'bootstrap/dist/css/bootstrap.css';



import { App } from './components/App';

const entryPoint = document.getElementById('app');

// ESTO TENDRÉ QUE CAMBIARLO EN SU MOMENTO
ReactDom.render(<App fileName={'Coffe Learn'}/>, entryPoint);