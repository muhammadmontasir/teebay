import React, { useEffect } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { gql } from 'graphql-tag';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import ProductCard from './../../components/ProductCard.js';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      price
      description
      createdAt
      views
      rentPrice
      rentType
      categories {
        id
        name
      }
      user_id
    }
  }
`;

const ProductsPage = () => {
    const navigate = useNavigate();
    const client = useApolloClient();
    const userId = 1;

    const { loading, error, data } = useQuery(GET_PRODUCTS, {
        onCompleted: (data) => {
            // Store the products in Apollo Client's InMemoryCache
            client.writeQuery({
                query: GET_PRODUCTS,
                data: {
                    products: data.products,
                },
            });
        },
    });

    const products = data?.products?.filter((product) => product.user_id === userId) || [];

    const handleDelete = (productId) => {
        console.log("Product deleted:", productId);
        // Handle delete logic here
    };

    const handleLogout = () => {
        console.log("logout");
        // Handle logout logic here
    };

    return (
        <div>
            <div className="flex justify-end px-24 pt-4">
                <Button label="LOGOUT" onClick={handleLogout} className="p-button-danger" />
            </div>

            <div className="flex justify-center items-center min-h-screen pt-10">
                <div>
                    <div className="pb-4 flex justify-center text-3xl text-slate-700">
                        MY PRODUCTS
                    </div>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error loading products</p>}
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} onDelete={handleDelete} />
                    ))}

                    <div className="flex justify-end pb-4">
                        <Button
                            label="Add Product"
                            onClick={() => navigate('/products/create')}
                            className="p-button-primary"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
