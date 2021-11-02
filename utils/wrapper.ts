export function wrapper<T extends Function>(
    wrapperParam1: number,
    wrapperParam2: string,
    operation: T
) {
    return async (...operationParameters: []) => {
        console.log(`wrapper ${wrapperParam1} ${wrapperParam2}`);
        return operation(...operationParameters);
    };
}
