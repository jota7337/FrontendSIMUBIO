# MANUAL TÉCNICO - SIMUBIO FRONTEND
## Sistema de Información para el Museo de Biología - Universidad El Bosque

---

### 📋 INFORMACIÓN GENERAL

**Proyecto:** SIMUBIO Frontend  
**Institución:** Universidad El Bosque  
**Versión:** 0.0.0  
**Fecha:** Octubre 2025  
**Repositorio:** FrontendSIMUBIO  
**Rama actual:** change/logo  

---

## 🏗️ ARQUITECTURA DEL SISTEMA

### Stack Tecnológico

**Frontend Framework:**
- React 18.3.1 (Single Page Application)
- Vite 5.4.10 (Build tool y development server)
- React Router DOM 7.3.0 (Navegación y routing)

**Estilos y UI:**
- Tailwind CSS 3.4.14 (Framework CSS utilitario)
- PostCSS 8.4.47 (Procesador CSS)
- Lucide React 0.487.0 (Iconografía)
- Sistema de diseño corporativo Universidad El Bosque

**Manejo de Estado:**
- React Context API (Estado global)
- React Hook Form 7.55.0 (Formularios)
- Zustand/Context patterns (Gestión de estado local)

**Validación:**
- Zod 3.24.2 (Validación de esquemas)
- @hookform/resolvers 5.0.1 (Integración con React Hook Form)

**Backend y Datos:**
- Supabase 2.49.4 (Base de datos PostgreSQL, autenticación, API)
- Integración completa con servicios de backend

**Utilidades:**
- File-saver 2.0.5 (Descarga de archivos)
- XLSX 0.18.5 (Procesamiento de archivos Excel)
- Recharts 2.15.2 (Gráficos y visualizaciones)

**Desarrollo:**
- ESLint 9.13.0 (Linting)
- Prettier (Formateo de código)
- TypeScript support (@types/react)

---

## 🗂️ ESTRUCTURA DEL PROYECTO

```
SIMUBIO/
├── public/                          # Archivos estáticos
│   ├── logo.png                    # Logo de la universidad
│   ├── universidad.png             # Logo institucional
│   ├── fondo.png                   # Imagen de fondo
│   ├── plantilla.xlsx              # Plantilla Excel para importación
│   └── assets/                     # Recursos adicionales
│       ├── icons/                  # Iconografía
│       └── img/                    # Imágenes del sistema
├── src/
│   ├── App.jsx                     # Componente principal y router
│   ├── DashboardLayout.jsx         # Layout principal con sidebar
│   ├── main.jsx                    # Punto de entrada React
│   ├── index.css                   # Estilos globales y tema corporativo
│   ├── apis/                       # Servicios y API calls
│   │   ├── admin-users.js          # Gestión administrativa de usuarios
│   │   ├── Comentarios.js          # API de comentarios/observaciones
│   │   ├── curadores.js            # Servicios para curadores
│   │   ├── Especie.js              # CRUD de especies/especímenes
│   │   ├── reference.js            # Gestión de referencias/colecciones
│   │   ├── Ubicacion.js            # Servicios de ubicación geográfica
│   │   └── usuarios.js             # Gestión de perfiles de usuario
│   ├── components/                 # Componentes reutilizables
│   │   ├── correcciones/            # Módulo de correcciones
│   │   │   └── observationsTable.jsx
│   │   ├── curadores/             # Módulo para curadores
│   │   │   └── curadores.jsx
│   │   ├── especies/               # Módulo principal de especies
│   │   │   ├── comentariosDialog.jsx
│   │   │   ├── especieDialog.jsx
│   │   │   ├── listaEspecies.jsx
│   │   │   └── form/
│   │   │       └── especiesForm.jsx
│   │   ├── exportación/            # Módulo de exportación
│   │   │   └── exportación.jsx
│   │   ├── nfts/                   # Módulo NFTs/Contratos inteligentes
│   │   │   └── listNfts.jsx
│   │   ├── referencias/            # Módulo de colecciones/referencias
│   │   │   ├── referenciaDialog.jsx
│   │   │   └── referenciasTable.jsx
│   │   ├── ui/                     # Componentes UI reutilizables
│   │   │   └── Alert.jsx
│   │   └── usuarios/               # Gestión de usuarios
│   │       ├── UsuarioDialog.jsx
│   │       └── UsuariosAdmin.jsx
│   ├── context/                    # Contextos React para estado global
│   │   ├── NotificationsContext.jsx # Sistema de notificaciones toast
│   │   └── TaskContext.jsx         # Contexto de tareas (legacy)
│   ├── lib/                        # Utilidades y lógica de negocio
│   │   ├── excel-especies-logic.js # Lógica de importación Excel
│   │   ├── export_tab_logic.js     # Lógica de exportación
│   │   ├── fields.js               # Definición de campos DarwinCore
│   │   ├── table-especie-logic.js  # Lógica de tablas de especies
│   │   ├── useWindowSize.js        # Hook para responsive design
│   │   └── validations.js          # Esquemas de validación Zod
│   ├── pages/                      # Páginas principales
│   │   ├── form.jsx                # Formulario de registro de especies
│   │   ├── home.jsx                # Dashboard principal
│   │   ├── login.jsx               # Página de autenticación
│   │   ├── NotFound.jsx            # Página 404
│   │   ├── PasswordChangeDialog.jsx # Cambio de contraseña
│   │   ├── PerfilUsuario.jsx       # Gestión del perfil
│   │   └── referencias.jsx         # Página de colecciones
│   ├── supabase/                   # Configuración de base de datos
│   │   └── client.jsx              # Cliente Supabase
│   ├── types/                      # Definiciones TypeScript (vacío)
│   └── utils/                      # Utilidades varias (vacío)
├── eslint.config.js                # Configuración ESLint
├── index.html                      # Template HTML
├── package.json                    # Dependencias y scripts
├── postcss.config.js               # Configuración PostCSS
├── tailwind.config.js              # Configuración Tailwind CSS
├── vercel.json                     # Configuración de deployment
└── vite.config.js                  # Configuración Vite
```

