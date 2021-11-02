import type { GetServerSideProps } from 'next';
import type { SWRConfiguration } from 'swr';
import type { HelloResponse } from './api/hello';
import { doHello } from './api/hello';
import { useSWRKit } from '../lib/swr';
import { MouseEvent } from 'react';

// Utility function
function tryOrDefault<T>(fnToTry: () => T, defaultValueOnError: T): T {
	try {
		return fnToTry();
	} catch {
		return defaultValueOnError;
	}
}


// SWRConfiguration properties to disable most of SWR's automated refresh / revalidation - it makes it easier to understand the behaviour if SWR isn't unexpectedly calling the API e.g. because you changed focus
const disableSwrAutomaticRefresh = {
	revalidateOnFocus: false,
	revalidateIfStale: false,
	revalidateOnMount: true, // needed for revalidation on first load of the component
	refreshWhenHidden: false,
	refreshWhenOffline: false
};


/// Define this page's Props
interface PageProps {
	swrConfig: SWRConfiguration
}


// `getStaticProps` is executed on the server side to initially populate the data.
export const getServerSideProps: GetServerSideProps<PageProps> = async () => {

	// because doHello is only used in getStaticProps it's 
	const fallback = {
		'/api/hello': tryOrDefault(() => doHello(0.5), { time: 0 })
	};

	return {
		props: {
			swrConfig: {
				fallback,
				...disableSwrAutomaticRefresh
			}
		}
	};
};

export default function Home(props: PageProps) {

	const { data, error, isValidating, mutate } = useSWRKit<HelloResponse>('/api/hello', props.swrConfig);

	function fetchLatest(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		mutate()
	}

	return (
		<div>
			<div>
				{isValidating && `Update in progress...`}
				{!isValidating && (error ? `An error occured: '${error.message ?? error}'` : `Success!`)}
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
