package ToDoList.Infrastructure.PostgreDB.Repositories;

import ToDoList.Application.Repositories.Interfaces.IUserRepository;
import ToDoList.Domain.Entities.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {


    //private final JdbcTemplate jdbcTemplate;
//
    //public UserRepository(
    //        JdbcTemplate jdbcTemplate
    //) {
    //    this.jdbcTemplate = jdbcTemplate;
    //}

    //@Override
    //public void createUser(User user) {
    //    jdbcTemplate.update(
    //            "INSERT INTO \"user\" (id,email,password_hash) VALUES (?,?,?)",
    //            user.getId(), user.getEmail(), user.getPasswordHash());
    //}
}
