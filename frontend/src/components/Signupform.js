import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import './YourStyles.css'; // Assuming you have a CSS file for styles

const Signupform = ({ initialData, onRegister }) => {
    const [formData, setFormData] = useState({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        address: initialData.address || '',
        password: initialData.password || '',
        confirmPassword: initialData.confirmPassword || '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegister = () => {
        onRegister(formData);
    };

    return (
        <div>
            <div className="border-solid border-2 rounded-md border-slate-100 min-h-[600px] min-w-[800px] p-16">
                <div className="flex justify-center">
                    <div className="pb-8 pr-6">
                        <InputText
                            value={formData.firstName}
                            onChange={handleInputChange}
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                        />
                    </div>
                    <div className="pb-8">
                        <InputText
                            value={formData.lastName}
                            onChange={handleInputChange}
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                        />
                    </div>
                </div>
                <div className="pb-8 flex justify-center">
                    <InputText
                        value={formData.address}
                        onChange={handleInputChange}
                        name="address"
                        type="text"
                        placeholder="Address"
                        style={{ width: '86%' }}
                    />
                </div>
                <div className="flex justify-center">
                    <div className="pb-8 pr-6">
                        <InputText
                            value={formData.email}
                            onChange={handleInputChange}
                            name="email"
                            type="text"
                            placeholder="Email"
                        />
                    </div>
                    <div className="pb-8">
                        <InputText
                            value={formData.phone}
                            onChange={handleInputChange}
                            name="phone"
                            type="text"
                            placeholder="Phone Number"
                        />
                    </div>
                </div>
                <div className="pb-8 flex justify-center">
                    <InputText
                        value={formData.password}
                        onChange={handleInputChange}
                        name="password"
                        type="password"
                        placeholder="Password"
                        style={{ width: '86%' }}
                    />
                </div>
                <div className="pb-8 flex justify-center">
                    <InputText
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        style={{ width: '86%' }}
                    />
                </div>
                <div className="flex justify-center pb-4">
                    <Button label="Register" className="loginbutton" onClick={handleRegister} />
                </div>
                <div className="flex justify-center">
                    Already have an account?
                    <Link to="/" className="pl-2 text-blue-500"> Sign In </Link>
                </div>
            </div>
        </div>
    );
};

export default Signupform;
