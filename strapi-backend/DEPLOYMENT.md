# 🚀 DEPLOYMENT A HOSTINGER VPS + NETLIFY

## PARTE 1: HOSTINGER VPS (Strapi Backend)

### 1. Preparar VPS
```bash
# Conectar por SSH
ssh root@tu-ip-vps

# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Instalar PM2
sudo npm install -g pm2

# Instalar Nginx
sudo apt install -y nginx
```

### 2. Configurar PostgreSQL
```bash
# Entrar a PostgreSQL
sudo -u postgres psql

# Crear base de datos y usuario
CREATE DATABASE strapi_production;
CREATE USER strapi_user WITH ENCRYPTED PASSWORD 'TU_PASSWORD_SEGURO';
GRANT ALL PRIVILEGES ON DATABASE strapi_production TO strapi_user;
\q
```

### 3. Subir Strapi al VPS
```bash
# En tu máquina local, desde la carpeta strapi-backend
scp -r . root@tu-ip-vps:/var/www/strapi-backend

# En el VPS
cd /var/www/strapi-backend
npm install --production
```

### 4. Configurar variables de entorno
```bash
# En el VPS
cd /var/www/strapi-backend
nano .env

# Copiar y modificar el contenido de .env.production.example
# Generar APP_KEYS con:
openssl rand -base64 32
# (ejecutar 4 veces y separar con comas)
```

### 5. Build y arrancar Strapi
```bash
# Build
NODE_ENV=production npm run build

# Arrancar con PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 6. Configurar Nginx
```bash
sudo nano /etc/nginx/sites-available/strapi

# Pegar esta configuración:
```
```nginx
server {
    listen 80;
    server_name api.tudominio.com;

    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Activar configuración
sudo ln -s /etc/nginx/sites-available/strapi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 7. Configurar SSL con Let's Encrypt
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.tudominio.com
```

---

## PARTE 2: NETLIFY (Next.js Frontend)

### 1. Preparar Next.js para producción
```bash
# En tu máquina local
cd /ruta/a/tomas-portfolio

# Actualizar .env.local con la URL de producción
NEXT_PUBLIC_STRAPI_URL=https://api.tudominio.com
```

### 2. Deploy a Netlify
```bash
# Opción A: Desde Netlify Dashboard
1. Ve a https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Conecta con GitHub
4. Selecciona el repositorio "portafolio"
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Base directory: (dejar vacío)
6. Environment variables:
   - NEXT_PUBLIC_STRAPI_URL=https://api.tudominio.com
   - NEXT_PUBLIC_STRAPI_API_TOKEN=(generar en Strapi)
7. Deploy

# Opción B: Con Netlify CLI
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### 3. Configurar dominio personalizado
1. En Netlify: Site settings → Domain management
2. Agregar tu dominio (ej: tomasnadal.com)
3. Configurar DNS en tu proveedor

---

## CHECKLIST FINAL

### Antes de deployear:
- [ ] PostgreSQL instalado en VPS
- [ ] Variables de entorno configuradas (.env en VPS)
- [ ] APP_KEYS generadas (4 keys diferentes)
- [ ] Dominio apuntando al VPS (api.tudominio.com)
- [ ] SSL configurado con Let's Encrypt
- [ ] PM2 configurado y corriendo
- [ ] Nginx configurado como reverse proxy

### Después de deployear Strapi:
- [ ] Crear usuario admin en https://api.tudominio.com/admin
- [ ] Configurar permisos públicos (Settings → Roles → Public)
- [ ] Generar API Token (Settings → API Tokens)
- [ ] Crear contenido de prueba

### Después de deployear Next.js:
- [ ] Verificar que NEXT_PUBLIC_STRAPI_URL apunta a producción
- [ ] Verificar que el sitio carga correctamente
- [ ] Probar navegación entre páginas
- [ ] Verificar que los proyectos y blogs se muestran

---

## COMANDOS ÚTILES

### En el VPS:
```bash
# Ver logs de Strapi
pm2 logs strapi

# Reiniciar Strapi
pm2 restart strapi

# Ver estado
pm2 status

# Detener Strapi
pm2 stop strapi
```

### Para actualizar Strapi:
```bash
# En tu máquina local
git push

# En el VPS
cd /var/www/strapi-backend
git pull
npm install --production
NODE_ENV=production npm run build
pm2 restart strapi
```

---

## NOTAS IMPORTANTES

1. **Base de datos**: Usa PostgreSQL en producción, NO SQLite
2. **Imágenes**: Considera usar Cloudinary para almacenar imágenes
3. **Backups**: Configura backups automáticos de PostgreSQL
4. **Seguridad**: Cambia todos los passwords y secrets
5. **Monitoreo**: Configura alertas con PM2 Plus o similar
