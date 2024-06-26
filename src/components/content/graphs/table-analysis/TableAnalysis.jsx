// import {
// 	flexRender,
// 	getCoreRowModel,
// 	getFilteredRowModel,
// 	getPaginationRowModel,
// 	getSortedRowModel,
// 	useReactTable,
// } from '@tanstack/react-table';
// import { useMemo, useState } from 'react';
// import { useSelector } from 'react-redux';
// import styles from './TableAnalysis.module.scss';

// const TableAnalysis = () => {
// 	const { values } = useSelector(state => state.themesData);

// 	const data = useMemo(() => values, []);

// 	const columns = useMemo(
// 		() => [
// 			{
// 				id: 'Тематика',
// 				header: 'Тематика',
// 				accessorKey: 'description',
// 			},
// 			{
// 				id: 'Количество',
// 				header: 'Количество',
// 				accessorKey: 'count',
// 			},
// 			{
// 				id: 'Аудитория',
// 				header: 'Аудитория',
// 				accessorKey: 'audience',
// 			},
// 			{
// 				id: 'Вовлеченность',
// 				header: 'Вовлеченность',
// 				accessorKey: 'er',
// 			},
// 			{
// 				id: 'Просмотров',
// 				header: 'Просмотров',
// 				accessorKey: 'viewsCount',
// 			},
// 			{
// 				id: 'Текст',
// 				header: 'Текст',
// 				accessorKey: 'texts',
// 			},
// 		],
// 		[],
// 	);

// 	const [valueCategories, setValueCategories] = useState('');
// 	const [columnVisibility, setColumnVisibility] = useState({});
// 	const [sorting, setSorting] = useState([]);
// 	const [filtering, setFiltering] = useState('');
// 	const countTableElemSize = [10, 15, 20];

// 	const tableInstance = useReactTable({
// 		columns,
// 		data,
// 		getCoreRowModel: getCoreRowModel(),
// 		getSortedRowModel: getSortedRowModel(),
// 		getFilteredRowModel: getFilteredRowModel(),
// 		getPaginationRowModel: getPaginationRowModel(),
// 		state: {
// 			sorting: sorting,
// 			globalFilter: filtering,
// 			columnVisibility: columnVisibility,
// 		},
// 		onSortingChange: setSorting,
// 		onGlobalFilterChange: setFiltering,
// 		onColumnVisibilityChange: setColumnVisibility,
// 	});

// 	return (
// 		<div className={styles.wrapper_table}>
// 			<div className={styles.table__header}>
// 				<div className={styles.header__topBlock}>
// 					<div className={styles.block__globalFilter}>
// 						<img src='../images/icons/input_button/search.svg' alt='search' />
// 						<input
// 							type='text'
// 							value={filtering}
// 							onChange={e => setFiltering(e.target.value)}
// 							placeholder='Поиск'
// 						/>
// 					</div>
// 					<div className={styles.block__select}>
// 						<span>Количество элементов на странице</span>
// 						<select
// 							className={styles.select}
// 							value={tableInstance.options.state.pagination.pageSize}
// 							onChange={e => tableInstance.setPageSize(e.target.value)}
// 						>
// 							{countTableElemSize.map(pageSize => (
// 								<option key={pageSize} value={pageSize}>
// 									{pageSize}
// 								</option>
// 							))}
// 						</select>
// 					</div>
// 					<div className={styles.block__categories}>
// 						<button>+</button>

// 						<input
// 							type='text'
// 							value={valueCategories}
// 							onChange={e => setValueCategories(e.target.value)}
// 							placeholder='Название тематики'
// 						/>
// 					</div>
// 				</div>
// 				<div className={styles.block__hiddenColumns}>
// 					<label>
// 						<input
// 							{...{
// 								type: 'checkbox',
// 								checked: tableInstance.getIsAllColumnsVisible(),
// 								onChange: tableInstance.getToggleAllColumnsVisibilityHandler(),
// 							}}
// 						/>
// 						Все колонки
// 					</label>
// 					{tableInstance.getAllColumns().map(column => (
// 						<label key={column.id}>
// 							<input
// 								{...{
// 									type: 'checkbox',
// 									checked: column.getIsVisible(),
// 									onChange: column.getToggleVisibilityHandler(),
// 								}}
// 							/>
// 							{column.id}
// 						</label>
// 					))}
// 				</div>
// 			</div>

