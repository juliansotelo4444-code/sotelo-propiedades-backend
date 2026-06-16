# Sotelo Propiedades — Backend API

API REST construida con **Node.js + Express + MongoDB**. Permite gestionar propiedades inmobiliarias con autenticación JWT, verificación de email y arquitectura en capas.

---

## Instalación

```bash
git clone <repo-url>
cd sotelo-backend
npm install
cp .env.example .env   # completar variables
npm run dev            # puerto 4000
```

### Variables de entorno

| Variable | Descripción |
|---|---|
| `PORT` | Puerto del servidor (default: 4000) |
| `MONGODB_URI` | Connection string de MongoDB Atlas |
| `JWT_SECRET` | Clave secreta para firmar JWT |
| `JWT_EXPIRES_IN` | Expiración del token (ej: `7d`) |
| `EMAIL_HOST` | SMTP host (ej: `smtp.gmail.com`) |
| `EMAIL_PORT` | Puerto SMTP (ej: `587`) |
| `EMAIL_USER` | Email remitente |
| `EMAIL_PASS` | App password de Google |
| `CLIENT_URL` | URL del frontend (para CORS y links en emails) |

---

## Arquitectura

```
src/
├─ config/              → Conexión MongoDB
├─ models/              → User, Property, PropertyType
├─ repositories/        → Acceso a BD
├─ services/            → Lógica de negocio
├─ controllers/         → Manejo req/res
├─ routes/              → Express Router
├─ middleware/          → auth JWT, validación, error handler
└─ utils/               → jwt.js, email.js
```

---

## Endpoints

### Auth — `/api/auth`

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/register` | ❌ | Registro + envío de email de verificación |
| GET | `/verify-email?token=` | ❌ | Verificar cuenta |
| POST | `/login` | ❌ | Login → devuelve JWT |
| GET | `/me` | ✅ | Perfil del usuario |

**Registro:**
```json
{ "name": "Juan", "email": "juan@mail.com", "password": "123456" }
```
**Login:**
```json
{ "email": "juan@mail.com", "password": "123456" }
```

---

### Propiedades — `/api/properties`

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/` | ❌ | Listado público con filtros |
| GET | `/stats` | ❌ | Estadísticas por estado |
| GET | `/:id` | ❌ | Detalle de propiedad |
| GET | `/me/list` | ✅ | Mis propiedades |
| POST | `/` | ✅ | Crear propiedad |
| PUT | `/:id` | ✅ | Editar propiedad |
| DELETE | `/:id` | ✅ | Eliminar propiedad |

**Filtros GET /api/properties:**
- `operationType`: `venta` | `alquiler`
- `status`: `disponible` | `reservado` | `vendido`
- `propertyType`: ID del tipo
- `currency`: `ARS` | `USD`
- `minPrice`, `maxPrice`: números
- `search`: texto libre

**Body crear/editar:**
```json
{
  "title": "Casa 3 ambientes en Palermo",
  "description": "Hermosa casa con jardín",
  "operationType": "venta",
  "price": 150000,
  "currency": "USD",
  "address": "Gurruchaga 1234",
  "neighborhood": "Palermo",
  "surfaceM2": 120,
  "rooms": 3,
  "status": "disponible",
  "propertyType": "ID_DEL_TIPO",
  "photos": ["https://url-foto1.jpg", "https://url-foto2.jpg"]
}
```

---

### Tipos de propiedad — `/api/property-types` (todas requieren JWT)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Listar tipos |
| POST | `/` | Crear tipo |
| PUT | `/:id` | Editar tipo |
| DELETE | `/:id` | Eliminar tipo |

---

## Seguridad
- Contraseñas hasheadas con `bcryptjs` (12 rounds)
- JWT con expiración configurable
- Verificación de email con token UUID (24hs de validez)
- Validación de inputs con `express-validator`
- CORS configurado por dominio

---

## Credenciales de prueba
```
Email: demo@sotelopropliedades.com
Password: demo1234
(cuenta ya verificada)
```
