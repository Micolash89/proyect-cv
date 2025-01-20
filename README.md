# CV Project 📄 

<div align="center">
<table border="0">
<tr>
<td>
  
![Next JS](https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000)

</td>
<td>
  
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

</td>
<td>
  
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

</td>
<td>
  
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

</td>
</tr>
</table>
</div>

Una aplicación moderna para la creación y gestión de currículums vitae construida con Next.js y TypeScript.

## 🚀 Características

![PDF](https://img.shields.io/badge/-PDF-red?style=flat-square&logo=adobe-acrobat-reader) **Generación de CV PDF** utilizando @react-pdf/renderer

![AI](https://img.shields.io/badge/-AI-fbbc05?style=flat-square&logo=google) **IA Generativa** integrada con Google AI

![Cloud](https://img.shields.io/badge/-Cloud-4285F4?style=flat-square&logo=cloudinary) **Almacenamiento en la nube** con Cloudinary para las imagenes

![Security](https://img.shields.io/badge/-Security-276DC3?style=flat-square&logo=auth0) **Autenticación segura** utilizando bcrypt y jose

![Database](https://img.shields.io/badge/-Database-2D3748?style=flat-square&logo=prisma) **Base de datos** gestionada con Prisma

![UI](https://img.shields.io/badge/tailwindcss-0F172A?&logo=tailwindcss) **UI moderna y responsive** con TailwindCSS

![Animation](https://img.shields.io/badge/-Animation-0055FF?style=flat-square&logo=framer) **Animaciones fluidas** usando Framer Motion

## 📋 Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Una cuenta en Cloudinary
- Base de datos (compatible con Prisma)

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/micolash89/cv-proyect.git
cd cv-proyect
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env.local
```

4. Configura tu base de datos con Prisma:
```bash
npx prisma generate
npx prisma db push
```

## 🚀 Scripts Disponibles

```bash
# Desarrollo
pnpm run dev
# o
yarn dev
```

## 🏗️ Estructura del Proyecto

```
cv-proyect/
├── app/
├── components/
├── lib/
├── database/
└── public/
```

## ✨ Agradecimientos

