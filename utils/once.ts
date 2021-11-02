import { ProperFunction } from './ProperFunction';

export function once<T extends ProperFunction>(
    operation: T
) {
    var memo: ReturnType<T>;
    return (...operationParameters: []) => {
        if (!memo) {
            memo = operation(...operationParameters);
        }
        return memo;
    };
}
