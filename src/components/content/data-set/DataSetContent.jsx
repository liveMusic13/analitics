import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDataFolders } from '../../../hooks/useDataFolders';
import { actions as popupDeleteAction } from '../../../store/popup-delete/popupDelete.slice';
import { styleTarget } from '../../../utils/styles';
import styles from './DataSetContent.module.scss';
import Folder from './folder/Folder';
import NoData from './no-data/NoData';

const DataSetContent = () => {
	const dispatch = useDispatch();
	const tabOneRef = useRef(null);
	const tabTwoRef = useRef(null);
	const tabThreeRef = useRef(null);
	const [elementWidth, setElementWidth] = useState({
		one: 0,
		two: 0,
		three: 0,
	});
	const [buttonTarget, setButtonTarget] = useState('one');
	const { getDataFolders, getProcessedData } = useDataFolders();
	const { allData, processedData } = useSelector(state => state.folderTarget);

	useEffect(() => {
		if (buttonTarget === 'one') {
			getDataFolders();
			dispatch(popupDeleteAction.addButtonTarget(buttonTarget));
		} else if (buttonTarget === 'two') {
			getProcessedData();
			dispatch(popupDeleteAction.addButtonTarget(buttonTarget));
		} else {
			dispatch(popupDeleteAction.addButtonTarget(buttonTarget));
		}
	}, [buttonTarget]);

	useEffect(() => {
		if (tabOneRef.current) {
			const width = tabOneRef.current.offsetWidth;
			setElementWidth(prev => ({
				...prev,
				one: width,
			}));
		}
		if (tabTwoRef.current) {
			const width = tabTwoRef.current.offsetWidth;
			setElementWidth(prev => ({
				...prev,
				two: width,
			}));
		}
		if (tabThreeRef.current) {
			const width = tabThreeRef.current.offsetWidth;
			setElementWidth(prev => ({
				...prev,
				three: width,
			}));
		}
	}, []);

	const onClick = button => {
		if (button === 'one') {
			setButtonTarget('one');
		} else if (button === 'two') {
			setButtonTarget('two');
		} else {
			setButtonTarget('three');
		}
	};

	const [filterText, setFilterText] = useState('');
	const getFilteredData = (data, filterText) => {
		return (
			data &&
			data.values &&
			data.values.filter(folder =>
				folder.name.toLowerCase().includes(filterText.toLowerCase()),
			)
		);
	};

	const filteredData = useMemo(() => {
		if (buttonTarget === 'one') {
			return getFilteredData(allData, filterText);
		} else if (buttonTarget === 'two') {
			return getFilteredData(processedData, filterText);
		} else {
			return [];
		}
	}, [buttonTarget, allData, processedData, filterText]);
	// const filteredData =
	// 	allData &&
	// 	allData.values &&
	// 	allData.values.filter(folder =>
	// 		folder.name.toLowerCase().includes(filterText.toLowerCase()),
	// 	);
	const handleInputChange = event => {
		setFilterText(event.target.value);
	};

	const renderContent = (buttonTarget, allData) => {
		if (buttonTarget === 'one') {
			return (
				<>
					{allData && allData.values && allData.values.length !== 0 ? (
						allData.values.map(folder => (
							<Folder
								key={Math.random() + Math.random()}
								folder={folder}
								processedFolder={false}
								buttonTarget={buttonTarget}
							/>
						))
					) : (
						<NoData />
					)}
				</>
			);
		} else if (buttonTarget === 'two') {
			return (
				<>
					{
						// processedData &&
						// processedData.values &&
						// processedData.values.length !== 0 ? (
						// 	processedData.values.map(folder => (
						// 		<Folder
						// 			key={Math.random() + Math.random()}
						// 			folder={folder}
						// 			processedFolder={true}
						// 			buttonTarget={buttonTarget}
						// 		/>
						// 	))
						allData && allData.values && allData.values.length !== 0 ? (
							allData.values.map(folder => (
								<Folder
									key={Math.random() + Math.random()}
									folder={folder}
									processedFolder={true}
									buttonTarget={buttonTarget}
								/>
							))
						) : (
							<div className={styles.block__noDat}>
								<h2 className={styles.title}>Здесь пока ничего нет</h2>
								<p className={styles.description}>
									Чтобы получить обработанные файлы для загрузки в Embedding
									Projector нужно загрузить исходные файлы в разделе <br />
									<span>Файлы для обработки</span>
								</p>
								<button onClick={() => onClick('one')}>Перейти в раздел</button>
							</div>
						)
					}
				</>
			);
		}
		// else {
		// 	return (
		// 		<iframe
		// 			src='https://projector.tensorflow.org/'
		// 			width='100%'
		// 			height='calc(600/1000*100vh)'
		// 			style={{ border: 'none' }}
		// 			title='TensorFlow Projector'
		// 		></iframe>
		// 	);
		// }
	};

	const styleContent = {
		justifyContent:
			allData && allData.values && allData.values.length !== 0 ? '' : 'center',
		alignItems:
			allData && allData.values && allData.values.length !== 0 ? '' : 'center',
		paddingTop:
			buttonTarget === 'three' ? 'calc(24/1440*100vw)' : 'calc(92/1440*100vw)',
		paddingRight: buttonTarget === 'three' ? '0px' : 'calc(44/1440*100vw)',
	};

	return (
		<div className={styles.wrapper_dataSet}>
			<div className={styles.block__tabs}>
				<button
					ref={tabOneRef}
					className={styles.tab__button}
					onClick={() => onClick('one')}
				>
					Файлы данных
				</button>
				<button
					ref={tabTwoRef}
					className={styles.tab__button}
					onClick={() => onClick('two')}
				>
					Файлы кластеризации авторов
				</button>
				{/* <button
					ref={tabThreeRef}
					className={styles.tab__button}
					onClick={() => onClick('three')}
				>
					Embedding Projector
				</button> */}
				<div
					className={styles.block__target}
					style={styleTarget(elementWidth, buttonTarget)}
				></div>
			</div>
			<div
				className={styles.block__content}
				style={
					// allData && allData.values && allData.values.length !== 0
					// 	? {}
					// 	: { justifyContent: 'center', alignItems: 'center' }
					styleContent
				}
			>
				{!(buttonTarget === 'three') && (
					<div className={styles.block__field}>
						<img
							src='/images/icons/input_button/search.svg'
							alt='search'
							className={styles.image__search}
						/>
						<input
							type='text'
							className={styles.input__search}
							placeholder='Поиск по названию'
							value={filterText}
							onChange={handleInputChange}
						/>
					</div>
				)}
				{/* {renderContent(buttonTarget, allData)} */}
				{renderContent(buttonTarget, { values: filteredData })}
			</div>
		</div>
	);
};

export default DataSetContent;
