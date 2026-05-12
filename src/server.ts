import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import action_route from './routes/action_route.js';
import userRoutes from './routes/user_route.js';
import squadRoutes from './routes/squad_route.js';
import authRoutes from './routes/auth_route.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
// culta metadados do servidor
app.use(helmet());

// permite pedidos do Frontend
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));

// 🛡️ previne forca bruta (maximo 100 pedidos em 15 min)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: "Demasiados pedidos a partir deste IP, tente novamente mais tarde." }
});
app.use(limiter);

// configuracaoo do swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WeDo API - Documentação Oficial',
      version: '1.1.0',
      description: 'API completa para gestão de Users, Squads e Actions. Inclui suporte para CRUD total (Create, Read, Update, Delete).',
    },
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'Servidor Local de Desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{ bearerAuth: [] }],
    paths: {
      // users
      '/api/auth/login': {
        post: {
          summary: 'Faz login e devolve o Token de Acesso',
          tags: ['Auth'],
          security: [],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', example: 'comandante@wedo.pt' },
                    password: { type: 'string', example: '123456' },
                  },
                },
              },
            },
          },
          responses: { 
            '200': { description: 'Sucesso - Token devolvido' }, 
            '401': { description: 'Credenciais inválidas' } 
          },
        },
      },
      '/api/users': {
        get: {
          summary: 'Lista todos os utilizadores',
          tags: ['Users'],
          responses: { '200': { description: 'Sucesso' } },
        },
        post: {
          summary: 'Cria um novo utilizador',
          tags: ['Users'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    nome: { type: 'string', example: 'Gil Dias' },
                    email: { type: 'string', example: 'gil@wedo.pt' },
                    password: { type: 'string', example: 'password_123' },
                    role: { type: 'string', example: 'ADMIN' },
                  },
                },
              },
            },
          },
          responses: { '201': { description: 'Criado' }, '400': { description: 'Erro de validação' } },
        },
      },
      '/api/users/{id}': {
        put: {
          summary: 'Substituição total de um utilizador',
          tags: ['Users'],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    nome: { type: 'string', example: 'Gil Dias' },
                    email: { type: 'string', example: 'gil@wedo.pt' },
                    password: { type: 'string', example: 'password_nova' },
                    role: { type: 'string', example: 'Admin' },
                  },
                },
              },
            },
          },
          responses: { '200': { description: 'Atualizado' }, '404': { description: 'Não encontrado' } },
        },
        patch: {
          summary: 'Atualização parcial (ex: apenas email)',
          tags: ['Users'],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', example: 'novo_email@wedo.pt' }
                  },
                },
              },
            },
          },
          responses: { '200': { description: 'Modificado' } },
        },
        delete: {
          summary: 'Eliminar um utilizador',
          tags: ['Users'],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { '204': { description: 'Apagado' } },
        },
      },

      // squads
      '/api/squads': {
        get: {
          summary: 'Lista todos os Squads e as suas respetivas Actions',
          tags: ['Squads'],
          responses: { '200': { description: 'Sucesso' } },
        },
        post: {
          summary: 'Criar um novo Squad',
          tags: ['Squads'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    nomeSquad: { type: 'string', example: 'Os Jogadores' }
                  },
                },
              },
            },
          },
          responses: { '201': { description: 'Criado' } },
        },
      },
      '/api/squads/{id}': {
        put: {
          summary: 'Alterar nome do Squad (Total)',
          tags: ['Squads'],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object', properties: { nomeSquad: { type: 'string', example: 'Squad Vencedor' } } } } }
          },
          responses: { '200': { description: 'Atualizado' } }
        },
        delete: {
          summary: 'Remover um Squad',
          tags: ['Squads'],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { '204': { description: 'Removido' } }
        }
      },

      // actions
      '/api/actions': {
        get: {
          summary: 'Lista todas as Actions registadas',
          tags: ['Actions'],
          responses: { '200': { description: 'Sucesso' } },
        },
        post: {
          summary: 'Cria uma nova Action associada a um Squad',
          tags: ['Actions'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    titulo: { type: 'string', example: 'Peladinha no Jamor' },
                    categoria: { type: 'string', example: 'Desporto' },
                    descricao: { type: 'string', example: 'Jogo futebol 7x7' },
                    squadId: { type: 'integer', example: 1 }
                  },
                },
              },
            },
          },
          responses: { '201': { description: 'Criado' } },
        },
      },
      '/api/actions/{id}': {
        patch: {
          summary: 'Atualiza detalhes de uma Action',
          tags: ['Actions'],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: {
            content: { 'application/json': { schema: { type: 'object', properties: { titulo: { type: 'string', example: 'Peladinha (Adiada)' } } } } }
          },
          responses: { '200': { description: 'Atualizada' } }
        },
        delete: {
          summary: 'Apaga uma Action',
          tags: ['Actions'],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { '204': { description: 'Apagada' } }
        }
      }
    },
  },
  apis: [],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// ativacao das rotas
app.use('/api/actions', action_route);
app.use('/api/users', userRoutes);
app.use('/api/squads', squadRoutes);
app.use('/api/auth', authRoutes);

// inicio do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\x1b[32m[SERVER]\x1b[0m Servidor em execução na porta ${PORT}`);
    console.log(`\x1b[34m[INFO]\x1b[0m Swagger UI disponível em: http://localhost:${PORT}/api-docs`);
});