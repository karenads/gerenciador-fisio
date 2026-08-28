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

@Service
public class TokenService {

    /*Esse TokenService existe para resolver um problema específico: depois que o usuário faz login,
    como a API vai saber que ele está autenticado nas próximas requisições?
    A resposta é: usando um token JWT.*/
    @Value("${spring.secret}")
    private String secret;

    @Value("${spring.expiracao}")
    private Long expiracao;

    @Value("${spring.emissor}")
    private String emissor;

    public String gerarToken(String subject){
        try{

            //Hash
            Algorithm algorithm = Algorithm.HMAC256(secret); // primeira coisa q nosso codigo faz

            String token = com.auth0.jwt.JWT.create()
                    .withIssuer(emissor)
                    .withSubject(subject)
                    .withExpiresAt(getDataExpiracao())
                    .sign(algorithm);

            return token;

        }catch (RuntimeException e){
            throw new RuntimeException(e);
        }
    }

    public DecodedJWT verificarToken(String token) throws JWTVerificationException { //qualquer erro que dar erro nesse bloco ele da essa exception
        Algorithm algorithm = Algorithm.HMAC256(secret);

        JWTVerifier verificador = JWT.require(algorithm).withIssuer(emissor).build();

        return verificador.verify(token);


    }

    private Instant getDataExpiracao(){

        //Pegar data atual
        var dataAtual = LocalDateTime.now();
        //Adicionar ou diminuir tempo da data atual
        var dataFutura = dataAtual.plusMinutes(expiracao);

        //Converter em instant
        return dataFutura.toInstant(ZoneOffset.of("-03:00"));
    }
}