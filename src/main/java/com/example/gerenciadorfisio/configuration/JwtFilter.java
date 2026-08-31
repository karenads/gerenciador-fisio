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

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired //ele e uma injeção de dependencias
    private TokenService tokenService;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String uri = request.getRequestURI();

        //nao tenho usuario autenticado precisa estar aqui -> esqueci senha, nao registrado
        if (uri.startsWith("/swagger-ui")
        || uri.startsWith("/v2/api-docs")
        || uri.startsWith("/v3/api-docs")
        || uri.startsWith("/swagger-resources")
        || uri.startsWith("/webjars")
        || uri.startsWith("/auth/login")
        || uri.startsWith("/auth/login/esqueci-senha")
        || uri.startsWith("/auth/login/recuperar-senha")
        ){
            filterChain.doFilter(request,response);//continua pra frente e retorno

            return;
        }


        String authHeader = request.getHeader("Authorization");

        if(authHeader != null && authHeader.startsWith("Bearer ")) {//inicia com
            String token = authHeader.replace("Bearer ","");

            try{

                var jwtValidador = tokenService.verificarToken(token); // chama o metodo

                System.out.println(jwtValidador.getSubject());

            }catch (Exception e){
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().println("Token invalido");
                return;
            }
        }else{
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().println("Token invalido");
            return;
        }

        filterChain.doFilter(request,response);
    }
}
