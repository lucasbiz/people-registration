# People Registration

People Registration é uma aplicação Angular 19 para gerenciamento de usuários, permitindo operações de CRUD (Criar, Ler, Atualizar e Deletar) com um backend pré-configurado. O projeto segue boas práticas de desenvolvimento Angular, incluindo modularidade, separação de responsabilidades e uso de serviços para comunicação com a API.

## Funcionalidades

- Listagem de usuários com paginação
- Criação de novos usuários via modal
- Edição de usuários existentes via modal
- Exclusão de usuários com confirmação via modal
- Validação de formulários para garantir a integridade dos dados

## Tecnologias Utilizadas

- Angular 19
- TypeScript
- RxJS para gerenciamento de dados assíncronos
- Bootstrap para estilização e modais (via `ngx-bootstrap`)
- Serviços HTTP para comunicação com a API backend

## Pré-requisitos

- Node.js (versão 18 ou superior)
- Angular CLI (versão 19 ou superior)

## Instalação e Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/people-registration.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd people-registration
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Execute o servidor de desenvolvimento:
   ```bash
   ng serve
   ```

5. Acesse a aplicação no navegador:
   ```
   http://localhost:4200
   ```

## Estrutura do Projeto

A estrutura do projeto segue as melhores práticas do Angular, com uma clara separação de componentes, serviços e modelos:

```
src/
├── app/
│   ├── components/               # Componentes genéricos (ex.: input-button)
│   ├── modals/                  # Componentes de modal (ex.: register-modal, confirm-deletion-modal)
│   ├── models/                  # Interfaces e modelos (ex.: User)
│   ├── services/                # Serviços (ex.: user.service.ts, modal-helper.service.ts)
│   ├── app.component.ts         # Componente raiz
│   ├── app.module.ts            # Módulo principal
│   └── app.routes.ts            # Configuração de rotas
├── assets/                      # Arquivos estáticos (imagens, etc.)
└── environments/                # Configurações de ambiente (dev, prod)
```

### Principais Componentes e Serviços

- **UserListComponent**: Exibe a lista de usuários e gerencia a abertura dos modais para criação, edição e exclusão.
- **RegisterModalComponent**: Modal reutilizável para criação e edição de usuários.
- **ConfirmDeletionModalComponent**: Modal de confirmação para exclusão de usuários.
- **UserService**: Serviço responsável pela comunicação com a API backend para operações CRUD de usuários.
- **ModalHelperService**: Serviço auxiliar para gerenciar a abertura e configuração dos modais.