// 			<table>
// 				<thead>
// 					{tableInstance.getHeaderGroups().map(headerEl => {
// 						return (
// 							<tr key={headerEl.id}>
// 								{headerEl.headers.map(columnEl => (
// 									<th
// 										key={columnEl.id}
// 										colSpan={columnEl.colSpan}
// 										onClick={columnEl.column.getToggleSortingHandler()}
// 									>
// 										{flexRender(
// 											columnEl.column.columnDef.header,
// 											columnEl.getContext(),
// 										)}
// 										{/* HELP: СОРТИРОВКА КОЛОНОК */}
// 										{
// 											{ asc: ' \u2227', desc: ' \u2228' }[
// 												columnEl.column.getIsSorted() ?? null
// 											]
// 										}
// 									</th>
// 								))}
// 							</tr>
// 						);
// 					})}
// 				</thead>
// 				<tbody>
// 					{tableInstance.getRowModel().rows.map(rowEl => (
// 						<tr key={rowEl.id}>
// 							{rowEl.getVisibleCells().map(cellEl => (
// 								<td key={cellEl.id}>
// 									{flexRender(
// 										cellEl.column.columnDef.cell,
// 										cellEl.getContext(),
// 									)}
// 								</td>
// 							))}
// 						</tr>
// 					))}
// 				</tbody>
// 			</table>
// 			<div className={styles.block__pagination}>
// 				<button
// 					onClick={() => tableInstance.setPageIndex(0)}
// 					disabled={!tableInstance.getCanPreviousPage()}
// 				>
// 					First page
// 				</button>
// 				<button
// 					onClick={() => tableInstance.previousPage()}
// 					disabled={!tableInstance.getCanPreviousPage()}
// 				>
// 					Previous page
// 				</button>
// 				<ul>
// 					<li>Страница: {tableInstance.options.state.pagination.pageIndex}</li>
// 					<li>Всего страниц: {tableInstance.getPageCount() - 1}</li>
// 				</ul>
// 				<input
// 					type='text'
// 					defaultValue={tableInstance.options.state.pagination.pageIndex}
// 					onChange={e => tableInstance.setPageIndex(e.target.value)}
// 				/>
// 				<button
// 					onClick={() => tableInstance.nextPage()}
// 					disabled={!tableInstance.getCanNextPage()}
// 				>
// 					Next page
// 				</button>

// 				<button
// 					onClick={() =>
// 						tableInstance.setPageIndex(tableInstance.getPageCount() - 1)
// 					}
// 					disabled={!tableInstance.getCanNextPage()}
// 				>
// 					Last page
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default TableAnalysis;

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as themesDataAction } from '../../../../store/themes-data/themesData.slice';
import Table from './table/Table';
import styles from './TableAnalysis.module.scss';

const TableAnalysis = () => {
	const { categories } = useSelector(state => state.themesData);
	const [valueCategories, setValueCategories] = useState('');
	const [draggedData, setDraggedData] = useState(null);
	const dispatch = useDispatch();
	const [viewTable, setViewTable] = useState(true);

	const handleDragStart = data => {
		setDraggedData(data);
	};

	const handleDrop = event => {
		event.preventDefault();

		if (draggedData) {
			const buttonText = event.target.innerText; // Получаем текст кнопки
			const payload = {
				text: buttonText,
				data: draggedData,
			};

			dispatch(themesDataAction.addObject(payload)); // Добавляем данные в массив кнопки //TODO: ЗДЕСЬ ЗАДИСПАТЧИТЬ В СТОР РЕДАКСА
			setDraggedData(null); // Сбрасываем перетаскиваемые данные
		}
	};

	const addNewData = event => {
		const target = event.target.innerText;
		dispatch(themesDataAction.addThemesData(categories[target]));
		setViewTable(false);

		const timeoutId = setTimeout(() => {
			setViewTable(true);
		}, 500);

		return () => clearTimeout(timeoutId);
	};

	return (
		<div className={styles.block__table}>
			{viewTable && (
				<Table
					valueCategories={valueCategories}
					setValueCategories={setValueCategories}
					handleDragStart={handleDragStart}
					draggedData={draggedData}
					setDraggedData={setDraggedData}
				/>
			)}

			<div className={styles.block__categories}>
				{Object.keys(categories).map(themes => (
					<button
						key={Math.random()}
						onDrop={handleDrop}
						onDragOver={e => e.preventDefault()}
						onClick={addNewData}
					>
						{themes}
					</button>
				))}
			</div>
		</div>
	);
};

export default TableAnalysis;
