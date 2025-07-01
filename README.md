# Ted API Gateway App

This project is an **API Gateway** built with [NestJS](https://nestjs.com/) that communicates with microservices via **Redis**. It uses **JWT for authentication** and is fully written in TypeScript.

## 📦 Main Technologies

- [NestJS v11](https://docs.nestjs.com/)
- [Redis](https://redis.io/)
- [JWT](https://jwt.io/)
- [Passport](https://www.passportjs.org/)
- [RxJS](https://rxjs.dev/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) for formatting and linting

---

## 🚀 Available Scripts

| Command               | Description                                      |
|----------------------|-------------------------------------------------|
| `npm run start`      | Starts the application                          |
| `npm run start:dev`  | Starts with watch mode (development)            |
| `npm run start:debug`| Starts in debug mode                            |
| `npm run start:prod` | Starts in production mode (compiled)            |
| `npm run build`      | Compiles the project (dist/)                    |
| `npm run format`     | Formats files using Prettier                    |
| `npm run lint`       | Runs ESLint on `.ts` files                      |
| `npm run test`       | Runs unit tests                                 |
| `npm run test:watch` | Runs unit tests in watch mode                   |
| `npm run test:cov`   | Runs tests with coverage report                 |
| `npm run test:e2e`   | Runs end-to-end tests                           |

---

## 🔐 Authentication

This project uses JWT with PassportStrategy for authentication. The JWT token can be sent in the following ways:

| Location                              | Example                                    | Description                                |
|---------------------------------------|--------------------------------------------|--------------------------------------------|
| HTTP Header `Authorization`           | `Authorization: Bearer <Token>`            | HTTP header with key and value             |
| API Tool (Insomnia, Postman)          | Use **Bearer Token** option and paste token| Authentication via API tool interface      |

The secret key `JWT_SECRET` must be set in the `.env` file.

---

## 🔄 Redis
Communication between microservices is done via Redis (pub/sub mode), using NestJS’s `ClientProxy` with `REDIS` transport.  
Make sure Redis is running locally (default port `6379`).

---

## 🧪 Tests

- Unit tests are located in `*.spec.ts` files.  
- To run tests with coverage:

```bash
npm run test:cov
```

---

## 📚 Swagger

The API documentation is automatically available at:

http://localhost:3000/swagger

The Swagger UI is generated based on DTOs and NestJS decorators.

---

## 📁 Project Structure

```
src/
├── config/                        # Authentication-related configs and guards
│   ├── jwt-guard.guard.ts
│   ├── jwt-guard.guard.spec.ts
│   ├── jwt-optional.guard.ts
│   ├── jwt-optional.guard.spec.ts
│   ├── jwt.strategy.ts
│   └── jwt.strategy.spec.ts
├── controllers/                   # Controllers responsible for API routes
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   └── auth.controller.spec.ts
│   └── url-shortener/
│       ├── url-shortener.controller.ts
│       └── url-shortener.controller.spec.ts
├── dto/                           # DTOs used for Swagger documentation
│   ├── auth.dto.ts
│   └── url-shortener.dto.ts
├── exceptions/                    # Custom exception handling
│   ├── http-exception.ts
│   └── http-exception.spec.ts
├── service/                       
│   └── client-proxy.service.ts    # Proxy for microservice communication via Redis
├── app.module.ts                  # Root module of the application
└── main.ts                        # Application entry point

```

---

## ⚙️ Requirements

* Node.js 18+
* Redis running locally
* Environment variables in .env file, including:

```

JWT_SECRET= yoursecretkey
REDIS_PORT = 6379
REDIS_HOST = localhost

```
---

## 🔗 Related Microservices

- [🔐 Auth Microservice (NestJS)](https://github.com/MoniqueMiko/ted-auth-microservice)
- [🧩 Url Shortener Microservice (NestJS)](https://github.com/MoniqueMiko/ted-url-shortener-microservice)

---

## 🛠️ Build

To compile the project:

```bash
npm run build
```

The compiled code will be generated in the dist/ folder.

---

## 🧭  Future Improvements

- Create history tracking for updates and deletions of shortened URLs.
- Add pagination to URL listings.
- Create endpoint to deactivate or update a user  
- Implement SSO login in the future  

---

## 🧑‍💻 Author
- 👩‍💻 Monique Lourenço -> monique_lourenzia@hotmail.com
---

## 📄 License

This project is UNLICENSED. Usage is restricted as specified.