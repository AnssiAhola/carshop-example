const BASE_URL = 'https://carstockrest.herokuapp.com/cars/';
const headers = { 'Content-type': 'application/json' };
export const CarService = {
	GetAll: () => _fetch(BASE_URL, 'GET').then((data) => data._embedded.cars),
	Get: async (url) => await _fetch(url, 'GET'),
	Delete: async (url) => await _fetch(url, 'DELETE'),
	Add: async (car) => await _fetch(BASE_URL, 'POST', car),
	Update: async (car) => await _fetch(car._links.self.href, 'PUT', car)
};

const _fetch = async (url, method, data = undefined) => {
	console.log(url);
	const options = {
		method: method,
		headers: headers,
		body: JSON.stringify(data)
	};
	return await fetch(url, options)
		.then((response) => response.json())
		.catch((error) => console.log(error));
};
