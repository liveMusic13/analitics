import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import TableAi from './table-ai/TableAi';
import TableAiPost from './table-ai/TableAiPost';
import styles from './TableAnalytics.module.scss';

const TableAnalytics = () => {
	const { post } = useSelector(state => state.aiData);
	const { infoAboutPost } = useSelector(state => state.dataForRequest);

	useEffect(() => {}, [infoAboutPost]);

	return (
		<div className={styles.block__table}>
			{infoAboutPost && (
				<p className={styles.info}>
					Начался процесс анализа сообщений. Более подробно о процессе, можете
					узнать в личном кабинете.
				</p>
			)}
			{post.texts.length === 0 ? <TableAi /> : <TableAiPost />}
		</div>
	);
};

export default TableAnalytics;