---

## 🔐 SISTEMA DE AUTENTICACIÓN Y ROLES

### Flujo de Autenticación

El sistema utiliza **Supabase Auth** para manejar la autenticación con las siguientes características:

1. **Autenticación requerida:** Todas las rutas excepto `/login` requieren autenticación
2. **Persistencia de sesión:** Las sesiones se mantienen automáticamente
3. **Redirección automática:** Usuarios no autenticados son redirigidos a `/login`

### Roles del Sistema

#### 1. **Administrador**
**Permisos completos del sistema:**
- Dashboard con métricas generales
- Gestión completa de especies/especímenes
- Visualización de especies a cargo de curadores
- Sistema de correcciones y comentarios
- Módulo de acciones/exportaciones
- Gestión de colecciones/referencias
- Administración de usuarios del sistema
- Acceso total a todas las funcionalidades

**Rutas disponibles:**
- `/` - Dashboard
- `/Especies` - Especímenes en consulta
- `/curadores` - Especímenes a cargo
- `/Correcciones` - Sistema de correcciones
- `/Exportación` - Acciones y exportaciones
- `/referencias` - Gestión de colecciones
- `/usuarios` - Administración de usuarios

#### 2. **Recolector**
**Permisos limitados para recolección:**
- Dashboard básico con sus propios registros
- Consulta de especies/especímenes (solo lectura)
- Gestión de perfil personal

**Rutas disponibles:**
- `/` - Dashboard personal
- `/Especies` - Especímenes en consulta (consulta)
- `/perfil` - Gestión de perfil

#### 3. **Curador**
**Permisos especializados para curaduría:**
- Dashboard con métricas de curaduría
- Gestión de especies/especímenes
- Sistema de correcciones y comentarios
- Visualización de especímenes a cargo
- Acceso a NFTs/contratos inteligentes
- Gestión de perfil

**Rutas disponibles:**
- `/` - Dashboard de curaduría
- `/Especies` - Especímenes en consulta
- `/Correcciones` - Sistema de correcciones
- `/curadores` - Especímenes a cargo
- `/perfil` - Gestión de perfil

---

## 🗃️ INTEGRACIÓN CON BASE DE DATOS

### Configuración Supabase

**Archivo:** `src/supabase/client.jsx`

