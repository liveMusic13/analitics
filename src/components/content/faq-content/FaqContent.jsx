import { faqData } from './faq.data';
import styles from './FaqContent.module.scss';
import Question from './question/Question';

const FaqContent = () => {
	return (
		<div className={styles.wrapper_faq}>
			<h2 className={styles.title}>FAQ</h2>
			<ul className={styles.menu}>
				{faqData.map(question => (
					<Question question={question} />
				))}
			</ul>
		</div>
	);
};

export default FaqContent;
