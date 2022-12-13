import './App.css';
import { Form } from './components/form/Form';
import { Products } from './components/products/Products';
import { ContextProvider } from './context/productContext';

function App() {
	return (
		<ContextProvider>
			<div className='App'>
				<Form />
				<Products />
			</div>
		</ContextProvider>
	);
}

export default App;
