import { SWRConfiguration } from 'swr';
import type hello from '../pages/api/hello';
import { once } from '../utils/once';
import { useSWRKit } from "./swrKit";

export function createApis(){
    return {
        hello: (config?: SWRConfiguration) => useSWRKit<typeof hello>('/api/hello', config)
    };
}

export default once(() => createApis());
