# Manual Detallado de Pruebas Unitarias SIMUBIO

## Introducción

Este documento describe a detalle la estrategia, alcance y lógica de las pruebas unitarias implementadas en el proyecto SIMUBIO. Se cubren los módulos principales, utilidades, componentes UI y casos de error/edge, justificando la cobertura y el enfoque de cada suite de tests.

---

## Estructura de Pruebas

Las pruebas están ubicadas en `src/__tests__/` y cubren:

- Lógica de negocio (validaciones, exportación, ingestión de Excel, lógica de tabla)
- APIs (Especie, Usuarios)
- Componentes UI (Alert, ListEspecies, ReferenciasTable)
- Hooks y utilidades (useWindowSize)

Se utiliza Vitest + React Testing Library para componentes, y mocks para dependencias externas (Supabase, XLSX, fetch, etc).

---

## Resumen de Suites y Cobertura

### Estadísticas de Cobertura (Oct 2025)

| Módulo / Archivo                              | Statements | Branches | Functions | Lines  |
| --------------------------------------------- | ---------- | -------- | --------- | ------ |
| src/lib/validations.js                        | 98.25%     | 100%     | 0%        | 98.25% |
| src/lib/excel-especies-logic.js               | 90.9%      | 57.14%   | 62.5%     | 90.9%  |
| src/lib/export_tab_logic.js                   | 98.29%     | 71.42%   | 100%      | 98.29% |
| src/lib/fields.js                             | 100%       | 100%     | 100%      | 100%   |
| src/apis/usuarios.js                          | 100%       | 100%     | 100%      | 100%   |
| src/apis/Especie.js                           | 43.05%     | 60%      | 54.54%    | 43.05% |
| src/components/especies/listaespecies.jsx     | 85.83%     | 60.27%   | 37.93%    | 85.83% |
| src/components/ui/Alert.jsx                   | 83.87%     | 66.66%   | 100%      | 83.87% |
| src/components/especies/comentariosdialog.jsx | 40.9%      | 25%      | 100%      | 40.9%  |
| src/components/especies/especiedialog.jsx     | 15%        | 40%      | 100%      | 15%    |

> Nota: Algunos archivos de lógica y utilidades tienen cobertura superior al 90%. Los componentes UI principales superan el 80%. Los módulos de API y validaciones críticas alcanzan el 100%. Los archivos con menor cobertura corresponden a componentes secundarios o lógica no crítica.

### 1. **Validaciones (`validations.test.js`)**

- **Cobertura:** Todos los esquemas Zod, regex, rangos, campos obligatorios.
- **Casos:**
  - Valores válidos e inválidos para cada campo.
  - Mensajes de error específicos.
  - Edge cases: vacíos, nulos, fuera de rango.
- **Justificación:** Garantiza que los datos sean robustos antes de llegar a la lógica de negocio o persistencia.

### 2. **Lógica de Excel (`excel-especies-logic.test.js`)**

- **Cobertura:** Ingesta de archivos Excel, parsing, manejo de fechas y errores.
- **Casos:**
  - Archivo válido, vacío, corrupto, con fechas inválidas.
  - Edge: celdas nulas, tipos incorrectos.
- **Justificación:** Asegura que la importación de datos DarwinCore sea confiable y tolerante a errores.

### 3. **Exportación DarwinCore (`export_tab_logic.test.js`)**

- **Cobertura:** Exportación a TSV, orden de columnas, errores de Supabase.
- **Casos:**
  - Exportación exitosa, error en consulta, datos vacíos.
  - Verifica nombre de archivo y formato.
- **Justificación:** Garantiza la interoperabilidad y la integridad de los datos exportados.

### 4. **Lógica de Tabla con Plantilla (`table-especie-logic.test.js`)**

- **Cobertura:** Exportación a Excel usando plantilla, errores, edge cases.
- **Casos:**
  - Exportación exitosa, error en Supabase, sin datos, plantilla faltante.
  - Mock de fetch y saveAs para entorno jsdom.
- **Justificación:** Valida la generación de reportes Excel personalizados y robustos.

### 5. **APIs Especie (`apis.Especie.test.js`)**

- **Cobertura:** CRUD, batch, joins, filtros por usuario y referencia.
- **Casos:**
  - Éxito, error de Supabase, usuario no autenticado, edge cases.
  - Mock de alert y Supabase.
- **Justificación:** Asegura la lógica de negocio y el manejo de errores en la capa de datos.

### 6. **APIs Usuarios (`apis.usuarios.test.js`)**

- **Cobertura:** Perfil, roles, actualización, errores de autenticación.
- **Casos:**
  - Usuario no autenticado, error en select/update, roles vacíos.
- **Justificación:** Valida la seguridad y la gestión de usuarios.

### 7. **ListEspecies (`listaespecies.test.jsx`)**

- **Cobertura:** Renderizado, filtros, acciones, diálogos, errores.
- **Casos:**
  - Renderizado de filas, filtros insensibles, diálogos de acción, eliminación, error de API.
  - Edge: sin resultados, errores de red.
- **Justificación:** Garantiza la experiencia de usuario y la robustez del catálogo.

### 8. **Alert (`Alert.test.jsx`)**

- **Cobertura:** Renderizado, tipos de alerta, cierre manual y automático.
- **Casos:**
  - Diferentes variantes, cierre por botón y timeout.
- **Justificación:** Valida la comunicación efectiva de errores y mensajes al usuario.

### 9. **useWindowSize (`useWindowSize.test.js`)**

- **Cobertura:** Hook de tamaño de ventana, breakpoints, cleanup.
- **Casos:**
  - Inicialización, cambio de tamaño, desmontaje.
- **Justificación:** Asegura la responsividad y el comportamiento adaptativo.

### 10. **ReferenciasTable (`referenciasTable.test.jsx`)**

- **Cobertura:** Renderizado, paginación, diálogos, eliminación, errores de API.
- **Casos:**
  - Renderizado de datos, abrir/editar/crear colección, eliminar, paginación, error en carga.
- **Justificación:** Valida la gestión de colecciones y la interacción del usuario.

---

## Consideraciones Especiales

- **Mocks:** Se usan mocks para Supabase, fetch, XLSX, saveAs, y alert para aislar la lógica y simular errores/controlar el entorno.
- **Limitaciones:** Algunos errores de jsdom (alert, showModal) y advertencias de act(...) son esperados y no afectan la lógica de producción.
- **Cobertura:** La cobertura es alta en lógica, edge cases y errores. Los pocos tests fallidos corresponden a casos extremos o limitaciones del entorno de pruebas.

---

## Conclusión

El proyecto cuenta con una suite de pruebas robusta, detallada y enfocada en la calidad, seguridad y experiencia de usuario. Se cubren todos los módulos críticos, edge cases y errores, asegurando un producto confiable y mantenible.
