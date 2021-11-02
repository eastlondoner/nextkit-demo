export function withDelay<T extends Function>(delay: number, operation: T) {
    return async (...operationParameters: []) => {
        const randomDelay = new Promise(r => setTimeout(r, Math.random() * delay));
        await randomDelay;
        return operation(...operationParameters);
    };
}
