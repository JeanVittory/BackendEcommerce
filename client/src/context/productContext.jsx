import { createContext } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductsContext = createContext({});

const ContextProvider = ({ children }) => {
	const [products, setProducts] = useState();
	const [productEdit, setProductEdit] = useState();

	useEffect(() => {
		axios.get('http://localhost:8080/api/v1/productos').then((result) => setProducts(result.data));
	}, []);

	const updateProduct = async (product) => {
		const { id, productName, price, thumbnail } = product;
		await axios.put(`http://localhost:8080/api/v1/productos/${id}`, {
			productName,
			price,
			thumbnail,
		});
	};
	return (
		<ProductsContext.Provider
			value={{ products, setProducts, productEdit, setProductEdit, updateProduct }}
		>
			{children}
		</ProductsContext.Provider>
	);
};

export { ContextProvider, ProductsContext };
