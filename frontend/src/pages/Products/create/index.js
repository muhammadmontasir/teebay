import React from 'react';
import { useNavigate } from 'react-router-dom';
import MultiPageForm from '../../../components/MultiPageForm.js';

// Interface for the Product type
interface Product {
    title: string;
    categories: string[];
    price: string;
    rentPrice?: string;
    rentType?: string;
    description: string;
    createdAt: string;
    views: number;
}

const CreateProduct: React.FC = () => {
    const navigate = useNavigate();

    const onSubmit = (product: Product) => {
        console.log(product);
        // You might want to navigate or do something else after the submission
        // navigate('/products'); // For example, redirect to the products list
    };

    return (
        <div className="flex justify-center items-center min-h-[800px]">
            <MultiPageForm page={0} onSubmit={onSubmit} />
        </div>
    );
};

export default CreateProduct;
