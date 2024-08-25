import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { InputTextarea } from 'primereact/inputtextarea';

const MultiPageForm = ({ initialPage = 0, categories, rentTypes, onSubmit }) => {
    const [page, setPage] = useState(initialPage);
    const [product, setProduct] = useState({
        title: '',
        categories: [],
        price: '',
        rentPrice: '',
        rentType: '',
        description: '',
        createdAt: '',
        views: 0,
    });

    const title = (() => {
        switch (page) {
            case 0: return "Select a title for your product";
            case 1: return "Select categories";
            case 2: return "Select Description";
            case 3: return "Select Price";
            case 4: return "Summary";
            default: return "";
        }
    })();

    const handlePageChange = (direction) => {
        if (direction === 'back') {
            setPage(page - 1);
        } else {
            setPage(page === 4 ? page : page + 1);
        }
    };

    const handleCategorySelect = (selectedCategories) => {
        setProduct({ ...product, categories: selectedCategories });
    };

    const handleRentPeriodSelect = (selectedRentType) => {
        setProduct({ ...product, rentType: selectedRentType.name });
    };

    const handleSubmit = () => {
        if (page === 4) {
            onSubmit(product);
        } else {
            handlePageChange('next');
        }
    };

    return (
        <div className="p-16">
            <div className={`flex text-2xl pb-4 font-bold text-slate-900 ${page === 4 ? 'justify-start' : 'justify-center'}`}>
                <h2>{title}</h2>
            </div>

            {page === 0 && (
                <div>
                    <div className="pb-14">
                        <InputText
                            value={product.title}
                            onChange={(e) => setProduct({ ...product, title: e.target.value })}
                            type="text"
                            style={{ width: '600px' }}
                        />
                    </div>
                    <div className="flex justify-end" style={{ minWidth: '700px' }}>
                        <Button label="Next" className="button" onClick={() => handlePageChange('next')} />
                    </div>
                </div>
            )}

            {page === 1 && (
                <div>
                    <div className="pb-14">
                        <MultiSelect
                            value={product.categories}
                            options={categories}
                            onChange={(e) => handleCategorySelect(e.value)}
                            optionLabel="name"
                            style={{ width: '600px' }}
                            placeholder="Select a category"
                        />
                    </div>
                </div>
            )}

            {page === 2 && (
                <div>
                    <div className="pb-14">
                        <InputTextarea
                            value={product.description}
                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            rows={7}
                            cols={60}
                        />
                    </div>
                </div>
            )}

            {page === 3 && (
                <div>
                    <div className="pb-8 flex justify-center">
                        <InputText
                            value={product.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            type="text"
                            placeholder="Purchase price"
                            style={{ width: '300px' }}
                        />
                    </div>
                    <div className="pb-24 flex gap-3 justify-center">
                        <InputText
                            value={product.rentPrice}
                            onChange={(e) => setProduct({ ...product, rentPrice: e.target.value })}
                            type="text"
                            style={{ width: '70px' }}
                        />
                        <Dropdown
                            value={product.rentType}
                            options={rentTypes}
                            onChange={(e) => handleRentPeriodSelect(e.value)}
                            placeholder="Select Option"
                            optionLabel="name"
                        />
                    </div>
                </div>
            )}

            {page === 4 && (
                <div>
                    <div className="pb-12">
                        <div className="pb-6 text-lg text-slate-800">{`Title: ${product.title}`}</div>
                        <div className="pb-6 text-lg text-slate-800">{`Categories: ${product.categories.map(c => c.name).join(', ')}`}</div>
                        <div className="pb-6 text-lg text-slate-800">{`Description: ${product.description}`}</div>
                        <div className="pb-6 text-lg text-slate-800">{`Price: ${product.price}, To ${product.rentPrice} ${product.rentType}`}</div>
                    </div>
                </div>
            )}

            {page !== 0 && (
                <div className="flex justify-between" style={{ minWidth: '700px' }}>
                    <Button label="Back" className="button" onClick={() => handlePageChange('back')} />
                    <Button label={page === 4 ? 'Submit' : 'Next'} className="button" onClick={handleSubmit} />
                </div>
            )}
        </div>
    );
};

export default MultiPageForm;
