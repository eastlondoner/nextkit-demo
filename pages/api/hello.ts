import type { InferAPIResponseType, APIResponse } from 'nextkit';
import { api, HttpException } from 'nextkit';

export function doHello(failureRate: number) {
	if (Math.random() < failureRate) {
		throw new HttpException(500, 'This was intentionally thrown.');
	}

	return {
		time: Date.now(),
	};
}

const handler = api<{ time: number }>({
	async GET() {
		return doHello(0.3);
	},
});

export default handler;
export type HelloResponse = InferAPIResponseType<typeof handler>;
