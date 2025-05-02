import { User } from './models/user.model';

interface MockUsers {
  results: User[];
  page: number;
  limit: number;
  count: number;
}

export const MOCK_USERS: MockUsers = {
  results: [
    {
      id: 348,
      email: "carla.menezes@email.com",
      name: "Carla Menezes",
      phone: "(11) 91234-5678",
      birthDate: "1990-03-22T00:00:00.000Z",
      createdAt: "2025-04-16T11:59:16.583Z",
      updatedAt: "2025-04-16T11:59:16.583Z"
    },
    {
      id: 349,
      email: "rodrigo.tavares@email.com",
      name: "Rodrigo Tavares",
      phone: "(21) 99876-4321",
      birthDate: "1987-07-15T00:00:00.000Z",
      createdAt: "2025-04-16T11:59:16.789Z",
      updatedAt: "2025-04-16T11:59:16.789Z"
    },
    {
      id: 350,
      email: "amanda.rocha@email.com",
      name: "Amanda Rocha",
      phone: "(31) 98765-4321",
      birthDate: "1993-11-08T00:00:00.000Z",
      createdAt: "2025-04-16T11:59:16.992Z",
      updatedAt: "2025-04-16T11:59:16.992Z"
    },
    {
      id: 351,
      email: "lucas.freitas@email.com",
      name: "Lucas Freitas",
      phone: "(19) 99911-2233",
      birthDate: "1995-06-03T00:00:00.000Z",
      createdAt: "2025-04-16T11:59:17.184Z",
      updatedAt: "2025-04-16T11:59:17.184Z"
    },
    {
      id: 352,
      email: "juliana.campos@email.com",
      name: "Juliana Campos",
      phone: "(51) 99123-4567",
      birthDate: "1991-09-29T00:00:00.000Z",
      createdAt: "2025-04-16T11:59:17.385Z",
      updatedAt: "2025-04-16T11:59:17.385Z"
    },
    {
      id: 353,
      email: "edu.lima@email.com",
      name: "Eduardo Lima",
      phone: "(41) 99887-6655",
      birthDate: "1988-01-17T00:00:00.000Z",
      createdAt: "2025-04-16T11:59:17.588Z",
      updatedAt: "2025-04-16T11:59:17.588Z"
    },
    {
      id: 354,
      email: "fernanda.vasc@email.com",
      name: "Fernanda Vasconcelos",
      phone: "(27) 98712-3344",
      birthDate: "1996-04-30T00:00:00.000Z",
      createdAt: "2025-04-16T11:59:17.790Z",
      updatedAt: "2025-04-16T11:59:17.790Z"
    },
    {
      id: 355,
      email: "thiago.martins@email.com",
      name: "Thiago Martins",
      phone: "(85) 99654-7766",
      birthDate: "1989-12-12T00:00:00.000Z",
      createdAt: "2025-04-16T11:59:17.992Z",
      updatedAt: "2025-04-16T11:59:17.992Z"
    },
    {
      id: 356,
      email: "renata.oliveira@email.com",
      name: "Renata Oliveira",
      phone: "(13) 99222-1133",
      birthDate: "1992-02-20T00:00:00.000Z",
      createdAt: "2025-04-16T11:59:18.201Z",
      updatedAt: "2025-04-16T11:59:18.201Z"
    },
    {
      id: 357,
      email: "bruno.alves@email.com",
      name: "Bruno Alves",
      phone: "(67) 99933-8877",
      birthDate: "1994-05-14T00:00:00.000Z",
      createdAt: "2025-04-16T11:59:18.408Z",
      updatedAt: "2025-04-16T11:59:18.408Z"
    }
  ],
  page: 1,
  limit: 10,
  count: 24
};
