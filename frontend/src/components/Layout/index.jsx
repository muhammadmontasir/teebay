import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="layout">
            {/* Header */}
            <header className="header bg-blue-600 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">My App</h1>
                    <nav>
                        <Link to="/" className="px-4">Home</Link>
                        <Link to="/products/create" className="px-4">Create Product</Link>
                    </nav>
                </div>
            </header>

            {/* Sidebar (optional) */}
            <aside className="sidebar bg-gray-100 w-64 p-4">
                <nav>
                    <ul>
                        <li>
                            <Link to="/products/list">Products</Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="content flex-1 p-4">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="footer bg-blue-600 text-white p-4 mt-auto">
                <div className="container mx-auto text-center">
                    © 2024 Tee-bay App. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
