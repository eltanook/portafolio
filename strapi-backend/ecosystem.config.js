// PM2 configuration para Hostinger VPS
module.exports = {
  apps: [
    {
      name: 'strapi',
      script: 'npm',
      args: 'start',
      cwd: '/ruta/a/tu/strapi-backend',
      env: {
        NODE_ENV: 'production',
      },
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
    },
  ],
};
