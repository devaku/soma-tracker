import status from 'http-status';

export default function responseBuilder(statusCode, body, message = '') {
	let response = {
		statusCode,
		statusMessage: status[statusCode],
		message,
	};

	if (body.length > 1) {
		response.data = body;
	} else {
		response.data = {
			...body,
		};
	}

	return response;
}
