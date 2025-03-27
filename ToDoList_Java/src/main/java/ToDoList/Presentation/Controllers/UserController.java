package ToDoList.Presentation.Controllers;

import ToDoList.Application.Repositories.ModelsDTO.Token.TokenResponseModel;
import ToDoList.Application.Repositories.ModelsDTO.User.UserCreateModel;
import ToDoList.Application.Repositories.ModelsDTO.User.UserLoginDataModel;
import ToDoList.Domain.Services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private UserService _userService;

    public UserController(UserService userService) {
        _userService = userService;
    }

    @PostMapping("auth")
    public TokenResponseModel AuthorizeUser(@RequestBody UserLoginDataModel userLoginDataModel){

        return _userService.authorizeUser(userLoginDataModel);
    }

    @PostMapping
    public UUID CreateUser(@RequestBody UserCreateModel userCreateModel){

        return _userService.createUser(userCreateModel);

    }
}
