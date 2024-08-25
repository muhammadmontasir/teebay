import React, { useState, useEffect } from 'react';
import { MultiSelect } from 'primereact/multiselect';

const MultiSelectDropDown = ({ inputFieldWidth, categories, placeholder = 'Select', value = [], onSelect }) => {
    const [selectedCategories, setSelectedCategories] = useState(value);

    useEffect(() => {
        setSelectedCategories(value);
    }, [value]);

    const handleChange = (e) => {
        setSelectedCategories(e.value);
        onSelect(e.value);
    };

    return (
        <div className="card flex justify-center">
            <MultiSelect
                value={selectedCategories}
                options={categories}
                optionLabel="name"
                filter
                placeholder={placeholder}
                maxSelectedLabels={3}
                className="w-full md:w-80"
                style={{ width: inputFieldWidth }}
                onChange={handleChange}
            />
        </div>
    );
};

export default MultiSelectDropDown;
