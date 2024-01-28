import styles from './BeforeSearch.module.scss';

const BeforeSearch = ({ title }) => {
	return (
		<div className={styles.wrapper_before}>
			<div className={styles.block__description}>
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.description}>[Описание графика]</p>
				<p className={styles.detail}>Подробнее</p>
				<p className={styles.instruction}>
					Для отображения данных выберите необходимые параметры и нажмите кнопку
					«Запуск»
				</p>
			</div>
		</div>
	);
};

export default BeforeSearch;
