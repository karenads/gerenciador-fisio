package com.example.gerenciadorfisio.configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/*
  Configuração do Swagger/OpenAPI da aplicação.

  @Configuration indica que esta classe possui
  configurações utilizadas pelo Spring.

  Aqui também é configurada a autenticação
  Bearer com JWT para permitir testes de endpoints
  protegidos diretamente pelo Swagger.
*/
@Configuration
public class SwaggerConfiguration {

    /*
      @Bean registra este objeto no contexto do Spring.

      customOpenAPI configura:
      - autenticação Bearer/JWT;
      - informações gerais da API;
      - título, versão e descrição exibidos no Swagger.
    */
    @Bean
    public OpenAPI customOpenAPI() {

        return new OpenAPI()

                /*
                  Adiciona a exigência de autenticação
                  chamada "bearerAuth" nas requisições.
                */
                .addSecurityItem(
                        new SecurityRequirement().addList("bearerAuth")
                )

                /*
                  Define o esquema de segurança utilizado.

                  type HTTP + scheme bearer indica
                  autenticação através de Bearer Token.

                  bearerFormat JWT informa que o token
                  utilizado segue o formato JWT.
                */
                .components(
                        new Components().addSecuritySchemes(
                                "bearerAuth",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                        )
                )

                /*
                  Informações exibidas
                  na documentação do Swagger.
                */
                .info(
                        new Info()
                                .title("gerenciador")
                                .version("1.0.0")
                                .description("Descrição")
                );
    }
}