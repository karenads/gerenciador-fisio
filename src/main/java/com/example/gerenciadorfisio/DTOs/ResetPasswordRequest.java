package com.example.gerenciadorfisio.DTOs;

public record ResetPasswordRequest(String token, String novaSenha) {
}
