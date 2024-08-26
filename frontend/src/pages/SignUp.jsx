import React from 'react';
import Signupform from '../components/Signupform.jsx';

const SignupPage = () => {
    const initialData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
    };

    const handleRegister = (formData) => {
        console.log('Registered Data:', formData);
    };

    return (
        <Signupform initialData={initialData} onRegister={handleRegister} />
    );
};

export default SignupPage;
