# 🏗️ Soberana Backend

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

## 📋 Descripción

Backend desarrollado con NestJS para la gestión de bodegas y usuarios.

## 🚀 Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- PostgreSQL (v12 o superior)
- Git

## ⚙️ Configuración del Entorno

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd back
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   # Puerto de la aplicación
   PORT=3000
   
   # Configuración de la base de datos PostgreSQL
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_basedatos?schema=public"
   
   # Configuración de JWT (opcional, para autenticación)
   JWT_SECRET=tu_clave_secreta_jwt
   JWT_EXPIRES_IN=1d
   ```

## 🛠️ Comandos Útiles

### Desarrollo
```bash
# Iniciar en modo desarrollo (con hot-reload)
npm run start:dev

# Iniciar en modo producción
npm run start:prod

# Generar cliente de Prisma
npx prisma generate

# Aplicar migraciones
npx prisma migrate dev

# Abrir el cliente de Prisma Studio
npx prisma studio
```

### Pruebas
```bash
# Ejecutar pruebas unitarias
npm run test

# Ejecutar pruebas e2e
npm run test:e2e

# Ejecutar pruebas con cobertura
npm run test:cov
```

## 🗄️ Estructura del Proyecto

```
src/
├── auth/           # Módulo de autenticación
├── products/       # Módulo de productos
├── inventory/      # Módulo de inventario
├── users/          # Módulo de usuarios
├── warehouses/     # Módulo de bodegas
└── main.ts         # Punto de entrada de la aplicación
```

## 🔒 Variables de Entorno

| Variable       | Descripción                                  | Valor por defecto |
|----------------|----------------------------------------------|-------------------|
| `PORT`         | Puerto en el que se ejecuta la aplicación    | `3000`            |
| `DATABASE_URL` | URL de conexión a la base de datos PostgreSQL | -                |
| `JWT_SECRET`   | Clave secreta para JWT                       | -                |
| `JWT_EXPIRES_IN`| Tiempo de expiración del token JWT          | `1d`             |

## 📄 Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE).
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
