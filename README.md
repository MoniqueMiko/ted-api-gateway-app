# Ted API Gateway App

Este projeto é um **API Gateway** construído com [NestJS](https://nestjs.com/), que faz comunicação com microserviços via **Redis**. Ele utiliza **JWT para autenticação**, e é totalmente escrito em TypeScript.

## 📦 Tecnologias Principais

- [NestJS v11](https://docs.nestjs.com/)
- [Redis](https://redis.io/)
- [JWT](https://jwt.io/)
- [Passport](https://www.passportjs.org/)
- [RxJS](https://rxjs.dev/)
- [Jest](https://jestjs.io/) + Supertest para testes
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) para formatação e linting

---

## 🚀 Scripts Disponíveis

| Comando               | Descrição                                        |
|----------------------|--------------------------------------------------|
| `npm run start`      | Inicia a aplicação                              |
| `npm run start:dev`  | Inicia com `watch` (modo desenvolvimento)       |
| `npm run start:debug`| Inicia em modo debug                            |
| `npm run start:prod` | Inicia em produção (compilado)                  |
| `npm run build`      | Compila o projeto (dist/)                       |
| `npm run format`     | Formata os arquivos com Prettier                |
| `npm run lint`       | Aplica ESLint nos arquivos `.ts`                |
| `npm run test`       | Executa os testes unitários                     |
| `npm run test:watch` | Executa testes unitários em modo observação     |
| `npm run test:cov`   | Executa testes com relatório de cobertura       |
| `npm run test:e2e`   | Executa testes end-to-end                        |

---

## 🔐 Autenticação

Este projeto utiliza JWT com o PassportStrategy para autenticação. O token JWT pode ser enviado das seguintes formas:

| Local                                 | Exemplo                                     | Descrição                                 |
|----------------------------           |---------------------------------------------|-------------------------------------------|
| Header HTTP `Authorization`           | `Authorization: Bearer <Token>`             | Cabeçalho HTTP com chave e valor          |
| Ferramenta de API (Insomnia, Postman) | Usar opção **Bearer Token** e colar o token | Autenticação via interface da ferramenta  |

A chave secreta `JWT_SECRET` deve estar definida no `.env`.

---

## 🔄 Redis
A comunicação entre os microserviços é feita via Redis (modo *pub/sub*), usando o `ClientProxy` do NestJS com transporte `REDIS`. 
Certifique-se de que o Redis esteja rodando localmente (porta padrão `6379`).

---

## 🧪 Testes

- Testes unitários estão localizados em `*.spec.ts`.
- Para rodar com cobertura:
```bash
npm run test:cov
````

---

## 📚 Swagger
A documentação da API está disponível automaticamente em:

http://localhost:3000/api

A interface Swagger é gerada com base nos DTOs e decoradores do NestJS.

---

## 📁 Estrutura do Projeto

```
src/
├── config/                        # Configurações e guards relacionados à autenticação
│   ├── jwt-guard.guard.ts
│   ├── jwt-guard.guard.spec.ts
│   ├── jwt-optional.guard.ts
│   ├── jwt-optional.guard.spec.ts
│   ├── jwt.strategy.ts
│   └── jwt.strategy.spec.ts
├── controllers/                   # Controllers responsáveis pelas rotas da API
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   └── auth.controller.spec.ts
│   └── url-shortener/
│       ├── url-shortener.controller.ts
│       └── url-shortener.controller.spec.ts
├── dto/                           # DTOs utilizados para documentação Swagger
│   ├── auth.dto.ts
│   └── url-shortener.dto.ts
├── exceptions/                    # Tratamento de exceções customizadas
│   ├── http-exception.ts
│   └── http-exception.spec.ts
├── service/                       
│   └── client-proxy.service.ts    # Proxy de comunicação com microserviços via Redis
├── app.module.ts                  # Módulo raiz da aplicação
└── main.ts                        # Ponto de entrada da aplicação

```

---

## ⚙️ Requisitos

* Node.js 18+
* Redis rodando localmente
* Variáveis de ambiente no `.env`, incluindo:

```

JWT_SECRET=suachavesecreta
REDIS_PORT = 6379
REDIS_HOST = localhost

```
---

## 🔗 Microserviços Relacionados

- [🔐 Auth Microservice (NestJS)](https://github.com/MoniqueMiko/ted-auth-microservice)
- [🧩 Url Shortener Microservice (NestJS)](https://github.com/MoniqueMiko/ted-url-shortener-microservice)

---

## 🛠️ Build

Para compilar o projeto:

```bash
npm run build
```

O código será gerado na pasta `dist/`.

---

## 🧭 Melhorias Futuras

- Criar histórico para atualizações e exclusões de URLs encurtadas  
- Adicionar paginação na listagem de URLs  
- Criar endpoint para inativar um usuário  

---

## 🧑‍💻 Autor
- Monique Lourenço -> monique_lourenzia@hotmail.com
---

## 📄 Licença

Este projeto é **UNLICENSED**. Uso restrito conforme especificado.

`````