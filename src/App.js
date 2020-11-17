import CarList from './components/CarList';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function App() {
	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6">CarShop</Typography>
				</Toolbar>
			</AppBar>
			<CarList />
		</div>
	);
}

export default App;
