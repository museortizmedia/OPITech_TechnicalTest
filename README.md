# OPITech Technical Test — Products Dashboard (Vue 3 + TypeScript)

Dashboard de productos para e-commerce desarrollado como prueba técnica **Frontend Senior** utilizando Vue 3, TypeScript, Pinia y TailwindCSS.  
La aplicación permite listar, buscar, filtrar, paginar y visualizar el detalle de productos.

---

# Demo Features

- Listado de productos
- Búsqueda por nombre (debounced)
- Filtro dinámico por categoría
- Paginación avanzada (tipo Google)
- Selector de cantidad por página (8 / 12 / 24 / 50)
- Vista detalle del producto
- Loading / Empty states
- UI responsive (mobile-first)
- Arquitectura desacoplada (API / Store / UI)
- Tipado completo con TypeScript

---

# Stack Tecnológico

- Vue 3 (Composition API)
- TypeScript
- Pinia (state management)
- Vue Router
- Axios
- Tailwind CSS
- Vite

---

# Estructura del Proyecto

```
src/
│
├── api/
│   └── products.api.ts
│
├── components/
│   ├── product/
│   │   ├── ProductCard.vue
│   │   ├── ProductFilters.vue
│   │   └── Pagination.vue
│   │
│   └── ui/
│       ├── LoadingState.vue
│       └── EmptyState.vue
│
├── composables/
│   └── useDebounce.ts
│
├── stores/
│   ├── products.store.ts
│   └── pagination.store.ts
│
├── views/
│   ├── ProductsDashboard.vue
│   └── ProductDetail.vue
│
├── router/
│   └── index.ts
│
└── types/
    └── product.ts
```

---

# Instalación

Clonar repositorio:

```
git clone https://github.com/museortizmedia/OPITech_TechnicalTest.git
```

Entrar al proyecto:

```
cd OPITech_TechnicalTest
```

Instalar dependencias:

```
npm install
```

---

# Ejecutar proyecto

```
npm run dev
```

Abrir en navegador:

```
http://localhost:5173
```

---

# Build producción

```
npm run build
```

Preview build:

```
npm run preview
```

---

# API

La aplicación utiliza MockAPI:

```
https://69ebb2ae97482ad5c5280110.mockapi.io/api/v1/products
```

La capa API está desacoplada en:

```
src/api/products.api.ts
```

Puede reemplazarse fácilmente por un backend real.

---

# Paginación

Sistema de paginación desacoplado basado en store:

```
pagination.store.ts
```

Features:

- páginas dinámicas
- límites configurables
- navegación inteligente
- estado global reutilizable

Ejemplo:

```
1 ... 4 5 [6] 7 8 ... 20
```

---

# Búsqueda

La búsqueda utiliza debounce:

```
useDebounce.ts
```

Evita múltiples llamadas al backend mientras el usuario escribe.

---

# Filtros

Las categorías se generan dinámicamente desde los productos:

```
store.categories
```

En un entorno real esto vendría desde:

```
GET /categories
```

---

# Arquitectura

Patrón utilizado:

```
UI Components
      ↓
Stores (Pinia)
      ↓
API Layer
      ↓
Backend / Mock
```

Beneficios:

- desacoplamiento
- escalabilidad
- testeable
- mantenible
- reusable

---

# Responsive Design

Mobile first con Tailwind:

Breakpoints:

- mobile
- sm
- md
- lg
- xl

Grid:

```
1 column mobile
2 columns tablet
4 columns desktop
```

---

# Scripts disponibles

```
npm run dev
npm run build
npm run preview
npm run lint
```

---

# Autor

Desarrollado por:

Diego Ortiz  
Frontend Developer — Vue.js + TypeScript

Repositorio:
https://github.com/museortizmedia/OPITech_TechnicalTest

We:
https://museortizmedia.github.io/

---

# Notas

MockAPI no provee total de registros, por lo tanto el total de paginación se simula:

```
pagination.setTotal(40)
```

En backend real se usaría:

```
X-Total-Count
```

o

```
{ data, total }
```

---

# Posibles mejoras

- Skeleton loading
- Infinite scroll
- Sorting
- Favorites
- Cart
- SSR
- Unit testing
- E2E testing
- Deploy CI/CD

---