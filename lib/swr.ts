import type { APIResponse } from 'nextkit';
import type { SWRConfiguration, SWRResponse } from 'swr';

import useSWR from 'swr';

// `fetchApi` is an swr-compatible handler function that returns a typed response
async function fetchApi<T>(
    input: RequestInfo,
    init?: RequestInit
): Promise<T> {

    // random delay makes it easier to see the magic that SWR is doing
    const randomDelay = new Promise(r => setTimeout(r, Math.random() * 3000));

    const res = await fetch(input, init);
    const apiResponse = await res.json() as APIResponse<T>;

    await randomDelay;

    // escalate errors - I believe this is fundamentally necessary - exposing ErroredAPIResponse doesn't make sense when using SWR
    if (apiResponse && apiResponse.success) {
        return apiResponse.data;
    } else {
        throw new Error(apiResponse.message);
    }
}

export function useSWRKit<T, Error = any>(path: string, config: SWRConfiguration): SWRResponse<T, Error> {
    const swrResponse = useSWR<T>(path, fetchApi, config);
    return swrResponse;
}
