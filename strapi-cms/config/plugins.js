module.exports = ({ env }) => ({
  'cloud-cronjob-runner': {
    enabled: true,
    config: {
      apiToken: env('STRAPI_CLOUD_API_TOKEN', 'dummy-token'),
      apiUrl: env('STRAPI_CLOUD_API_URL', 'https://cloud.strapi.io'),
      firstRunWindow: env.int('CRONJOB_FIRST_RUN_WINDOW', 60),
    },
  },
});
