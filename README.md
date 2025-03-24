# Product Controller - Backend

## Visão Geral
Este projeto é um backend desenvolvido com ``Node.js``, ``Express``, ``Prisma ORM`` e ``TypeScript``, seguindo os princípios do ``SOLID``, ``Clean Architecture`` e ``Clean Code``. Ele gerencia produtos e usuários, oferecendo ``autenticação JWT`` e armazenamento no ``PostgreSQL``. O projeto está sendo desenvolvido seguindo a metodologia ágil ``Scrum``.

## Tecnologias Utilizadas
- ``Node.js``
- ``Express``
- ``Prisma ORM``
- ``TypeScript``
- ``Docker``
- ``PostgreSQL``
- ``JWT Authentication``
- ``API RESTful``
- ``Scrum`` (com sprints documentadas no Notion)

## Estrutura de Pastas
```
src/
  ├── config/ (Configuração de variáveis de ambiente)
  ├── controllers/
  │     ├── product/
  │     ├── user/
  │     ├── report/
  │     ├── stock/
  ├── database/
  │     ├── prisma-client.ts
  ├── entities/
  │     ├── product.ts
  │     ├── stock.ts/
  │     ├── user.ts
  ├── middlewares/
  │     ├── authorization-routes.ts
  ├── repositories/
  │     ├── product/
  │     │     ├── prisma-product-repository.ts
  │     │     ├── product-repository.ts
  │     ├── user/
  │           ├── prisma-user-repository.ts
  │           ├── user-repository.ts
  │     ├── stock/
  │           ├── prisma-stock-repository.ts
  │           ├── stock-repository.ts
  ├── routes/
  │     ├── routes-product.ts
  │     ├── routes-user.ts
  │     ├── routes-stock.ts
  │     ├── routes-report.ts
  ├── use-cases/
  │     ├── product/
  │     ├── user/
  │     ├── stock/
  ├── main.ts
  ├── Dockerfile
  ├── docker-compose.yml
  ├── entrypoint.sh
  ├── .dockerignore
```

## Entidades
### Produto (`Product`)
```typescript
export interface Product {
    id: string;
    name: string;
    amount: number;
    value: number;
    createdAt: Date;
    updatedAt: Date;
}
```

### Usuário (`User`)
```typescript
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}
```
### Estoque (`Stock`)
```typescript
export interface StockMovement {
    id: string;
    productId: string;
    product?: Product;
    quantity: number;
    dateTime: Date;
    type: 'entrada' | 'saida';
    reason?: string;    
}
```

## Endpoints

### Produtos
- **POST** `/create` - Criar um novo produto
- **GET** `/all-products` - Listar todos os produtos
- **PUT** `/update/:id` - Atualizar um produto
- **DELETE** `/delete/:id` - Remover um produto

### Usuários
- **POST** `/create` - Criar um novo usuário
- **POST** `/login` - Autenticar usuário
- **GET** `/all-users` - Listar todos os usuários
- **PUT** `/update/:id` - Atualizar um usuário
- **DELETE** `/delete/:id` - Remover um usuário
- **GET** `/hello` - Rota de teste

### Relatórios
- **POST** `/reports/total-spent-by-month` - Total gasto em produtos por mês. (Para testar crie duas Query Parameters: startDate e enDate, no formato: YYYY-MM)
- **POST** `/reports/product-stock-period` - Estoque de produtos por período. (Para testar crie duas Query Parameters: startDate e enDate, no formato: YYYY-MM)

### Estoque
- **POST** `/stock/create` - Lançamentos em estoque de produtos, controlando a entrada e saída.

## Branches
O projeto utiliza duas branches principais:
- **`main`**: Contém a versão estável do código.
- **`develop`**: Contém as alterações em desenvolvimento antes de serem mescladas na `main`.

## Acompanhamento das Sprints
O projeto foi dividido em 4 sprints, o andamento do projeto e as sprints podem ser acompanhados diretamente no Notion:

[Acesse aqui a sprint-1](https://distinct-meadowlark-f51.notion.site/2bee374ed27e4ef8a1168ac13a7973e4?v=94381af86b224fbf9679caddeaa1ef32)

[Acesse aqui a sprint-2](https://distinct-meadowlark-f51.notion.site/1b93d1f0f622802eb054c5b57376587f?v=1b93d1f0f62281cebbdc000c73d8c6b9)

[Acesse aqui a sprint-3](https://distinct-meadowlark-f51.notion.site/1b93d1f0f62280cf8729d30183c20ea3?v=1b93d1f0f622819d80d9000c153b33c7)

[Acesse aqui a sprint-4](https://distinct-meadowlark-f51.notion.site/1b93d1f0f622800496f0c56631b44766?v=1b93d1f0f6228181a7f1000ce26cfece)

## Configuração do Ambiente
1. Clone o repositório:
   ```bash
   git clone https://github.com/jhondharkyson520/product-controller-backend.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd product-controller-backend
   ```
3. Configure as variáveis de ambiente no arquivo `.env`.
   Basta editar o arquivo `example.env`, altere-o de acordo com suas informações e o renomeie para `.env`.

4. Instale as dependências:
   ```bash
   npm install
   npx prisma generate
   npx prisma migrate dev
   ```

5. Execute o projeto com Docker:
   ```bash
   docker-compose up --build
   ```
6. O servidor estará disponível em `http://localhost:PORTA`.

## Licença
Este projeto está sob a licença MIT. Contribuições e sugestões são sempre bem vindas.
