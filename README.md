# SIMUBIO Frontend

Proyecto React + Vite estilizado con Tailwind y paleta institucional (Universidad El Bosque).

## Notificaciones Corporativas

Se implementó un sistema global de notificaciones (toasts) y un componente `Alert` reutilizable.

### Uso de toasts

```jsx
import { useNotifications } from './context/NotificationsContext'

function Ejemplo() {
	const notifications = useNotifications()
	const guardar = () => {
		// ... lógica
		notifications.success('Guardado correctamente', { title: 'Éxito' })
	}
	return <button onClick={guardar}>Guardar</button>
}
```

Variantes disponibles: `success`, `error`, `warning`, `info`.

Parámetros opcionales: `{ title?: string, duration?: number }`.

### Componente Alert embebido

```jsx
import Alert from './components/ui/Alert'

<Alert variant="error" title="Error de validación">
	Debe completar los campos obligatorios
</Alert>
```

## Estilos Corporativos

Clases utilitarias en `index.css` prefijo `ub-` (ej: `ub-button-primary`, `ub-card`, `ub-input`).

## Scripts

Instalar dependencias:
```
npm install
```

Ejecutar en desarrollo:
```
npm run dev
```

Construir:
```
npm run build
```

Previsualizar build:
```
npm run preview
```
