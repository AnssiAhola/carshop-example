import { useState, useEffect, useRef } from 'react';
import { CarService } from './../CarService';
import { AgGridReact } from 'ag-grid-react';
import { Card, Grid, TextField, InputAdornment, Tooltip } from '@material-ui/core';
import { Search, DeleteForeverOutlined } from '@material-ui/icons';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import IconButton from '@material-ui/core/IconButton';
import AddCar from './AddCar';
import EditCar from './EditCar';

export default function CarList() {
	const [ cars, setCars ] = useState([]);

	useEffect(() => getCars(), []);

	const getCars = async () => CarService.GetAll().then((data) => setCars(data));

	const deleteCar = (url) => {
		if (window.confirm('Are you Sure?')) {
			CarService.Delete(url).then(() => getCars());
		}
	};

	const addCar = (car) => CarService.Add(car).then(getCars());
	const updateCar = (car) => CarService.Update(car).then(getCars());

	const actionsCellRenderer = (params) => (
		<div>
			<Tooltip title="Delete">
				<IconButton
					onClick={() => deleteCar(params.data._links.self.href)}
					style={{ padding: 4 }}
				>
					<DeleteForeverOutlined />
				</IconButton>
			</Tooltip>
			<EditCar self={params.data} updateCar={updateCar} />
		</div>
	);

	const columns = [
		{ headerName: 'Brand', field: 'brand', sort: 'asc' },
		{ headerName: 'Model', field: 'model' },
		{ headerName: 'Color', field: 'color' },
		{ headerName: 'Fuel', field: 'fuel' },
		{ headerName: 'Year', field: 'year' },
		{ headerName: 'Price', field: 'price' },
		{
			headerName: 'Actions',
			cellRendererFramework: actionsCellRenderer
		}
	];

	const [ quickFilter, setQuickFilter ] = useState('');
	const ref = useRef();
	const gridOptions = {
		defaultColDef: {
			flex: 1,
			sortable: true,
			resizeable: true,
			filter: true
		},
		pagination: true,
		paginationPageSize: 10,
		columnDefs: columns,
		animateRows: true
	};

	return (
		<div>
			<Card
				className="ag-theme-material"
				style={{
					minHeight: 500,
					margin: 30
				}}
			>
				<Grid container>
					<TextField
						style={{
							margin: 10
						}}
						value={quickFilter}
						onChange={(e) => setQuickFilter(e.target.value)}
						placeholder="Search"
						InputProps={{
							startAdornment: (
								<InputAdornment>
									<Search />
								</InputAdornment>
							)
						}}
					/>
					<AddCar addCar={addCar} />
				</Grid>
				<AgGridReact
					domLayout="autoHeight"
					quickFilterText={quickFilter}
					ref={ref}
					onGridReady={(params) => (ref.current = params.api)}
					rowSelection="single"
					gridOptions={gridOptions}
					rowData={cars}
				/>
			</Card>
		</div>
	);
}
