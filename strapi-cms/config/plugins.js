module.exports = ({ env }) => ({
  // Deshabilitar cloud-cronjob-runner si causa problemas
  'cloud-cronjob-runner': {
    enabled: false,
  },
});
