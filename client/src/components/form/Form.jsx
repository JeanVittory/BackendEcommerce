import styles from './form.module.css';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { ProductsContext } from '../../context/productContext';

const Form = () => {
	const [product, setProduct] = useState({
		productName: '',
		price: '',
		thumbnail: '',
	});
	const [disable, setDisable] = useState(false);
	const filesRef = useRef();

	const { productEdit, setProductEdit, updateProduct, addProduct } = useContext(ProductsContext);

	useEffect(() => {
		if (productEdit) {
			setProduct({
				productName: productEdit.productName,
				price: productEdit.price,
			});
			setDisable(!disable);
		} else {
			setDisable(!disable);
		}
	}, [productEdit]);

	useEffect(() => {
		if (product.productName === '' && product.price === '') {
			setProductEdit(null);
		}
	}, [product]);

	const handleAdd = (e) => {
		e.preventDefault();
		addProduct(product);
		filesRef.current.value = '';
		setProduct({
			productName: '',
			price: '',
			thumbnail: '',
		});
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		updateProduct({ ...product, id: productEdit.id });
		setProduct({
			productName: '',
			price: '',
			thumbnail: '',
		});
	};

	const handleProductName = (e) => {
		setProduct((prev) => {
			return {
				...prev,
				productName: e.target.value,
			};
		});
	};

	const handleProductPrice = (e) => {
		setProduct((prev) => {
			return {
				...prev,
				price: e.target.value,
			};
		});
	};

	const handleProductImage = (e) => {
		setProduct((prev) => {
			return {
				...prev,
				thumbnail: e.target.files,
			};
		});
	};

	return (
		<>
			<form className={styles.inputs}>
				<input
					type='text'
					placeholder='Product Name'
					onChange={handleProductName}
					value={product.productName}
				></input>
				<input
					type='text'
					placeholder='Price'
					onChange={handleProductPrice}
					value={product.price}
				></input>
				<input type='file' onChange={handleProductImage} ref={filesRef}></input>
				<div className={styles.buttons}>
					<button onClick={handleAdd} disabled={disable}>
						Add
					</button>
					<button onClick={handleUpdate}>Update</button>
				</div>
			</form>
		</>
	);
};

export { Form };
