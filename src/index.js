import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './root';

const renderApp = RootCmp => {
		render(
			<AppContainer>
        <RootCmp></RootCmp>
			</AppContainer>,
			document.getElementById('root'),
		);
};

renderApp(Root);
