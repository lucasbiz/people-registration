## People Registration

People Registration é uma aplicação Angular 19 para gerenciamento de usuários, permitindo operações de CRUD (Criar, Ler, Atualizar e Deletar) com um backend pré-configurado. O projeto segue boas práticas de desenvolvimento Angular, incluindo modularidade, separação de responsabilidades, centralização de lógica de UI e uso de serviços para comunicação com a API.

## Funcionalidades

- Listagem de usuários com paginação;
- Criação de novos usuários via modal (usando PrimeNG DynamicDialog);
- Edição de usuários existentes via modal;
- Exclusão de usuários com confirmação via modal;
- Feedback visual de sucesso e/ou erro em operações de CRUD;
- Validação reativa de formulários para garantir integridade dos dados;
- Padrões de código unificados via ESLint;

## Tecnologias Utilizadas

- Angular 19;
- TypeScript;
- RxJS para gerenciamento de dados assíncronos;
- TailwindCSS 3 para estilização;
- PrimeNG 19 para modais, botões e ícones;
- ESLint e Prettier para padronização e qualidade de código;
- Serviços HTTP para comunicação com a API backend;

## Pré-requisitos

- Node.js (versão 18 ou superior);
- Angular CLI (versão 19 ou superior);

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

![Captura de Tela 2025-06-18 às 19 00 10](https://github.com/user-attachments/assets/2e4f7ebc-00f8-4b52-a515-77d6ce65b443)

## Scripts Disponíveis

- **`npm start`**: Inicia o servidor de desenvolvimento.
- **`npm run build`**: Compila a aplicação para produção.
- **`npm run lint`**: Analisa o código em busca de erros de lint.
- **`npm run lint:fix`**: Corrige automaticamente os erros de lint.
- **`npm run prettier`**: Verifica a formatação do código.
- **`npm run prettier:fix`**: Formata o código automaticamente.

## Serviços

- **`UsersService`**: Gerencia as operações de CRUD para usuários, comunicando-se com a API backend.
- **`ModalHelperService`**: Abstrai a lógica de abertura e fechamento de modais, utilizando o `DynamicDialog` do PrimeNG.
- **`ToastService`**: Fornece feedback visual para o usuário através de notificações (toasts).

## Componentes

- **`HomeComponent`**: Componente principal da página, que renderiza a navegação e o componente de registro de pessoas.
- **`PeopleRegistrationComponent`**: Gerencia a exibição da lista de usuários e o botão para criar um novo cadastro.
- **`UserListComponent`**: Exibe a lista de usuários com paginação e lida com as ações de edição e exclusão.
- **`UserRowComponent`**: Representa uma única linha na lista de usuários, com os botões de ação.
- **`RegisterModalComponent`**: Modal para criar e editar usuários, com validação de formulário.
- **`ConfirmDeletionModalComponent`**: Modal de confirmação para exclusão de usuários.
- **`SuccessModalComponent`**: Modal para exibir mensagens de sucesso.
