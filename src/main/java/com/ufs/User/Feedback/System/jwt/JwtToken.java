package com.ufs.User.Feedback.System.jwt;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.security.core.userdetails.UserDetails;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

@Component
public class JwtToken {

    @Value("${jwt.secret.key}")
    private String secretKey;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String generateToken(UserDetails userDetails) {
        return createToken(Map.of("role", userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList()), userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 5))
                .signWith(getSigningKey())
                .compact();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}

