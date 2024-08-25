import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './Apollo';
import Layout from './components/Layout/index.jsx';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RoutePaths from './RoutePath';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import CreateProduct from './pages/Products/create/index.jsx';
import EditProduct from './pages/Products/edit/index.jsx';
import ProductsList from './pages/Products/index.jsx';
import { PrimeReactProvider } from 'primereact/api';

const App = () => {
    return (
        <ApolloProvider client={client}>
            <PrimeReactProvider>
                <Router>
                    <Routes>
                        {/* Route for SignIn page */}
                        <Route path={RoutePaths.Login} element={<SignIn />} />

                        {/* Routes that share a common Layout */}
                        <Route element={<Layout />}>
                            {/* Route for SignUp page */}
                            <Route path={RoutePaths.SignUp} element={<SignUp />} />
                            <Route path={RoutePaths.ProductList} element={<ProductsList />} />

                            {/* Route for CreateProduct page */}
                            <Route path={RoutePaths.CreateProduct} element={<CreateProduct />} />

                            {/* Route for EditProduct page with dynamic id */}
                            <Route path={RoutePaths.EditProduct} element={<EditProduct />} />
                        </Route>
                    </Routes>
                </Router>
                </ PrimeReactProvider>
        </ApolloProvider>
    );
};

export default App;
