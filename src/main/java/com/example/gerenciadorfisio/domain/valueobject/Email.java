package com.example.gerenciadorfisio.domain.valueobject;

public class Email {

    private String email;

    public Email(String email) {
        if (email == null || !email.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            throw new IllegalArgumentException("Email inválido!");
        }
        this.email = email;
    }

    @Override
    public String toString() {
        return email;
    }
}
