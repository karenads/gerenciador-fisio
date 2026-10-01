package com.example.gerenciadorfisio.configuration;

import com.example.gerenciadorfisio.services.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/*
  Filtro responsável pela validação do token JWT.

  OncePerRequestFilter faz com que este filtro seja executado
  uma vez para cada requisição recebida pelo backend.

  @Component permite que o Spring gerencie esta classe.
*/

@Component
public class JwtFilter extends OncePerRequestFilter {

    /*
      @Autowired realiza a injeção de dependência.

      O Spring fornece automaticamente o TokenService,
      sem precisar criar o objeto manualmente com "new".
    */
    @Autowired
    private TokenService tokenService;

    /*
      Fluxo do filtro:

      1. identifica a rota acessada;
      2. libera rotas públicas;
      3. procura o token no header Authorization;
      4. valida o token através do TokenService;
      5. libera ou bloqueia a requisição.
    */
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String uri = request.getRequestURI();

        /*
          Libera requisições OPTIONS utilizadas pelo navegador
          nas verificações de CORS.
        */
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        /*
          ROTAS PÚBLICAS

          Essas rotas não precisam de usuário autenticado,
          por exemplo Swagger, login e recuperação de senha.
        */
        if (uri.startsWith("/swagger-ui")
                || uri.startsWith("/v2/api-docs")
                || uri.startsWith("/v3/api-docs")
                || uri.startsWith("/swagger-resources")
                || uri.startsWith("/webjars")
                || uri.equals("/")
                || uri.equals("/auth/login")
                || uri.startsWith("/auth/login/esqueci-senha")
                || uri.startsWith("/auth/login/recuperar-senha")) {

            filterChain.doFilter(request, response);
            return;
        }

        /*
          VALIDAÇÃO DO TOKEN

          O frontend envia o token no cabeçalho:

          Authorization: Bearer TOKEN

          O código verifica se o header existe
          e se começa com "Bearer ".
        */
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            // Remove "Bearer " e mantém somente o token.
            String token = authHeader.replace("Bearer ", "");

            try {

                /*
                  Chama o TokenService para verificar
                  se o JWT recebido é válido.
                */
                var jwtValidador = tokenService.verificarToken(token);

                System.out.println(jwtValidador.getSubject());

            } catch (Exception e) {

                /*
                  Caso o token seja inválido,
                  retorna HTTP 401 - Unauthorized.
                */
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().println("Token invalido");

                return;
            }

        } else {

            /*
              Caso não exista token no cabeçalho,
              também retorna HTTP 401.
            */
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().println("Token invalido");

            return;
        }

        /*
          Se o token for válido,
          a requisição continua normalmente
          para o próximo filtro ou para o Controller.
        */
        filterChain.doFilter(request, response);
    }
}