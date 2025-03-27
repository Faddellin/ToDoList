package ToDoList.Domain.Entities.User;

import jakarta.persistence.*;
import org.jetbrains.annotations.NotNull;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Entity
@Table(name = "\"user\"")
public class User {
    public User(){

    }
    public User(UUID id, String email, String passwordHash) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
    }

    @NotNull
    @Id
    @Column(name = "id", nullable = false)
    private UUID id;

    @NotNull
    @Column(name = "email", nullable = false, length = 200)
    private String email;

    @NotNull
    @Column(name = "passwordHash", nullable = false, length = 200)
    private String passwordHash;

    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }
    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }
}
