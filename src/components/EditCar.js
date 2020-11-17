import { useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { Edit } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';

export default function EditCar({ self, updateCar }) {
	const [ open, setOpen ] = useState(false);
	const [ car, setCar ] = useState(self);

	const toggleOpen = () => setOpen((prevState) => !prevState);

	const handleInputChange = (e) => {
		setCar({ ...car, [e.target.name]: e.target.value });
	};

	const handleUpdateEvent = () => {
		updateCar(car);
		toggleOpen();
	};

	return (
		<Fragment>
			<Tooltip onClick={toggleOpen} title="Edit">
				<IconButton style={{ padding: 4 }}>
					<Edit />
				</IconButton>
			</Tooltip>
			<Dialog open={open} onClose={toggleOpen} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Edit Car</DialogTitle>
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
					<Button onClick={toggleOpen} color="secondary">
						Cancel
					</Button>
					<Button onClick={handleUpdateEvent} color="primary">
						Update
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}
