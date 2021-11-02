import { AppProps } from 'next/app';
import { SWRConfig, SWRConfiguration } from 'swr';

// SWRConfiguration properties to disable most of SWR's automated refresh / revalidation - it makes it easier to understand the behaviour if SWR isn't unexpectedly calling the API e.g. because you changed focus
const disableSwrAutomaticRefresh: SWRConfiguration = {
	revalidateOnFocus: false,
	revalidateIfStale: false,
	revalidateOnMount: true, // needed for revalidation on first load of the component
	refreshWhenHidden: false,
	refreshWhenOffline: false
};

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig value={disableSwrAutomaticRefresh}>
			<Component {...pageProps} />
		</SWRConfig>
	);
}
