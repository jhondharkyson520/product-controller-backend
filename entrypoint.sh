#!/bin/sh

echo "Aguardando o banco de dados iniciar..."
until nc -z db_product 5432; do
  sleep 2
done

echo "Banco de dados pronto! Rodando as migrações..."
npx prisma migrate deploy

echo "Iniciando a aplicação..."
node dist/src/main.js
