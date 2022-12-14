import { createContext } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductsContext = createContext({});

const ContextProvider = ({ children }) => {
	const [products, setProducts] = useState();
	const [productEdit, setProductEdit] = useState();

	useEffect(() => {
		getProducts();
	}, []);

	const getProducts = () => {
		axios.get('http://localhost:8080/api/v1/productos').then((result) => setProducts(result.data));
	};

	const addProduct = async (product) => {
		const formDataResponse = formDataBuilder(product);
		await axios.post('http://localhost:8080/api/v1/productos/', formDataResponse);
		getProducts();
	};

	const formDataBuilder = ({ productName, price, thumbnail }) => {
		const formData = new FormData();
		formData.append('image', thumbnail[0]);
		formData.append('productName', productName);
		formData.append('price', price);
		return formData;
	};

	const updateProduct = async (product) => {
		const { id, productName, price, thumbnail } = product;
		await axios.put(`http://localhost:8080/api/v1/productos/${id}`, {
			productName,
			price,
			thumbnail,
		});
		getProducts();
	};

	const deleteProduct = (id) => {
		axios
			.delete(`http://localhost:8080/api/v1/productos/${id}`)
			.then((response) => console.log(response));
		getProducts();
	};
	return (
		<ProductsContext.Provider
			value={{
				products,
				setProducts,
				productEdit,
				setProductEdit,
				updateProduct,
				deleteProduct,
				addProduct,
			}}
		>
			{children}
		</ProductsContext.Provider>
	);
};

export { ContextProvider, ProductsContext };
