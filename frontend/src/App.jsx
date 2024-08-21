import { ApolloProvider } from '@apollo/client';
import { client } from 'Apollo';
import { Layout } from 'Components/Layout';
import { Home, Login } from 'Pages';
import * as React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RoutePaths from './RoutePath';

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Routes>
                    <Route path={RoutePaths.Login} element={<Login />} />

                    <Route element={<Layout />}>
                        <Route path={RoutePaths.Home} element={<Home />} />
                        <Route path={RoutePaths.About} element={<About />} />
                    </Route>
                </Routes>
            </Router>
        </ApolloProvider>
    );
};

export default App;
