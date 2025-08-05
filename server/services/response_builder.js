import status from 'http-status';

export default function responseBuilder(statusCode, body, message = '') {
	let response = {
		statusCode,
		statusMessage: status[statusCode],
		message,
	};
	response.data = body;

	return response;
}
