package com.example.gerenciadorfisio.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

/*
  Service responsável por gerar e validar tokens JWT.

  O token é utilizado depois do login para identificar
  o usuário nas próximas requisições, sem precisar enviar
  e-mail e senha novamente.

  @Service indica que esta classe é uma camada de serviço
  gerenciada pelo Spring.
*/
@Service
public class TokenService {

    /*
      Valores carregados das configurações da aplicação.

      secret = chave secreta usada na assinatura do token.
      expiracao = tempo de validade do token.
      emissor = identifica quem gerou o token.
    */
    @Value("${spring.secret}")
    private String secret;

    @Value("${spring.expiracao}")
    private Long expiracao;

    @Value("${spring.emissor}")
    private String emissor;


    /*
      GERAÇÃO DO TOKEN

      Este método recebe o subject, que identifica
      o usuário relacionado ao token.

      No nosso fluxo, o subject é o e-mail
      informado durante o login.
    */
    public String gerarToken(String subject) {

        try {

            /*
              A primeira etapa da geração do token é criar
              o algoritmo HMAC256 utilizando a chave secreta.

              Esse algoritmo será utilizado no final
              para assinar o JWT e garantir sua integridade.
            */
            Algorithm algorithm = Algorithm.HMAC256(secret);


            /*
              Depois o token é montado com:

              - emissor: identifica quem criou o token;
              - subject: identifica o usuário;
              - expiração: define até quando o token será válido;
              - assinatura: utiliza o algoritmo criado acima.
            */
            String token = JWT.create()
                    .withIssuer(emissor)
                    .withSubject(subject)
                    .withExpiresAt(getDataExpiracao())
                    .sign(algorithm);

            return token;

        } catch (RuntimeException e) {

            throw new RuntimeException(e);
        }
    }


    /*
      VALIDAÇÃO DO TOKEN

      Para validar, é utilizado novamente o algoritmo
      HMAC256 com a mesma chave secreta.

      O verificador confere se o token possui
      assinatura válida, emissor correto e se ainda
      está dentro do período de validade.

      Caso exista algum problema, é lançada
      JWTVerificationException.
    */
    public DecodedJWT verificarToken(String token)
            throws JWTVerificationException {

        Algorithm algorithm = Algorithm.HMAC256(secret);

        JWTVerifier verificador = JWT.require(algorithm)
                .withIssuer(emissor)
                .build();

        return verificador.verify(token);
    }


    /*
      DATA DE EXPIRAÇÃO

      Primeiro pega a data e hora atual.

      Depois adiciona a quantidade de minutos
      definida na configuração de expiração.

      Por fim, converte a data para Instant,
      formato utilizado pelo JWT.
    */
    private Instant getDataExpiracao() {

        // Pega a data e hora atual.
        var dataAtual = LocalDateTime.now();

        // Adiciona o tempo de validade do token.
        var dataFutura = dataAtual.plusMinutes(expiracao);

        // Converte para Instant utilizando o offset -03:00.
        return dataFutura.toInstant(ZoneOffset.of("-03:00"));
    }
}