export function withFailures<E extends Error, T extends Function>(failureRate: number, errorGenerator: () => E, operation: T) {
	return (...operationParameters: []) => {
		if (Math.random() < failureRate) {
			throw errorGenerator();
		}
		return operation(...operationParameters);
	};
}
