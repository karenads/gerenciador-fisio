package com.example.gerenciadorfisio.domain.valueobject;

public class Telefone {

    private String telefone;

    public Telefone(String telefone) {
        if (telefone == null || !telefone.replaceAll("\\D", "").matches("\\d{10,11}")) {
            throw new IllegalArgumentException("Telefone inválido!");
        }
        this.telefone = telefone;
    }

    @Override
    public String toString() {
        return telefone;
    }
}
