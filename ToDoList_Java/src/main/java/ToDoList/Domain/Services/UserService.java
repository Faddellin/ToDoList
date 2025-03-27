package ToDoList.Domain.Services;

import ToDoList.Application.Repositories.Interfaces.IUserRepository;
import ToDoList.Application.Repositories.ModelsDTO.Token.TokenResponseModel;
import ToDoList.Application.Repositories.ModelsDTO.User.UserLoginDataModel;
import ToDoList.Application.Services.Interfaces.User.IPasswordService;
import ToDoList.Application.Services.Interfaces.User.IUserService;
import ToDoList.Application.Repositories.ModelsDTO.User.UserCreateModel;
import ToDoList.Domain.Entities.User.User;
import ToDoList.Infrastructure.PostgreDB.Repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService implements IUserService {

    private UserRepository _userRepository;
    private final IPasswordService _passwordService;

    public UserService(UserRepository userRepository, IPasswordService passwordService) {
        _userRepository = userRepository;
        _passwordService = passwordService;
    }

    @Override
    public UUID createUser(UserCreateModel userCreateModel){
        User user = new User(UUID.randomUUID(),
                userCreateModel.getEmail(),
                _passwordService.CreateHashFromPassword(userCreateModel.getPassword()));
        _userRepository.save(user);
        return user.getId();
    }

    @Override
    public TokenResponseModel authorizeUser(UserLoginDataModel userLoginDataModel){

        TokenResponseModel tokenResponseModel = new TokenResponseModel();
        tokenResponseModel.setJwtToken("fdsfsdknfghjkfg");

        return tokenResponseModel;
    }
}
