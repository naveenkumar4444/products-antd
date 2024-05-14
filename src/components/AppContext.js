import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(null);

    const addProduct = (newProduct) => {
        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    const deleteProduct = (productId) => {
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    const editProduct = (productId, updatedProduct) => {
        const updatedProducts = products.map(product =>
            product.id === productId ? { ...product, ...updatedProduct } : product
        );
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };


    useEffect(() => {
        const storedProducts = localStorage.getItem('products');

        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        } else {
            const sampleProducts = [
                { id: 1, category: 'Electronics', name: 'Laptop', description: 'Thin and light laptop', price: 999 },
                { id: 2, category: 'Clothing', name: 'T-Shirt', description: 'Cotton T-shirt', price: 20 },
                { id: 3, category: 'Electronics', name: 'Smartphone', description: 'High-end smartphone', price: 799 },
                { id: 4, category: 'Books', name: 'Python Programming', description: 'Learn Python programming', price: 30 },
            ];
            setProducts(sampleProducts);
            localStorage.setItem('products', JSON.stringify(sampleProducts));
        }
    }, []);

    useEffect(() => {
        setCategories(Array.from(new Set(products.map(product => product.category))))
    }, [products]);

    return (
        <AppContext.Provider value={{ products, setProducts, categories, addProduct, deleteProduct, editProduct }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
