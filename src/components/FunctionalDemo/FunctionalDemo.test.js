import ReactDOM from 'react-dom';
import {unmountComponentAtNode} from 'react-dom'
import React from 'react';
import FunctionalDemo from './FunctionalDemo';

let container = null;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
})

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});


it('Renders FunctionalDemo component witohut crashing.',() =>  {
    const divComponent = document.createElement('div');
    ReactDOM.render(<FunctionalDemo></FunctionalDemo>, divComponent);

});