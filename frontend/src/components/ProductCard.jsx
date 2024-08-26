import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal.jsx';

const ProductCard = ({ product, onDelete }) => {
    const [seeMore, setSeeMore] = useState(false);

    const truncatedDescription = product.description.length > 200 && !seeMore
        ? product.description.slice(0, 100) + "..."
        : product.description;

    const formattedCategories = product?.category.value;

    const seeValue = seeMore ? "See Less" : "See More";

    const handleDelete = () => {
        onDelete(product.id);
        console.log("card delete", product.id);
    };

    return (
        <div className="pb-8">
            <div className="border-solid border-2 rounded-md border-slate-100 min-h-[300px] max-w-[700px] p-8">
                <div className="grid grid-cols-5">
                    <div className="col-span-4">
                        <Link to={`/products/edit/${product.id}`} className="link">
                            <div>
                                <div className="pb-4 text-2xl text-slate-700">
                                    {product.title}
                                </div>
                                <div className="pb-4 text-sm text-slate-500">
                                    <span className="pr-1">{"Categories: "}</span>
                                    <span>{formattedCategories}</span>
                                </div>
                                <div className="pb-4 text-sm text-slate-500">
                                    <span className="pr-1">{"Price: "}</span>
                                    {product.price}
                                    {product.rentPrice && (
                                        <>
                                            | Rent: <span className="pr-1">{product.rentPrice}</span>
                                            <span>{product.rentType?.name}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Link>
                        <div className="pt-5 text-slate-700">
                            {truncatedDescription}
                            {product.description.length > 150 && (
                                <span className="text-blue-600" onClick={() => setSeeMore(!seeMore)}>
                                    {seeValue}
                                </span>
                            )}
                        </div>
                        <div className="pt-8 text-sm text-slate-500">
                            <span className="pr-1">{"Date Posted: "}</span>
                            {product.createdAt}
                        </div>
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className="flex justify-end">
                            <Modal
                                title="Are you sure you want to delete this product?"
                                productId={product.id}
                                onDelete={handleDelete}
                            />
                        </div>
                        <div className="flex justify-end">
                            <div className="pt-8 text-sm text-slate-500">
                                {product.views} <span>{"views"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
