package com.example.gerenciadorfisio.application.DTOs;

public record ResetPasswordRequest(String token, String novaSenha) {
}
