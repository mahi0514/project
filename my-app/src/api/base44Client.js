import { createClient } from '@base44/sdk';
import { appParams } from 'C:/Users/USER/sponza/project/my-app/src/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

//Create a client with authentication required
export const base44 = createClient({
  appId,
  token,
  functionsVersion,
  serverUrl: '',
  requiresAuth: false,
  appBaseUrl
});