```javascript
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

**Variables de entorno requeridas:**
- `VITE_SUPABASE_URL`: URL del proyecto Supabase
- `VITE_SUPABASE_ANON_KEY`: Clave pública del proyecto

### Esquema de Base de Datos

#### Tablas Principales

**1. `profiles` - Perfiles de usuario**
- `id` (UUID, PK) - ID del usuario
- `email` (TEXT) - Correo electrónico
- `full_name` (TEXT) - Nombre completo
- `scientific_name` (TEXT) - Nombre científico/código recolector
- `orcid` (TEXT) - Identificador ORCID
- `role_id` (INT, FK) - Referencia a roles
- `created_at` (TIMESTAMP) - Fecha de creación

**2. `roles` - Roles del sistema**
- `id` (INT, PK) - ID del rol
- `name` (TEXT) - Nombre del rol (Administrador, Curador, Recolector)

**3. `especies` - Registro de especímenes**
- `id` (UUID, PK) - ID único del espécimen
- `scientificName` (TEXT) - Nombre científico
- `created_by` (UUID, FK) - Usuario creador
- `reference_by` (UUID, FK) - Referencia/colección
- `estado` (INT, FK) - Estado del espécimen
- Campos DarwinCore (50+ campos según estándares)
- `created_at` (TIMESTAMP) - Fecha de creación

**4. `reference` - Colecciones/Referencias**
- `id` (UUID, PK) - ID de la referencia
- `referencia` (TEXT) - Nombre de la colección
- `catalogNumber` (TEXT) - Número de catálogo
- `id_curador` (UUID, FK) - Curador asignado
- `created_at` (TIMESTAMP) - Fecha de creación

**5. `comentarios` - Sistema de observaciones**
- `id` (UUID, PK) - ID del comentario
- `especie_id` (UUID, FK) - Referencia al espécimen
- `author_id` (UUID, FK) - Autor del comentario
- `cuerpo` (TEXT) - Contenido del comentario
- `campo` (TEXT) - Campo específico comentado
- `aprobado` (BOOLEAN) - Estado de aprobación
- `created_at` (TIMESTAMP) - Fecha de creación

**6. `estado_especie` - Estados de especímenes**
- `id` (INT, PK) - ID del estado
- `code` (TEXT) - Código del estado
- `name` (TEXT) - Nombre del estado

---

## 📊 MÓDULOS FUNCIONALES

### 1. Dashboard Principal (`/`)

**Archivo:** `src/pages/home.jsx`

**Funcionalidades:**
- Métricas generales del sistema
- Gráficos de barras por colección (Recharts)
- Gráficos circulares de aprobación
- Estadísticas de especies por referencia
- Responsive design con breakpoints

**APIs utilizadas:**
- `getReferences()` - Obtener colecciones
- `getEspecieByReferenceUser()` - Especies por usuario y referencia

### 2. Gestión de Especies (`/Especies`)

**Archivo:** `src/components/especies/listaEspecies.jsx`

**Funcionalidades:**
- Lista paginada de especímenes
- Filtros por estado y búsqueda
- Acciones CRUD (Crear, Leer, Actualizar, Eliminar)
- Exportación a Excel
- Sistema de comentarios integrado
- Responsive con paginación adaptativa

**Componentes relacionados:**
- `especieDialog.jsx` - Modal de edición
- `comentariosDialog.jsx` - Sistema de comentarios
- `form/especiesForm.jsx` - Formulario dinámico

### 3. Formulario de Registro (`/Form`)

**Archivo:** `src/pages/form.jsx`

**Funcionalidades:**
- Formulario multi-sección (6 secciones DarwinCore)
- Validación con Zod schemas
- Modo creación y edición
- Modo curador para comentarios
- Guardado automático por secciones

**Secciones del formulario:**
1. **Información del evento** - Datos de recolección
2. **Taxonomía** - Clasificación taxonómica
3. **Registro** - Datos del registro biológico
4. **Otros datos** - Información adicional
5. **Familia** - Ubicación geográfica
6. **Datos** - Información institucional

### 4. Sistema de Correcciones (`/Correcciones`)

**Archivo:** `src/components/correcciones/observationsTable.jsx`

**Funcionalidades:**
- Tabla de comentarios por autor
- Edición en línea de comentarios
- Sistema de aprobación
- Filtros y búsqueda
- Responsive design

### 5. Gestión de Colecciones (`/referencias`)

**Archivo:** `src/components/referencias/referenciasTable.jsx`

**Funcionalidades:**
- CRUD de colecciones/referencias
- Asignación de curadores
- Numeración de catálogo
- Historial de creación

### 6. Administración de Usuarios (`/usuarios`)

**Archivo:** `src/components/usuarios/UsuariosAdmin.jsx`

**Funcionalidades:**
- Creación de usuarios con validación estricta
- Asignación de roles
- Gestión de perfiles
- Validación de dominio institucional (@unbosque.edu.co)
- Campos obligatorios: ORCID, nombre científico

### 7. Exportación y Acciones (`/Exportación`)

**Archivo:** `src/components/exportación/exportación.jsx`

**Funcionalidades:**
- Exportación masiva a Excel
- Filtros por colección y estado
- Descarga de plantillas
- Estadísticas de exportación

---

## 🎨 SISTEMA DE DISEÑO

### Paleta de Colores Corporativos

**Archivo:** `src/index.css`

**Colores principales:**
- **Verde institucional:** `#1b5e20` (oscuro), `#2e7d32` (medio), `#4caf50` (claro)
- **Amarillo institucional:** `#f57f17` (principal), `#fbc02d` (medio), `#ffeb3b` (claro)

