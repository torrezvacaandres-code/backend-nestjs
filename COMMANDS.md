# 📚 Guía de Comandos - Backend API

Esta guía documenta todos los comandos disponibles para trabajar con el proyecto Backend API usando Docker.

## 🐳 Comandos de Docker

### Iniciar el proyecto

```bash
# Construir e iniciar los contenedores
docker compose up -d

# Iniciar y ver logs en tiempo real
docker compose up

# Reconstruir los contenedores (después de cambios en Dockerfile)
docker compose up --build
```

### Detener el proyecto

```bash
# Detener los contenedores
docker compose down

# Detener y eliminar volúmenes
docker compose down -v
```

### Ver logs

```bash
# Ver logs del contenedor
docker compose logs -f app

# Ver últimos 100 líneas de logs
docker compose logs --tail=100 app
```

### Ejecutar comandos dentro del contenedor

```bash
# Ejecutar cualquier comando dentro del contenedor
docker compose exec app <comando>

# Ejemplo: abrir una shell
docker compose exec app sh
```

---

## 🗄️ Comandos de Base de Datos

### Generar Entidades desde Base de Datos Existente

Como tu base de datos ya está poblada en Supabase, puedes generar las entidades automáticamente:

#### Opción 1: Con sincronización automática (Recomendado)

```bash
# Genera entidades y las sincroniza automáticamente al sistema local
docker compose exec app pnpm run entity:generate:sync
```

Este comando:
- ✅ Genera todas las entidades desde tu base de datos de Supabase
- ✅ Las guarda en `src/entities/` dentro del contenedor
- ✅ Las sincroniza automáticamente a tu sistema local

#### Opción 2: Solo generar (dentro del contenedor)

```bash
# Genera entidades solo dentro del contenedor
docker compose exec app pnpm run entity:generate
```

Si usas esta opción y los archivos no aparecen localmente, copia manualmente:
```bash
docker compose cp app:/app/src/entities/. src/entities/
```

**Nota:** Las entidades se generan desde tu base de datos existente. No necesitas crearlas manualmente.

---

## 🔄 Comandos de Migraciones

### Crear Migraciones

#### Crear migración manual (vacía)

```bash
# Crear una migración vacía para escribir tu propia lógica
docker compose exec app pnpm run migration:create --name NombreMigracion

# Ejemplo:
docker compose exec app pnpm run migration:create --name AddUserEmailColumn
```

#### Generar migración automática (desde cambios en entidades)

```bash
# Genera una migración basada en cambios en tus entidades
docker compose exec app pnpm run migration:generate --name NombreMigracion

# Ejemplo:
docker compose exec app pnpm run migration:generate --name CreateUserTable
```

**Nota:** Los archivos se crean automáticamente en `src/migrations/`. No necesitas especificar la ruta completa.

### Ejecutar Migraciones

```bash
# Ejecutar todas las migraciones pendientes
docker compose exec app pnpm run migration:run
```

### Revertir Migraciones

```bash
# Revertir la última migración ejecutada
docker compose exec app pnpm run migration:revert
```

### Ver Estado de Migraciones

```bash
# Ver qué migraciones están ejecutadas y cuáles están pendientes
docker compose exec app pnpm run migration:show
```

---

## 📦 Comandos de Desarrollo

### Instalar Dependencias

```bash
# Instalar dependencias dentro del contenedor
docker compose exec app pnpm install

# O si el contenedor no está corriendo
docker compose run --rm app pnpm install
```

### Ejecutar Scripts de Desarrollo

```bash
# Iniciar en modo desarrollo (ya está configurado en docker-compose)
docker compose up

# Ver logs en tiempo real
docker compose logs -f app
```

### Compilar el Proyecto

```bash
# Compilar TypeScript
docker compose exec app pnpm run build
```

### Linting y Formateo

```bash
# Ejecutar linter y corregir errores automáticamente
docker compose exec app pnpm run lint

# Formatear código
docker compose exec app pnpm run format
```

### Tests

```bash
# Ejecutar tests
docker compose exec app pnpm run test

# Ejecutar tests en modo watch
docker compose exec app pnpm run test:watch

# Ejecutar tests con cobertura
docker compose exec app pnpm run test:cov

# Ejecutar tests end-to-end
docker compose exec app pnpm run test:e2e
```

