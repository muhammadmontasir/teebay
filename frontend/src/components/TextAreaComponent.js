import React, { useState, useEffect } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';

const TextAreaComponent = ({ rows = 3, cols = 30, modelValue, onChange }) => {
    const [description, setDescription] = useState(modelValue);

    useEffect(() => {
        setDescription(modelValue);
    }, [modelValue]);

    const handleInput = (e) => {
        const value = e.target.value;
        setDescription(value);
        onChange(value); // Emit the updated value to the parent component
    };

    return (
        <div className="card flex justify-center">
            <InputTextarea
                value={description}
                onChange={handleInput}
                rows={rows}
                cols={cols}
                autoResize
            />
        </div>
    );
};

export default TextAreaComponent;
