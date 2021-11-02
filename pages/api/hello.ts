import { api, HttpException } from 'nextkit';
import { withFailures } from '../../utils/withFailures';
import helloService from '../../services/hello'

const serverFailureRate = process.env.NEXT_PRIVATE_SERVER_SIDE_FAILURE_RATE ? parseFloat(process.env.NEXT_PRIVATE_SERVER_SIDE_FAILURE_RATE) : 0.0;
export const serverSideHello = serverFailureRate > 0.0 ? withFailures(serverFailureRate, () => new HttpException(500, 'This was intentionally thrown.'), helloService.doHello) : helloService.doHello

const handler = api<{ time: number }>({
	async GET() {
		return serverSideHello();
	},
});

export default handler;
