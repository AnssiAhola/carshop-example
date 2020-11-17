import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { Add } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';

const initialCarState = {
	brand: '',
	model: '',
	color: '',
	fuel: '',
	year: 0,
	price: 0
};

export default function AddCar({ addCar }) {
	const [ open, setOpen ] = useState(false);
	const [ car, setCar ] = useState(initialCarState);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleInputChange = (e) => {
		setCar({ ...car, [e.target.name]: e.target.value });
	};

	const handleAddEvent = () => {
		addCar(car);
		setCar(initialCarState);
		handleClose();
	};

	return (
		<div>
			<IconButton
				edge="start"
				style={{ marginLeft: 12 }}
				color="inherit"
				onClick={handleClickOpen}
			>
				<Add />
				<Typography variant="h6">Add New Car</Typography>
			</IconButton>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Add New Car</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						name="brand"
						value={car.brand}
						onChange={handleInputChange}
						label="Brand"
						type="text"
						fullWidth
					/>
					<TextField
						margin="dense"
						name="model"
						value={car.model}
						onChange={handleInputChange}
						label="Model"
						type="text"
						fullWidth
					/>
					<TextField
						margin="dense"
						name="color"
						value={car.color}
						onChange={handleInputChange}
						label="Color"
						type="text"
						fullWidth
					/>
					<TextField
						margin="dense"
						name="fuel"
						value={car.fuel}
						onChange={handleInputChange}
						label="Fuel"
						type="text"
						fullWidth
					/>
					<TextField
						margin="dense"
						name="year"
						value={car.year}
						onChange={handleInputChange}
						label="Year"
						type="number"
						fullWidth
					/>
					<TextField
						margin="dense"
						name="price"
						value={car.price}
						onChange={handleInputChange}
						label="Price"
						type="number"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="secondary">
						Cancel
					</Button>
					<Button onClick={handleAddEvent} color="primary">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
