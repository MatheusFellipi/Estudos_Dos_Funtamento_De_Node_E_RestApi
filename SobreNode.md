# o que e node.js

- e plataforma open-sorce permite execução da linguagem javascript do lado do servidor

* v8 + libuv + conjunto de módulos
  - a v8 e um interpretado para javascript
  - libuv e biblioteca multi-plataforma
    - faz com o node seja mais rápido

# o que o node veio resolver

- Ryan dahl
- barra de progresso do flickr precisava fazer um requisição o backend
- tecnologias da época nao davam um bom suporte ao processo de i/o

# caracteriscas do nodes.js

- arquitetura Event loop
  baseando em evento

  - call stack

- single-thread
- non-blocking i/o
- modulos proprios
  - http
  - dns
  - fs
  - buffer

# Event Loop

- e um pilha entre por ultimo e que sai primeiro

- CALL STACK
  - f1() -> f2() ->f3()...
  - o event loop fica ouvindo as função que estação chegando ele escutar um função por fez quando ele e chamada ele manda para um thread disponível, por padrão dem 4 thread
    - o Event loop e single-thread a partir do momento que ele recebe a requisição ele vai distribuir entre as outra thread

# rest (representation state transfer)

- e um modelo de arquitetura
- tem 6 regras
  - Client-Server (regra básica)
    - o cliente nao precisa saber o que se passa no server e o serve nao precisa saber oq eu se passa no cliente
  - Stateless
    - ele nao armazena nenhum estado passa para o servidor.
  - Cache
    - precisa ser construida para que o cache seja feita
  - interface Uniforme
    - identificação dos recursos
      - http://serve/products
      - http://serve/cliente
    - representação dos recursos
    - Mensagens auto-descritivas
    - HATEOAS (hypertext as the engine of application state)
- Camadas
- Códigos sob Demanda -> qu permite que as funcao seja extendidas em forma de aplicativo

# metodos de requisicoes - HTTP verbs

- get -> leitura
- post -> Criação
- put -> atualização
- delete -> remover
- patch -> Atualização parcial

# HTTP CODE

- 1xx: Informativo - a solicitação foi aceita ou processo continua em andamento
- 2xx: confirmação

  - 200 - requisição bem sucedida
  - 201 - crated - geralmente usado para o post apos uma inserção

- 3xx Redirecionamento

  - 301 - moved permannentlr
  - 302 - moved

- 4XX: Erro do cliente

  - 400 - bad Request
  - 401 - Unauthorized
  - 402 - Forbidden
  - 404 - not Found
  - 422 - Unprocessable Entity

- 5XX: Erro no servidor

  - 500- interna server error
  - 502- bad gateway

  # tipos de parâmetros

  - header params
  - query params

# tipo de parâmetros

- routes Params -> `/courses/:id`
  - usando para identificar um recurso editar/delatar/buscar
- Query params => Paginação / Filtro

- body Params => Os objeto inserção/alteração (json)
