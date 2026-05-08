# Country Explorer

Aplicación full-stack para explorar países del mundo. El frontend en React consume una API propia en NestJS, que a su vez consulta la [REST Countries API](https://restcountries.com/v3.1/all).

## Stack

- **Frontend:** React + Vite + TypeScript
- **Backend:** NestJS + TypeScript
- **API externa:** restcountries.com

---

## Instalación

### Backend

```bash
cd backend
npm install
npm run start:dev
```

Corre en `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Corre en `http://localhost:5173`

> Asegúrate de tener el backend corriendo antes de abrir el frontend.

---

## Uso de la API

```
GET /countries                          → todos los países
GET /countries?region=Europe            → filtrar por región
GET /countries?sort=name_asc            → A → Z
GET /countries?sort=name_desc           → Z → A
GET /countries?sort=pop_desc            → mayor población
GET /countries?sort=pop_asc             → menor población
GET /countries?region=Asia&sort=pop_desc → combinado
```

---

## Funcionalidades

- Búsqueda en tiempo real por nombre
- Filtro por región
- Ordenamiento por nombre y población (asc/desc)
- Diseño responsivo

---

## Estructura del proyecto

```
prueba_tecnica_IDEA/
├── backend/
│   └── src/
│       ├── countries/
│       │   ├── interfaces/country.interface.ts
│       │   ├── countries.controller.ts
│       │   ├── countries.module.ts
│       │   └── countries.service.ts
│       ├── app.module.ts
│       └── main.ts
└── frontend/
    └── src/
        ├── components/
        ├── services/
        ├── types/
        └── App.tsx
```