### Clases Utilitarias UB (Universidad El Bosque)

**Componentes base:**
- `.ub-container` - Contenedor principal con gradiente
- `.ub-card` - Tarjetas con estilo corporativo
- `.ub-button-primary` - Botón principal verde
- `.ub-button-secondary` - Botón secundario amarillo
- `.ub-input` - Campos de entrada estilizados
- `.ub-sidebar` - Sidebar con gradiente institucional

**Navegación:**
- `.ub-nav-item` - Items de navegación
- `.ub-nav-item-active` - Item activo (amarillo)

**Tipografía:**
- `.ub-title` - Títulos principales
- `.ub-subtitle` - Subtítulos
- `.ub-text-primary` - Texto principal verde

### Responsive Design

**Hook personalizado:** `src/lib/useWindowSize.js`

**Breakpoints:**
- `xs`: < 640px
- `sm`: 640px - 768px
- `md`: 768px - 1024px
- `lg`: 1024px - 1280px
- `xl`: > 1280px

---

## 🔧 VALIDACIÓN Y SCHEMAS

### Sistema de Validación con Zod

**Archivo:** `src/lib/validations.js`

**Schemas principales:**

1. **DatosSchema** - Información institucional
2. **TaxonSchema** - Clasificación taxonómica
3. **EventoSchema** - Datos del evento de recolección
4. **RegistreSchema** - Información del registro
5. **FamilySchema** - Ubicación geográfica
6. **OtherSchema** - Coordenadas y elevación

**Validaciones especializadas:**
- Nombres científicos con regex específico
- Coordenadas geográficas con rangos válidos
- Fechas en formato ISO 8601
- Correos con dominio institucional
- Códigos institucionales normalizados

### Campos DarwinCore

**Archivo:** `src/lib/fields.js`

**Categorías de campos:**
- **Taxonomía:** 20+ campos con nombres científicos, autoría, clasificación
- **Evento:** 15+ campos de recolección, preparaciones, estado
- **Registro:** 10+ campos de protocolo, fecha, hábitat
- **Ubicación:** 15+ campos geográficos y coordenadas
- **Datos:** 10+ campos institucionales y metadatos

---

## 🔔 SISTEMA DE NOTIFICACIONES

### NotificationsContext

**Archivo:** `src/context/NotificationsContext.jsx`

**Funcionalidades:**
- Toast notifications con autoclose
- 4 variantes: success, error, warning, info
- Límite configurable de notificaciones
- Animaciones CSS personalizadas
- Tema corporativo Universidad El Bosque

**Uso:**
```javascript
import { useNotifications } from './context/NotificationsContext'

const notifications = useNotifications()
notifications.success('Operación exitosa', { title: 'Éxito' })
notifications.error('Error en la operación', { duration: 5000 })
```

### Componente Alert

**Archivo:** `src/components/ui/Alert.jsx`

**Características:**
- Componente reutilizable para alertas embebidas
- 4 variantes visuales
- Soporte para título y contenido
- Botón de cierre opcional
- Completamente accesible

---

## 📁 LÓGICA DE NEGOCIO

### Gestión de Excel

**Archivo:** `src/lib/excel-especies-logic.js`

**Funcionalidades:**
- Importación masiva desde Excel
- Mapeo automático de columnas DarwinCore
- Validación de datos importados
- Generación de plantillas Excel

### Lógica de Exportación

**Archivo:** `src/lib/export_tab_logic.js`

**Funcionalidades:**
- Exportación filtrada por criterios
- Formato Excel compatible con DarwinCore
- Metadatos de exportación
- Compresión de archivos grandes

### Gestión de Tablas

**Archivo:** `src/lib/table-especie-logic.js`

