const BASE_URL = 'https://carstockrest.herokuapp.com/cars/';
const headers = { 'Content-type': 'application/json' };

export const CarService = {
	GetAll: () => _fetch(BASE_URL, 'GET'),
	Get: (url) => _fetch(url, 'GET'),
	Delete: (url) => _fetch(url, 'DELETE'),
	Add: (car) => _fetch(BASE_URL, 'POST', car),
	Update: (car) => _fetch(car._links.self.href, 'PUT', car)
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
