import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    };

    return (
        <div className="flex justify-center items-center min-h-[800px]">
            <div>
                <div className="pb-4 flex justify-center text-3xl text-slate-700">
                    SIGN IN
                </div>
                <div className="border-solid border-2 rounded-md border-slate-100 min-h-[400px] min-w-[400px] p-16">
                    <div className="pb-8">
                        <input
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={state.email}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                    </div>
                    <div className="pb-12">
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={state.password}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                    </div>
                    <div className="flex justify-center pb-8">
                        <button className="loginbutton py-2 px-4 text-white font-bold">
                            LOGIN
                        </button>
                    </div>
                    <div className="flex justify-center">
                        Do you have an account?{" "}
                        <Link to="/signUp" className="pl-2 text-blue-500">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
