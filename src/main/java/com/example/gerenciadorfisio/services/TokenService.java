package com.example.gerenciadorfisio.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
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
            Algorithm algorithm = Algorithm.HMAC256(secret);

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

    private Instant getDataExpiracao(){

        //Pegar data atual
        var dataAtual = LocalDateTime.now();
        //Adicionar ou diminuir tempo da data atual
        var dataFutura = dataAtual.plusMinutes(expiracao);

        //Converter em instant
        return dataFutura.toInstant(ZoneOffset.of("-03:00"));
    }
}