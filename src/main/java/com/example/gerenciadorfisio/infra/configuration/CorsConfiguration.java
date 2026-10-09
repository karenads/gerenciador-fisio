package com.example.gerenciadorfisio.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/*
  Configuração de CORS da aplicação.

  CORS controla quais origens externas podem acessar
  o backend através do navegador.

  Neste projeto, o frontend roda em:
  http://localhost:3000

  Por isso, essa origem é liberada para realizar
  requisições ao backend Spring Boot.
*/
@Configuration
public class CorsConfiguration implements WebMvcConfigurer {

    /*
      Define as regras de acesso entre frontend e backend.

      "/**" libera a configuração para todas as rotas.

      allowedOrigins define quais origens podem acessar a API.

      allowedMethods define quais métodos HTTP
      podem ser utilizados nas requisições.
    */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS",
                        "PATCH",
                        "HEAD"
                );
    }
}