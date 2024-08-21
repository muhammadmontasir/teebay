import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

const DropdownComponent = ({ placeholder = 'Select', values, onSelect }) => {
    const [selectedValue, setSelectedValue] = useState(null);

    const handleSelect = (e) => {
        const value = e.value;
        setSelectedValue(value);
        onSelect(value);
    };

    return (
        <div className="card flex justify-center">
            <Dropdown
                value={selectedValue}
                options={values}
                optionLabel="name"
                placeholder={placeholder}
                className="w-full md:w-56"
                onChange={handleSelect}
            />
        </div>
    );
};

export default DropdownComponent;