**Funcionalidades:**
- Paginación adaptativa
- Filtros dinámicos
- Ordenamiento múltiple
- Búsqueda en tiempo real

---

## 🚀 DEPLOYMENT Y CONFIGURACIÓN

### Scripts de NPM

```json
{
  "dev": "vite",                    // Servidor de desarrollo
  "build": "vite build",           // Build de producción
  "preview": "vite preview",       // Preview del build
  "lint": "eslint .",              // Linting del código
  "format": "prettier --write .", // Formateo del código
  "format:check": "prettier --check ." // Verificación de formato
}
```

### Configuración de Vite

**Archivo:** `vite.config.js`

```javascript
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
    plugins: [react()],
})
```

### Configuración de Vercel

**Archivo:** `vercel.json`

- Configuración para deployment en Vercel
- SPA routing configurado
- Optimizaciones de build

### Variables de Entorno

**.env (requerido):**
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 🔒 SEGURIDAD

### Autenticación

- Autenticación JWT con Supabase
- Row Level Security (RLS) en base de datos
- Sesiones persistentes y seguras
- Logout automático en caso de token expirado

### Autorización

- Control de acceso basado en roles
- Validación de permisos en cada ruta
- Restricción de APIs por usuario
- Filtros de datos por usuario autenticado

### Validación de Datos

- Validación client-side con Zod
- Sanitización de inputs
- Validación de dominio institucional
- Regex para campos especializados

---

## 🐛 MANEJO DE ERRORES

### Estrategias de Error

1. **Errores de red:** Retry automático y fallbacks
2. **Errores de validación:** Mensajes específicos por campo
3. **Errores de autenticación:** Redirección automática
4. **Errores 404:** Página personalizada
5. **Errores de permisos:** Mensajes informativos

### Logging

- Console.error para debugging
- Notificaciones toast para usuarios
- Estados de loading y error en UI

---

## 🧪 TESTING

### Herramientas Configuradas

- ESLint con reglas de React
- Prettier para formateo consistente
- Configuración base para testing (expandible)

### Recomendaciones

1. **Unit testing:** Jest + React Testing Library
2. **E2E testing:** Cypress o Playwright
3. **API testing:** Supabase testing utilities
4. **Visual testing:** Storybook

---

## 📈 MÉTRICAS Y MONITOREO

### Performance

- Bundle size optimizado con Vite
- Code splitting por rutas
- Lazy loading de componentes pesados
- Optimización de imágenes

### Analytics

- Preparado para Google Analytics
- Eventos de interacción configurables
- Métricas de uso por módulo

---

## 🔄 MANTENIMIENTO

### Actualización de Dependencias

```bash
# Verificar dependencias desactualizadas
npm outdated

# Actualizar dependencias menores
npm update

# Actualizar dependencias mayores (cuidado)
npm install package@latest
```

### Backup y Recuperación

- Base de datos respaldada automáticamente por Supabase
- Código versionado en Git
- Deployment automático desde Git

### Logs y Debugging

- Logs de Supabase para queries
- Console logs en desarrollo
- Error boundaries para captura de errores React

---

## 📞 CONTACTO Y SOPORTE

### Información del Proyecto

**Desarrollador:** Sistema desarrollado para Universidad El Bosque  
**Repositorio:** FrontendSIMUBIO  
**Tecnologías:** React + Vite + Supabase + Tailwind CSS  

### Documentación Adicional

- **DarwinCore:** https://dwc.tdwg.org/
- **Supabase:** https://supabase.com/docs
- **React:** https://react.dev/
- **Tailwind CSS:** https://tailwindcss.com/docs

---

## 📋 CHECKLIST DE DEPLOYMENT

### Pre-deployment

- [ ] Variables de entorno configuradas
- [ ] Build de producción exitoso
- [ ] Linting sin errores
- [ ] Testing básico completado
- [ ] Optimización de imágenes
- [ ] Configuración de Vercel/hosting

### Post-deployment

- [ ] Verificar rutas funcionando
- [ ] Probar autenticación
- [ ] Verificar integración con Supabase
- [ ] Comprobar responsive design
- [ ] Validar formularios
- [ ] Confirmar sistema de notificaciones

---

**Fecha de creación:** Octubre 2025  
**Versión del manual:** 1.0  
**Próxima revisión:** Según actualizaciones del sistema

---

*Este manual técnico proporciona una visión completa del sistema SIMUBIO Frontend para facilitar el mantenimiento, desarrollo futuro y transferencia de conocimiento.*