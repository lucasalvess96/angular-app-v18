# Login Google por sessão

O guard consulta `GET /api/session` para verificar a sessão no servidor.
Ele retorna um `UrlTree` para `/login` quando a resposta é 401. Falhas de rede ou
de servidor continuam sendo erros; não são tratadas como logout.

O navegador administra o cookie HttpOnly `JSESSIONID`. A aplicação não lê esse
cookie nem guarda tokens de autenticação no localStorage.

O interceptor funcional atua apenas em URLs relativas iniciadas por `/api/`.
Antes de POST, PUT, PATCH ou DELETE, consulta `/api/csrf` e envia o token
no cabeçalho indicado pelo servidor. Um token novo é consultado a cada operação,
evitando reutilizar um token de uma sessão anterior. Respostas 401 redirecionam
para login; 403 continuam sendo erros de acesso/CSRF. Mutações não são repetidas
pelo interceptor.

`OauthService.logout()` retorna um Observable: o chamador precisa assiná-lo para
enviar `POST /api/logout`, que encerra a sessão no servidor e retorna 204.

## Executar localmente

1. Inicie a API na porta 8080 e execute `npm start` neste projeto.
2. Abra o Angular em `http://localhost:4200` (use localhost em todo o fluxo).
3. No cliente OAuth Web do Google Cloud, adicione a URI autorizada:
   `http://localhost:4200/login/oauth2/code/google`.
4. Mantenha na API `OAUTH2_REDIRECT_URL=http://localhost:4200/login` e a URI
   de callback padrão `{baseUrl}/login/oauth2/code/{registrationId}`.

O proxy de desenvolvimento encaminha `/api/*` para a API. Preserva o prefixo `/api` nas rotas da API e remove esse prefixo apenas em `/api/oauth2`, `/api/logout`, `/api/persoon` e `/api/person-v3`, mantendo os caminhos existentes no servidor. Ele também encaminha o callback `/login/oauth2/code/*`. A origem/Host
é preservada para que o Spring gere o callback na porta 4200. Não é necessário
liberar CORS ou usar `withCredentials` para chamadas na mesma origem.

O endereço solicitado antes do login fica no sessionStorage apenas durante o
redirecionamento ao Google; caminhos externos e ciclos para `/login` são rejeitados.

Em produção, `ng build` não publica um proxy. Configure o servidor/reverse proxy
para encaminhar esses mesmos caminhos à API antes do fallback do Angular,
preservando a origem pública e usando HTTPS. Cadastre a URI pública de callback
no Google Cloud e configure o cookie Secure na API. Segredos do Google ficam
exclusivamente no backend.

## Documentação

- [Interceptors funcionais (Angular 18)](https://v18.angular.dev/guide/http/interceptors/)
- [Guards de rotas](https://angular.dev/guide/routing/route-guards)
- [Segurança HTTP e XSRF](https://v18.angular.dev/best-practices/security/)
- [Spring Boot e OAuth2](https://spring.io/guides/tutorials/spring-boot-oauth2/)
