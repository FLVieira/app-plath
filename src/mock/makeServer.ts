import { createServer } from 'miragejs';

import { config } from '@/config';
import { mockEventsRoutes } from './events';

export const makeServer = ({ environment = 'development' } = {}) => {
  return createServer({
    environment,
    routes() {
      this.urlPrefix = config.API_BASE_URL;
      mockEventsRoutes(this);
    },
  });
};
