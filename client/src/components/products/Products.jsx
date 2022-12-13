import styles from './products.module.css';
import { useContext } from 'react';
import { ProductsContext } from '../../context/productContext';
const Products = () => {
	const { products, setProductEdit } = useContext(ProductsContext);

	const handleEdit = (product) => {
		setProductEdit(product);
	};

	if (!products) return <div>Waiting</div>;
	return (
		<section className={styles.section}>
			{products.map((product) => {
				return (
					<article key={product.id} className={styles.productContainer}>
						<img src={product.thumbnail} alt='product image' width={300} />
						<h2>{product.productName}</h2>
						<h3>${product.price}</h3>
						<div className={styles.actions}>
							<button onClick={() => handleEdit(product)}>EDIT</button>
							<button className={styles.delete}>DELETE</button>
						</div>
					</article>
				);
			})}
		</section>
	);
};

export { Products };
