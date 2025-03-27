package ToDoList.Application.Services.Interfaces.User;

import ToDoList.Application.Repositories.ModelsDTO.Token.TokenResponseModel;
import ToDoList.Application.Repositories.ModelsDTO.User.UserCreateModel;
import ToDoList.Application.Repositories.ModelsDTO.User.UserLoginDataModel;

import java.util.UUID;

public interface IUserService {
    UUID createUser(UserCreateModel userModel);
    TokenResponseModel authorizeUser(UserLoginDataModel userLoginDataModel);
}
