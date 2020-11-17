import { useState, useEffect, useRef, Fragment } from 'react';
import { CarService } from './../CarService';
import { AgGridReact } from 'ag-grid-react';
import { Card, Grid, TextField, InputAdornment, Tooltip } from '@material-ui/core';
import { Search, DeleteForeverOutlined, GetAppOutlined } from '@material-ui/icons';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import IconButton from '@material-ui/core/IconButton';
import AddCar from './AddCar';
import EditCar from './EditCar';

export default function CarList() {
	const [ cars, setCars ] = useState([]);

	const [ quickFilter, setQuickFilter ] = useState('');
	const ref = useRef();

	useEffect(() => getCars(), []);

	const getCars = () => CarService.GetAll().then((data) => setCars(data._embedded.cars));

	const deleteCar = (url) => {
		if (window.confirm('Are you Sure?')) {
			CarService.Delete(url).then(() => getCars());
		}
	};

	const addCar = (car) => CarService.Add(car).then(getCars);
	// Updating row data causes a warning "unstable_flushDiscreteUpdates"
	// Set to be fixed in the next ag-Grid update
	// (issue: AG-4049) https://www.ag-grid.com/ag-grid-pipeline/
	const updateCar = (car) => CarService.Update(car).then(() => getCars());

	const exportToCsv = () => {
		ref.current.exportDataAsCsv();
	};

	const actionsCellRenderer = (params) => (
		<Fragment>
			<Tooltip title="Delete">
				<IconButton
					onClick={() => deleteCar(params.data._links.self.href)}
					style={{ padding: 4 }}
				>
					<DeleteForeverOutlined />
				</IconButton>
			</Tooltip>
			<EditCar self={params.data} updateCar={updateCar} />
		</Fragment>
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
		<Fragment>
			<Card
				className="ag-theme-material"
				style={{
					minHeight: 500,
					margin: 30
				}}
			>
				<Grid container direction="row" justify="space-between">
					<Grid item>
						<TextField
							style={{
								margin: 15
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
					</Grid>
					<Grid
						item
						style={{
							margin: 5
						}}
					>
						<AddCar addCar={addCar} />
					</Grid>
					<Grid
						item
						style={{
							margin: 10
						}}
					>
						<Tooltip title="Export as CSV">
							<IconButton onClick={exportToCsv}>
								<GetAppOutlined />
							</IconButton>
						</Tooltip>
					</Grid>
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
		</Fragment>
	);
}
