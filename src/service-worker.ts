import { precacheAndRoute, createHandlerBoundToURL, PrecacheEntry } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }: { request: Request; url: URL }) => {
    return request.mode === 'navigate';
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);