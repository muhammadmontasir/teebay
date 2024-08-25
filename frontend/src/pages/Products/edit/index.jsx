import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useApolloClient, useQuery } from '@apollo/client';

import { gql } from '@apollo/client';

const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: Int!) {
    getProductById(id: $id) {
      id
      title
      category {
        value
      }
      purchase_price
      rent_price
      rent_type
      description
      created_at
    }
  }
`;

const CATEGORIES = gql`
  query Categories {
    categories {
      id
      value
    }
  }
`;

const RENTTYPES = gql`
  query GetAllRentType {
    getAllRentType
  }
`;

// Main Component
const EditProduct = () => {
    const client = useApolloClient();
    const { id } = useParams();

    const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
        variables: { id: +id },
    });

    const { loading: loadingCategory, error: errorCategory, data: dataCategory } = useQuery(CATEGORIES, {
        onCompleted: (data) => {
            client.readQuery({
                query: CATEGORIES,
            });
        },
    });

    const { loading: loadingRentTypes, error: errorRentTypes, data: dataRentTypes } = useQuery(RENTTYPES, {
        onCompleted: (data) => {
            client.readQuery({
                query: RENTTYPES,
            });
        },
    });

    const [product, setProduct] = useState({
        id: 0,
        title: '',
        categories: [],
        price: '',
        rentPrice: '',
        rentType: '',
        description: '',
        createdAt: '',
        views: 0,
    });

    useEffect(() => {
        if (data && data.product) {
            setProduct(data.product);
        }
    }, [data]);

    const onSubmit = () => {
        console.log(product);
        // Handle form submission, such as updating the product in the backend
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log(dataCategory);

    return (
        <div className="flex justify-center items-center min-h-[800px] min-w-[800px]">
            <div className="flex flex-col gap-2">
                {/* Title Field */}
                <div className="pb-4 flex flex-col">
                    <label htmlFor="title" className="text-xl text-slate-800 pb-2">
                        Title
                    </label>
                    <InputTextarea
                        id="title"
                        value={product.title}
                        onChange={(e) => setProduct({ ...product, title: e.target.value })}
                        aria-describedby="title-help"
                        style={{ width: '750px' }}
                    />
                </div>

                {/* Categories Field */}
                <div className="pb-4 flex flex-col">
                    <label htmlFor="categories" className="text-xl text-slate-800 pb-2">
                        Categories
                    </label>
                    {/*<MultiSelect*/}
                    {/*    value={product.categories}*/}
                    {/*    options={dataCategory} // Adjust this to fetch categories from Apollo if needed*/}
                    {/*    onChange={(e) => setProduct({ ...product, categories: e.value })}*/}
                    {/*    optionLabel="name"*/}
                    {/*    filter*/}
                    {/*    maxSelectedLabels={3}*/}
                    {/*    className="w-full md:w-80"*/}
                    {/*    style={{ width: '300px' }}*/}
                    {/*/>*/}
                </div>

                {/* Description Field */}
                <div className="pb-4 flex flex-col">
                    <label htmlFor="description" className="text-xl text-slate-800 pb-2">
                        Description
                    </label>
                    <InputTextarea
                        rows={7}
                        cols={70}
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    />
                </div>

                {/* Price, Rent Price, and Rent Type Fields */}
                <div className="pb-8 flex gap-4">
                    {/* Price Field */}
                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-xl text-slate-800 pb-2">
                            Price
                        </label>
                        <InputTextarea
                            id="price"
                            value={product.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            aria-describedby="price-help"
                            style={{ width: '200px' }}
                        />
                    </div>

                    {/* Rent Price Field */}
                    <div className="flex flex-col">
                        <label htmlFor="rentPrice" className="text-xl text-slate-800 pb-2">
                            Rent Price
                        </label>
                        <InputTextarea
                            id="rentPrice"
                            value={product.rentPrice}
                            onChange={(e) => setProduct({ ...product, rentPrice: e.target.value })}
                            aria-describedby="rentPrice-help"
                            style={{ width: '100px' }}
                        />
                    </div>

                    {/* Rent Type Field */}
                    <div className="flex items-end">
                        <Dropdown
                            value={product.rentType}
                            options={dataRentTypes.getAllRentType.map((type) => ({ label: type, value: type }))}
                            onChange={(e) => setProduct({ ...product, rentType: e.value })}
                            optionLabel="name"
                            className="w-full md:w-56"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <Button label="Edit Product" raised className="button" onClick={onSubmit} />
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
