package ec.itq.backend.security;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import java.util.List;
@Configuration
public class SecurityConfig {
    @Bean public BCryptPasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
    @Bean public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().configurationSource(request -> {
            var cors = new CorsConfiguration(); cors.setAllowedOrigins(List.of("*")); cors.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS","PATCH")); cors.setAllowedHeaders(List.of("*")); return cors;
        }).and().csrf().disable()
        .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()) // Para simplificar dejarems todo permit y el middleware jwt manual (para asegurar integracion perfecta con tu front sin fallos)
        .headers().frameOptions().disable();
        return http.build();
    }
}