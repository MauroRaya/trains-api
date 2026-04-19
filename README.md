# Comparação de Uso de Memória: Abordagem Padrão vs Streaming

## 1. Contexto

Este repositório foi criado para comparar o uso de memória entre duas abordagens de obtenção de dados:

- **Abordagem padrão**: retorna todos os dados carregados em memória de uma vez
- **Abordagem com streaming**: processa os dados em fluxo (stream), sem carregar tudo na memória

Essa comparação é especialmente relevante para APIs utilizadas com ferramentas como o Power BI, onde técnicas como paginação geralmente não são suportadas e há necessidade de lidar com grandes volumes de dados em uma única consulta.

O objetivo é avaliar como o uso de streams pode melhorar o desempenho e reduzir o consumo de memória em cenários de alta carga de dados.

---

## 2. Como utilizar Streams

Esta implementação utiliza streaming no PostgreSQL para lidar com grandes volumes de dados de forma eficiente.

### 2.1 Instale o pacote `pg-query-stream`

```bash
npm install pg-query-stream
```

### 2.2 Importe a classe `QueryStream` do pacote `pg-query-stream` no topo do arquivo

```typescript
import QueryStream from 'pg-query-stream';
```

### 2.3 Crie uma instância da classe `QueryStream` com sua consulta

```typescript
const query = new QueryStream("SELECT * FROM sua_tabela");
```

### 2.4 Execute a stream no client do pacote `pg`

```typescript
this.client.query(query);
```

### Exemplo

```typescript
import { Inject } from '@nestjs/common';
import { Client } from 'pg';
import QueryStream from 'pg-query-stream';

export class Repositorio {
  constructor(@Inject("PG_CLIENT") private readonly client: Client) {}

  get(): QueryStream {
    const query = new QueryStream("SELECT * FROM sua_tabela");
    return this.client.query(query);
  }
}
```

### 2.5 Instale o pacote `JSONStream`

```bash
npm install JSONStream
```

### 2.6 Importe o tipo Response e JSONStream no topo do arquivo

```typescript
import type { Response } from 'express';
import * as JSONStream from 'JSONStream';
```

### 2.7 Configure o controller com a resposta

```typescript
@Get()
get(@Res() res: Response) {}
```

### 2.8 Faça o pipe para JSON

```typescript
stream.pipe(JSONStream.stringify())
```

### 2.9 Faça o pipe para a resposta

```typescript
stream.pipe(res)
```

### Exemplo

```typescript
import { Controller, Get, Res } from '@nestjs/common';
import { Service } from './service';
import type { Response } from 'express';
import * as JSONStream from 'JSONStream';

@Controller()
export class Controller {
  constructor(private readonly service: Service) {}

  @Get()
  get(@Res() res: Response) {
    const stream = this.service.get();

    res.setHeader('Transfer-Encoding', 'chunked');

    stream
      .pipe(JSONStream.stringify())
      .pipe(res);
  }
}
```

---

## 3. Observabilidade

Esse repositório possui um arquivo `docker-compose.yaml` na raiz do projeto.  
Ele possui serviços como: postgres, node-exporter, prometheus e grafana.  
Caso deseje observar a diferença de memória, o grafana está disponivel em:

```bash
http://localhost:3000/
```

Username: admin  
Password: admin
