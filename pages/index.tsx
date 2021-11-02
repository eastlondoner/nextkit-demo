import type { GetServerSideProps } from 'next';
import type { SWRConfiguration } from 'swr';
import { MouseEvent } from 'react';

import apis from '../hooks/apis';
import helloService from '../services/hello'

/// Define this page's Props
interface PageProps {
	swrConfig: SWRConfiguration
}


// `getServerSideProps` is executed on the server side on each request to initially populate the data.
export const getServerSideProps: GetServerSideProps<PageProps> = async () => {

	// because serverSideHello is only used in getServerSideProps it's not imported on the client side
	const fallback = {
		'/api/hello': helloService.getLatestCachedValue()
	};

	return {
		props: {
			swrConfig: {
				fallback
			}
		}
	};
};


const myApis = apis();
export default function Home(props: PageProps) {

	const { data, error, isValidating, mutate } = myApis.hello(props.swrConfig);

	function fetchLatest(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		mutate()
	}

	return (
		<div>
			<div>
				{isValidating && `Update in progress...`}
				{!isValidating && (error ? `An error occured: '${error.message ?? error}'` : (data ? `Success!` : ``))}
			</div>
			<div>
				{data && `Time according to /api/hello: ${data.time}`}
			</div>
			<div>
				<button onClick={fetchLatest}>
					Update
				</button>
			</div>
		</div>
	);
};