---

## 🔧 Comandos Útiles

### Copiar archivos del contenedor al host

```bash
# Copiar entidades generadas
docker compose cp app:/app/src/entities/. src/entities/

# Copiar cualquier archivo o directorio
docker compose cp app:/app/ruta/dentro/contendor/. ruta/local/
```

### Copiar archivos del host al contenedor

```bash
# Copiar archivos al contenedor
docker compose cp archivo-local app:/app/ruta/destino/
```

### Reiniciar el contenedor

```bash
# Reiniciar el contenedor de la aplicación
docker compose restart app
```

### Ver información del contenedor

```bash
# Ver información detallada del contenedor
docker compose ps

# Ver uso de recursos
docker stats backend-api
```

---

## 📋 Flujo de Trabajo Recomendado

### Primera vez (Base de datos existente)

```bash
# 1. Iniciar el proyecto
docker compose up -d

# 2. Generar entidades desde la base de datos existente
docker compose exec app pnpm run entity:generate:sync

# 3. Revisar las entidades generadas en src/entities/
# 4. Ajustar según necesites (decoradores, validaciones, etc.)
```

### Desarrollo normal

```bash
# 1. Iniciar el proyecto
docker compose up

# 2. Trabajar en tu código (los cambios se sincronizan automáticamente)
# 3. Ver logs en tiempo real
docker compose logs -f app
```

### Agregar nuevas tablas o modificar esquema

```bash
# Opción A: Modificar directamente en Supabase y regenerar entidades
docker compose exec app pnpm run entity:generate:sync

# Opción B: Usar migraciones (recomendado para producción)
# 1. Crear migración
docker compose exec app pnpm run migration:create --name AddNewTable

# 2. Escribir la lógica de la migración en el archivo generado
# 3. Ejecutar migración
docker compose exec app pnpm run migration:run
```

---

## 🌐 Variables de Entorno

Las variables de entorno están configuradas en `docker-compose.yaml`:

- `NODE_ENV`: development
- `DB_HOST`: aws-0-us-west-2.pooler.supabase.com
- `DB_PORT`: 6543
- `DB_USER`: postgres.hnberacitqfoaujzvxsl
- `DB_PASS`: AI.martinez1
- `DB_NAME`: postgres

Para desarrollo local, puedes crear un archivo `.env` basado en `.env.example`.

---

## 📁 Estructura de Archivos Generados

```
src/
├── entities/          # Entidades generadas desde la BD (database-first)
│   ├── personas.ts
│   ├── menus.ts
│   └── ...
├── migrations/        # Migraciones de base de datos
│   └── ...
└── ...
```

---

## ⚠️ Notas Importantes

1. **Entidades**: Se generan desde la base de datos existente. No necesitas crearlas manualmente.

2. **Migraciones**: Úsalas para cambios futuros en el esquema de la base de datos.

3. **Sincronización**: El volumen monta `.:/app`, así que los cambios locales se reflejan en el contenedor automáticamente.

4. **Puerto**: La aplicación corre en el puerto `3000` por defecto.

5. **Base de Datos**: Estás usando Supabase, así que no hay contenedor de base de datos en Docker.

---

## 🆘 Solución de Problemas

### Los archivos generados no aparecen localmente

```bash
# Copiar manualmente desde el contenedor
docker compose cp app:/app/src/entities/. src/entities/
```

### El contenedor no inicia

```bash
# Reconstruir el contenedor
docker compose up --build

# Ver logs de error
docker compose logs app
```

### Error de conexión a la base de datos

Verifica que las variables de entorno en `docker-compose.yaml` sean correctas.

### Dependencias no instaladas

```bash
# Reinstalar dependencias
docker compose exec app pnpm install
```

---

## 📞 Comandos Rápidos de Referencia

```bash
# Iniciar proyecto
docker compose up -d

# Generar entidades (con sync)
docker compose exec app pnpm run entity:generate:sync

# Crear migración
docker compose exec app pnpm run migration:create --name NombreMigracion

# Ejecutar migraciones
docker compose exec app pnpm run migration:run

# Ver logs
docker compose logs -f app

# Detener proyecto
docker compose down
```

