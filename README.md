# RecetApp - Aplicación de Recetas

Una aplicación full-stack para buscar y gestionar recetas favoritas, construida con React, Node.js, Express y MongoDB.

## Características

- **Búsqueda de recetas** por ingrediente usando TheMealDB API
- **Sistema de favoritos** para guardar recetas preferidas
- **Interfaz moderna** con Tailwind CSS
- **Diseño responsivo** para móviles y desktop
- **Arquitectura full-stack** con separación frontend/backend

## Tecnologías

### Frontend

- React 18
- Vite
- Tailwind CSS
- Axios (para peticiones HTTP)

### Backend

- Node.js
- Express.js
- MongoDB con Mongoose
- TheMealDB API

## Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- MongoDB (local o Atlas)
- pnpm (recomendado) o npm

### 1. Clonar el repositorio

```bash
git clone https://github.com/JoseFernandezViloria/recipes-app.git
cd recipes-app
```

### 2. Configurar el Backend

```bash
cd backend
npm install
```

Crear archivo `.env` en la carpeta `backend`:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/recetapp
```

### 3. Configurar el Frontend

```bash
cd frontend
pnpm install
```

### 4. Ejecutar la aplicación

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
pnpm dev
```

## Uso de la Aplicación

1. **Buscar Recetas**: Escribe un ingrediente en el campo de búsqueda
2. **Ver Resultados**: Las recetas aparecerán en tarjetas con imagen y detalles
3. **Agregar Favoritos**: Haz clic en el botón de corazón para guardar recetas
4. **Ver Favoritos**: Cambia a la pestaña "Mis Favoritos" para ver tus recetas guardadas

## API Endpoints

- `GET /api/recipes/search?ingredient=X` - Buscar recetas por ingrediente
- `POST /api/recipes/favorite` - Guardar receta como favorita
- `GET /api/recipes/favorites` - Obtener todas las recetas favoritas

## Estructura del Proyecto

```
RecetApp/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Controladores de rutas
│   │   ├── models/         # Modelos de MongoDB
│   │   ├── routes/         # Definición de rutas
│   │   ├── services/       # Servicios externos
│   │   └── server.js       # Servidor principal
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── App.jsx         # Componente principal
│   │   └── main.jsx        # Punto de entrada
│   └── package.json
└── README.md
```

## Componentes Principales

- **Header**: Navegación entre búsqueda y favoritos
- **RecipeSearch**: Formulario de búsqueda
- **RecipeList**: Lista de resultados de búsqueda
- **RecipeCard**: Tarjeta individual de receta
- **FavoritesList**: Lista de recetas favoritas

## Desarrollo

### Backend

- Usa `nodemon` para desarrollo con recarga automática
- Las rutas están organizadas por funcionalidad
- Manejo de errores centralizado

### Frontend

- Componentes funcionales con hooks
- Estado local con useState
- Efectos con useEffect para carga de datos
- Estilos con Tailwind CSS

## Notas

- La aplicación se conecta a TheMealDB API para obtener recetas
- Las recetas favoritas se almacenan en MongoDB
- El frontend se ejecuta en puerto 3000 (Vite)
- El backend se ejecuta en puerto 4000

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.
