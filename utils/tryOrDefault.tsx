import type { ProperFunction } from "./ProperFunction";

export function tryOrDefault<T extends ProperFunction>(fnToTry: T, defaultValueOnError: () => ReturnType<T>): ReturnType<T> {
	try {
		return fnToTry();
	} catch {
		return defaultValueOnError();
	}
}
