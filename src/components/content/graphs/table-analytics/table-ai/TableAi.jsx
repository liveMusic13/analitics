import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as dataForRequestAction } from '../../../../../store/data-for-request/dataForRequest.slice';
import { actions as popupAction } from '../../../../../store/popup/popup.slice';
import { truncateDescription } from '../../../../../utils/descriptionLength';
import styles from './TableAi.module.scss';

const TableAi = () => {
	const { get } = useSelector(state => state.aiData);
	const { texts_ids } = useSelector(state => state.dataForRequest);
	const dispatch = useDispatch();
	const data = useMemo(() => get, []);

	const columns = useMemo(
		() => [
			{
				id: 'Чекбокс',
				header: 'Чекбокс',
				// accessorKey: 'checkbox'
			},
			{
				id: 'Текст',
				header: 'Текст',
				accessorKey: 'text',
			},
			{
				id: 'Источник',
				header: 'Источник',
				accessorKey: 'hub',
			},
			{
				id: 'Аудитория',
				header: 'Аудитория',
				accessorKey: 'audienceCount',
			},
			{
				id: 'Комментариев',
				header: 'Комментариев',
				accessorKey: 'commentsCount',
			},
			{
				id: 'Вовлеченность',
				header: 'Вовлеченность',
				accessorKey: 'er',
			},
			// {
			// 	id: 'Ссылка',
			// 	header: 'Ссылка',
			// 	accessorKey: 'url',
			// 	// Cell: ({ value }) => (
			// 	// 	<a href={value} target='_blank' rel='noopener noreferrer'>
			// 	// 		ссылка
			// 	// 	</a>
			// 	// ),
			// 	// Cell: ({ value }) => (
			// 	// 	<span onClick={() => window.open(value, '_blank')}>ссылка</span>
			// 	// ),
			// },

			{
				id: 'Ссылка',
				header: 'Ссылка',
				accessorKey: 'url',
				Cell: ({ value }) => (
					<a href={value} target='_blank' rel='noopener noreferrer'>
						ссылка
					</a>
				),
			},
		],
		[],
	);

	const [columnVisibility, setColumnVisibility] = useState({});
	const [sorting, setSorting] = useState([]);
	const [filtering, setFiltering] = useState('');
	const countTableElemSize = [10, 15, 20];

	const tableInstance = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			sorting: sorting,
			globalFilter: filtering,
			columnVisibility: columnVisibility,
		},
		onSortingChange: setSorting,
		onGlobalFilterChange: setFiltering,
		onColumnVisibilityChange: setColumnVisibility,
	});

	// const [isFullText, setIsFullText] = useState({});

	return (
		<div className={styles.wrapper_table}>
			<div className={styles.table__header}>
				<div className={styles.header__topBlock}>
					<div className={styles.block__globalFilter}>
						<img src='../images/icons/input_button/search.svg' alt='search' />
						<input
							type='text'
							value={filtering}
							onChange={e => setFiltering(e.target.value)}
							placeholder='Поиск'
						/>
					</div>
					{/* <div className={styles.block__select}>
						<span>Количество элементов на странице</span>
						<select
							className={styles.select}
							value={tableInstance.options.state.pagination.pageSize}
							onChange={e => tableInstance.setPageSize(e.target.value)}
						>
							{countTableElemSize.map(pageSize => (
								<option key={pageSize} value={pageSize}>
									{pageSize}
								</option>
							))}
						</select>
					</div> */}
				</div>
				<div className={styles.block__hiddenColumns}>
					<label>
						<input
							{...{
								type: 'checkbox',
								checked: tableInstance.getIsAllColumnsVisible(),
								onChange: tableInstance.getToggleAllColumnsVisibilityHandler(),
							}}
						/>
						Все колонки
					</label>
					{tableInstance.getAllColumns().map(column => (
						<label key={column.id}>
							<input
								{...{
									type: 'checkbox',
									checked: column.getIsVisible(),
									onChange: column.getToggleVisibilityHandler(),
								}}
							/>
							{column.id}
						</label>
					))}
				</div>
			</div>
			<table>
				<thead>
					{tableInstance.getHeaderGroups().map(headerEl => {
						return (
							<tr key={headerEl.id}>
								{headerEl.headers.map(columnEl => (
									<th
										key={columnEl.id}
										colSpan={columnEl.colSpan}
										onClick={columnEl.column.getToggleSortingHandler()}
									>
										{flexRender(
											columnEl.column.columnDef.header,
											columnEl.getContext(),
										)}
										{/* HELP: СОРТИРОВКА КОЛОНОК */}
										{
											{ asc: ' \u2227', desc: ' \u2228' }[
												columnEl.column.getIsSorted() ?? null
											]
										}
									</th>
								))}
							</tr>
						);
					})}
				</thead>
				<tbody>
					{tableInstance.getRowModel().rows.map(rowEl => (
						<tr
							key={rowEl.id}
							// draggable
							// onDragStart={() => handleDragStart(rowEl.original)}
						>
							{rowEl.getVisibleCells().map(cellEl => {
								// console.log(cellEl.row.original.url, cellEl);
								if (cellEl.column.id === 'Ссылка') {
									return (
										<td key={cellEl.id}>
											<a href={cellEl.row.original.url} target='_blank'>
												Ссылка
											</a>
										</td>
									);
								} else if (cellEl.column.id === 'Чекбокс') {
									return (
										<td
											key={cellEl.id}
											style={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												height: '100%',
											}}
										>
											<input
												className={styles.input__checkbox}
												type='checkbox'
												// defaultChecked
												checked={texts_ids.some(
													elem => elem === rowEl.original.id,
												)}
												onChange={e => {
													if (e.target.checked) {
														console.log(rowEl.original.text);
														dispatch(
															dataForRequestAction.addTextsIds(
																rowEl.original.id,
															),
														);
													} else {
														dispatch(
															dataForRequestAction.deleteTextsIds(
																rowEl.original.id,
															),
														);
													}
												}}
											/>
										</td>
									);
								} else if (cellEl.column.id === 'Текст') {
									return (
										<td
											key={cellEl.id}
											onClick={() => {
												// setIsFullText({
												// 	...isFullText,
												// 	[rowEl.id]: !isFullText[rowEl.id],
												// });
												dispatch(popupAction.addText(rowEl.original.text));
												// if (!isFullText[rowEl.id])
												dispatch(popupAction.togglePopup(''));
											}}
											style={{ cursor: 'pointer' }}
										>
											{/* {isFullText[rowEl.id]
												? flexRender(
														cellEl.column.columnDef.cell,
														cellEl.getContext(),
													)
												: truncateDescription(rowEl.original.text, 150)} */}
											{truncateDescription(rowEl.original.text, 150)}
										</td>
									);
								} else {
									return (
										<td key={cellEl.id}>
											{flexRender(
												cellEl.column.columnDef.cell,
												cellEl.getContext(),
											)}
										</td>
									);
								}
							})}
						</tr>
					))}
				</tbody>
			</table>
			<div className={styles.block__allInput}>
				<input
					className={styles.input__checkbox}
					type='checkbox'
					// defaultChecked
					checked={texts_ids.length === get.length}
					onChange={() => {
						if (texts_ids.length === get.length) {
							dispatch(dataForRequestAction.deleteAllTextsIds(''));
						} else {
							dispatch(dataForRequestAction.addAllTextsIds(get));
						}
					}}
				/>
				<p className={styles.allInput__paragraph}>Выбрать все</p>
			</div>
			<div className={styles.block__pagination}>
				<button
					onClick={() => tableInstance.setPageIndex(0)}
					disabled={!tableInstance.getCanPreviousPage()}
				>
					{/* First page */} {'<<'}
				</button>
				<button
					onClick={() => tableInstance.previousPage()}
					disabled={!tableInstance.getCanPreviousPage()}
				>
					{/* Previous page */} {'<'}
				</button>
				<ul>
					<li>Страница: {tableInstance.options.state.pagination.pageIndex}</li>
					<li>Всего страниц: {tableInstance.getPageCount() - 1}</li>
				</ul>
				<input
					type='text'
					defaultValue={tableInstance.options.state.pagination.pageIndex}
					onChange={e => tableInstance.setPageIndex(e.target.value)}
				/>

				<div className={styles.block__select}>
					<span>Количество элементов на странице</span>
					<select
						className={styles.select}
						value={tableInstance.options.state.pagination.pageSize}
						onChange={e => tableInstance.setPageSize(e.target.value)}
					>
						{countTableElemSize.map(pageSize => (
							<option key={pageSize} value={pageSize}>
								{pageSize}
							</option>
						))}
					</select>
				</div>

				<button
					onClick={() => tableInstance.nextPage()}
					disabled={!tableInstance.getCanNextPage()}
				>
					{/* Next page */} {'>'}
				</button>

				<button
					onClick={() =>
						tableInstance.setPageIndex(tableInstance.getPageCount() - 1)
					}
					disabled={!tableInstance.getCanNextPage()}
				>
					{/* Last page */} {'>>'}
				</button>
			</div>
		</div>
	);
};

