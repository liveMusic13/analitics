import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useAuthPage } from '../../../hooks/useAuthPage';
import Layout from '../../layout/Layout';
import Button from '../../ui/button/Button';
import Field from '../../ui/field/Field';
import styles from './Auth.module.scss';

const Auth = () => {
	const { onSubmit, register, handleSubmit, errors } = useAuthPage();
	const { isAuth } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuth) navigate('/');
	}, [isAuth]);

	return (
		<Layout>
			<div className={styles.block__auth}>
				<img
					className={styles.logo__image}
					src='./images/full_logo.svg'
					alt='logo'
				/>
				<h2 className={styles.title}>Авторизация</h2>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<div className={styles.block__field}>
						<Field
							type='text'
							placeholder='Введите e-mail'
							register={register}
							auth={true}
							id='email'
							label='E-mail'
						/>
						{errors.email?.message && <span>{errors.email?.message}</span>}
					</div>
					<div className={styles.block__field}>
						<Field
							label='Пароль'
							auth={true}
							id='password'
							type='password'
							placeholder='Введите пароль'
							register={register}
						/>
						{errors.password && (
							<span>
								Неверный пароль. Повторите попытку ввода или обратитесь к
								администратору
							</span>
						)}
					</div>

					<Button type='submit'>Войти</Button>
				</form>
			</div>
		</Layout>
	);
};

export default Auth;
