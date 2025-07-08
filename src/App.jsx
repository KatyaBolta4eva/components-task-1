import { useState } from 'react';
import styles from './App.module.css';

function App() {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	const [isValueVaild, setIsValueValid] = useState(false);

	const now = new Date();

	const formatDate = (date) => {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}.${month}.${year}`;
	};

	const errorBlock = <div className={styles.error}>{error}</div>;

	const emptyListBlock = (
		<p className={styles.noMarginText}>Нет добавленных элементов</p>
	);

	const onInputButtonClick = () => {
		const promptValue = prompt('введите текст');
		if (promptValue.length < 3) {
			setIsValueValid(false);
			return setError('Введенное значение должно содержать минимум 3 символа');
		}

		setIsValueValid(true);
		setValue(promptValue);
		setError('');
	};

	const onAddButtonClick = () => {
		if (!isValueVaild) {
			return;
		}
		const newItem = { id: Date.now(), text: value };
		setList([...list, newItem]);
		setValue('');
		setError('');
	};

	return (
		<>
			<div className={styles.app}>
				<h1 className={styles.pageHeading}>Ввод значения</h1>
				<p className={styles.noMarginText}>
					Текущее значение <code>value</code>: "
					<output className={styles.currentValue}>{value}</output>"
				</p>
				{error ? errorBlock : null}
				<div className={styles.buttonsContainer}>
					<button onClick={onInputButtonClick} className={styles.button}>
						Ввести новое
					</button>
					<button
						onClick={onAddButtonClick}
						className={styles.button}
						disabled={!isValueVaild}
					>
						Добавить в список
					</button>
				</div>
				<div className={styles.listContainer}>
					<h2 className={styles.listHeading}>Список:</h2>
					{list.length === 0 ? emptyListBlock : null}
					<ul className={styles.list}>
						{list.map(({ id, text }) => (
							<li className={styles.listItem} key={id}>
								{text} {formatDate(now)} {now.toLocaleTimeString()}
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}

export default App;