export default TableAi;

// import {
// 	flexRender,
// 	getCoreRowModel,
// 	getFilteredRowModel,
// 	getPaginationRowModel,
// 	getSortedRowModel,
// 	useReactTable,
// } from '@tanstack/react-table';
// import { useMemo, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { actions as dataForRequestAction } from '../../../../../store/data-for-request/dataForRequest.slice';
// import { actions as popupAction } from '../../../../../store/popup/popup.slice';
// import { truncateDescription } from '../../../../../utils/descriptionLength';
// import styles from './TableAi.module.scss';

// const TableAi = () => {
// 	const { get } = useSelector(state => state.aiData);
// 	const { texts_ids } = useSelector(state => state.dataForRequest);
// 	const dispatch = useDispatch();
// 	const data = useMemo(() => get, []);

// 	const columns = useMemo(
// 		() => [
// 			{
// 				id: 'Чекбокс',
// 				header: 'Чекбокс',
// 			},
// 			{
// 				id: 'Текст',
// 				header: 'Текст',
// 				accessorKey: 'text',
// 			},
// 			{
// 				id: 'Источник',
// 				header: 'Источник',
// 				accessorKey: 'hub',
// 				cell: ({ row }) => {
// 					const { url, hub } = row.original;
// 					return url ? (
// 						<a href={url} target='_blank' rel='noopener noreferrer'>
// 							{hub}
// 						</a>
// 					) : (
// 						hub
// 					);
// 				},
// 			},
// 			{
// 				id: 'Аудитория',
// 				header: 'Аудитория',
// 				accessorKey: 'audienceCount',
// 			},
// 			{
// 				id: 'Комментариев',
// 				header: 'Комментариев',
// 				accessorKey: 'commentsCount',
// 			},
// 			{
// 				id: 'Вовлеченность',
// 				header: 'Вовлеченность',
// 				accessorKey: 'er',
// 			},
// 		],
// 		[],
// 	);

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
// 										{
// 											{
// 												asc: ' \u2227',
// 												desc: ' \u2228',
// 											}[columnEl.column.getIsSorted() ?? null]
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
// 							{rowEl.getVisibleCells().map(cellEl => {
// 								// console.log(cellEl.row.original.url, cellEl);
// 								if (cellEl.column.id === 'Чекбокс') {
// 									return (
// 										<td
// 											key={cellEl.id}
// 											style={{
// 												display: 'flex',
// 												alignItems: 'center',
// 												justifyContent: 'center',
// 												height: '100%',
// 											}}
// 										>
// 											<input
// 												className={styles.input__checkbox}
// 												type='checkbox'
// 												checked={texts_ids.some(
// 													elem => elem === rowEl.original.id,
// 												)}
// 												onChange={e => {
// 													if (e.target.checked) {
// 														console.log(rowEl.original.text);
// 														dispatch(
// 															dataForRequestAction.addTextsIds(
// 																rowEl.original.id,
// 															),
// 														);
// 													} else {
// 														dispatch(
// 															dataForRequestAction.deleteTextsIds(
// 																rowEl.original.id,
// 															),
// 														);
// 													}
// 												}}
// 											/>
// 										</td>
// 									);
// 								} else if (cellEl.column.id === 'Текст') {
// 									return (
// 										<td
// 											key={cellEl.id}
// 											onClick={() => {
// 												dispatch(popupAction.addText(rowEl.original.text));
// 												dispatch(popupAction.togglePopup(''));
// 											}}
// 											style={{ cursor: 'pointer' }}
// 										>
// 											{truncateDescription(rowEl.original.text, 150)}
// 										</td>
// 									);
// 								} else {
// 									return (
// 										<td key={cellEl.id}>
// 											{flexRender(
// 												cellEl.column.columnDef.cell,
// 												cellEl.getContext(),
// 											)}
// 										</td>
// 									);
// 								}
// 							})}
// 						</tr>
// 					))}
// 				</tbody>
// 			</table>
// 			<div className={styles.block__allInput}>
// 				<input
// 					className={styles.input__checkbox}
// 					type='checkbox'
// 					checked={texts_ids.length === get.length}
// 					onChange={() => {
// 						if (texts_ids.length === get.length) {
// 							dispatch(dataForRequestAction.deleteAllTextsIds(''));
// 						} else {
// 							dispatch(dataForRequestAction.addAllTextsIds(get));
// 						}
// 					}}
// 				/>
// 				<p className={styles.allInput__paragraph}>Выбрать все</p>
// 			</div>
// 			<div className={styles.block__pagination}>
// 				<button
// 					onClick={() => tableInstance.setPageIndex(0)}
// 					disabled={!tableInstance.getCanPreviousPage()}
// 				>
// 					{'<<'}
// 				</button>
// 				<button
// 					onClick={() => tableInstance.previousPage()}
// 					disabled={!tableInstance.getCanPreviousPage()}
// 				>
// 					{'<'}
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

// 				<div className={styles.block__select}>
// 					<span>Количество элементов на странице</span>
// 					<select
// 						className={styles.select}
// 						value={tableInstance.options.state.pagination.pageSize}
// 						onChange={e => tableInstance.setPageSize(e.target.value)}
// 					>
// 						{countTableElemSize.map(pageSize => (
// 							<option key={pageSize} value={pageSize}>
// 								{pageSize}
// 							</option>
// 						))}
// 					</select>
// 				</div>

// 				<button
// 					onClick={() => tableInstance.nextPage()}
// 					disabled={!tableInstance.getCanNextPage()}
// 				>
// 					{'>'}
// 				</button>

// 				<button
// 					onClick={() =>
// 						tableInstance.setPageIndex(tableInstance.getPageCount() - 1)
// 					}
// 					disabled={!tableInstance.getCanNextPage()}
// 				>
// 					{'>>'}
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default TableAi;
