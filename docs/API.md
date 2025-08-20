# Documentação da API

## Visão Geral

O SentinelTrack Mobile integra-se com uma API REST para gerenciamento de dados. Durante o desenvolvimento, utiliza dados mock para simular as operações.

## Base URL

\`\`\`
Produção: https://api.sentineltrack.com/v1
Desenvolvimento: Mock data (local)
\`\`\`

## Autenticação

Todas as requisições autenticadas devem incluir o token JWT no header:

\`\`\`
Authorization: Bearer <token>
\`\`\`

## Endpoints

### Autenticação

#### POST /auth/login
Realiza login do usuário.

**Request:**
\`\`\`json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "user": {
      "id": "1",
      "name": "Nome do Usuário",
      "email": "usuario@exemplo.com",
      "role": "admin"
    },
    "token": "jwt-token-aqui",
    "refreshToken": "refresh-token-aqui"
  }
}
\`\`\`

#### POST /auth/register
Registra novo usuário.

**Request:**
\`\`\`json
{
  "name": "Nome do Usuário",
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
\`\`\`

#### POST /auth/logout
Realiza logout do usuário.

#### POST /auth/refresh
Renova o token de acesso.

### Motocicletas

#### GET /motorcycles
Lista todas as motocicletas.

**Response:**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": "MT-001",
      "model": "Honda CG 160",
      "plate": "ABC-1234",
      "status": "active",
      "location": {
        "address": "Av. Paulista, 1000",
        "latitude": -23.5613,
        "longitude": -46.6565
      },
      "battery": 85,
      "lastUpdate": "2024-01-15T10:30:00Z",
      "driver": {
        "id": "D001",
        "name": "João Silva"
      },
      "alerts": []
    }
  ]
}
\`\`\`

#### GET /motorcycles/:id
Obtém detalhes de uma motocicleta específica.

#### POST /motorcycles
Cria nova motocicleta.

**Request:**
\`\`\`json
{
  "model": "Honda CG 160",
  "plate": "ABC-1234",
  "initialLocation": {
    "address": "Rua Exemplo, 123",
    "latitude": -23.5613,
    "longitude": -46.6565
  }
}
\`\`\`

#### PUT /motorcycles/:id
Atualiza dados de uma motocicleta.

**Request:**
\`\`\`json
{
  "model": "Honda CG 160",
  "plate": "ABC-1234",
  "status": "active"
}
\`\`\`

#### DELETE /motorcycles/:id
Remove uma motocicleta.

### Alertas

#### GET /alerts
Lista todos os alertas ativos.

**Response:**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": "A001",
      "type": "speed",
      "title": "Velocidade Excessiva",
      "description": "Moto #MT-001 - Av. Paulista",
      "severity": "high",
      "timestamp": "2024-01-15T10:15:00Z",
      "resolved": false
    }
  ]
}
\`\`\`

## Códigos de Status

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Requisição inválida
- `401` - Não autorizado
- `403` - Proibido
- `404` - Não encontrado
- `500` - Erro interno do servidor

## Tratamento de Erros

Todas as respostas de erro seguem o formato:

\`\`\`json
{
  "success": false,
  "message": "Descrição do erro",
  "code": "ERROR_CODE"
}
