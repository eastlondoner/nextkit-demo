const serviceState = {
	previous: 0
}

// simulates an async call e.g. to S3. Store most recent value in a cache
async function doHello() {
	const now = Date.now();

	if (now > serviceState.previous) {
		serviceState.previous = now
	};

	await new Promise(r => setTimeout(r,10))
	return {
		time: now,
	};
}

function getLatestCachedValue() {
	return {
		time: serviceState.previous
	};
}

const helloService = {
	doHello,
	getLatestCachedValue
}

export default helloService;
