# ApiWeb

API REST en Node.js con conexión a MySQL (Clever Cloud).  
Incluye operaciones básicas CRUD sobre usuarios: crear, leer, actualizar y eliminar.

---

## 📁 Archivos principales

### `index.js`
- Carga variables desde `.env`
- Configura `express.json()` para recibir datos tipo JSON
- Usa las rutas definidas en `routes/usuarios.js`
- Inicia el servidor

### `db.js`
- Se conecta a tu base de datos MySQL en Clever Cloud usando `.env`
- Exporta la conexión para usarla en otros módulos

### `routes/usuarios.js`
Contiene las 5 rutas CRUD básicas para manejar usuarios:

- `GET /usuarios` – obtener todos los usuarios  
- `GET /usuarios/:id` – obtener usuario por ID  
- `POST /usuarios` – crear nuevo usuario  
- `PUT /usuarios/:id` – actualizar usuario  
- `DELETE /usuarios/:id` – eliminar usuario

### `package.json`
- Define el proyecto y sus dependencias (`express`, `dotenv`, `mysql2`)
- Configura el comando `npm start`

### `.env`
> ⚠️ No se incluye en el repositorio. Debes crearlo con tus datos reales de conexión:
