import type { APIResponse } from 'nextkit';
import type { SWRConfiguration, SWRResponse } from 'swr';

import { HttpException, InferAPIResponseType } from 'nextkit';
import useSWR from 'swr';
import { withDelay } from '../utils/withDelay';

// `fetchApi` is an swr-compatible handler function that returns a typed response
async function fetchApi<T>(
    input: RequestInfo,
    init?: RequestInit
): Promise<T> {

    const res = await fetch(input, init);
    const body = await res.json() as APIResponse<T>;

    // escalate errors - I believe this is fundamentally necessary - exposing ErroredAPIResponse doesn't make sense when using SWR
    if (body && body.success) {
        console.log("success")
        return body.data;
    } else {
        throw new HttpException(res.status, body.message);
    }
}


// random delay makes it easier to see the magic that SWR is doing with fallback / preview / mutate
const simulateFetchDelay = process.env.NEXT_PUBLIC_CLIENT_SIDE_FETCH_DELAY ?? 0
const fetchToUse = simulateFetchDelay && parseInt(simulateFetchDelay) > 0 ? withDelay(parseInt(simulateFetchDelay), fetchApi) : fetchApi


export function useSWRKit<T>(path: `/api/${string}`, config?: SWRConfiguration): SWRResponse<InferAPIResponseType<T>, HttpException> {
    const swrResponse = config ? useSWR<InferAPIResponseType<T>, HttpException>(path, fetchToUse, config) : useSWR<InferAPIResponseType<T>, HttpException>(path, fetchToUse);
    return swrResponse;
}
