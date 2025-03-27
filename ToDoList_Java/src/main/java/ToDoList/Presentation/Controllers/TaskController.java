package ToDoList.Presentation.Controllers;

import ToDoList.Application.CustomExceptions.KeyNotFoundException;
import ToDoList.Application.Repositories.ModelsDTO.Enums.UserTaskStatusModel;
import ToDoList.Application.Repositories.ModelsDTO.Task.EditTaskModel;
import ToDoList.Application.Repositories.ModelsDTO.Task.TaskCreateModel;
import ToDoList.Application.Repositories.ModelsDTO.Task.TaskModel;
import ToDoList.Application.Repositories.ModelsDTO.Task.TaskShortModelList;
import ToDoList.Application.Repositories.ModelsDTO.Token.TokenResponseModel;
import ToDoList.Application.Repositories.ModelsDTO.User.UserCreateModel;
import ToDoList.Application.Repositories.ModelsDTO.User.UserLoginDataModel;
import ToDoList.Application.Services.Interfaces.Task.ITaskService;
import ToDoList.Domain.Services.TaskService;
import ToDoList.Domain.Services.UserService;
import com.sun.net.httpserver.Authenticator;
import org.apache.coyote.BadRequestException;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {

    private ITaskService _taskService;

    public TaskController(ITaskService taskService) {
        _taskService = taskService;
    }

    @PostMapping("users/{userId}")
    public UUID CreateTask(@RequestBody TaskCreateModel taskCreateModel, @PathVariable("userId") UUID userId) throws BadRequestException, KeyNotFoundException {

        return _taskService.createTask(userId,taskCreateModel);

    }

    @PutMapping("{taskId}")
    public void EditTask(@RequestBody EditTaskModel editTaskModel, @PathVariable("taskId") UUID taskId) throws BadRequestException, KeyNotFoundException {

        _taskService.editTask(taskId, editTaskModel);
    }

    @PutMapping("{taskId}/status")
    public void ChangeTaskStatus(@RequestBody UserTaskStatusModel userTaskStatusModel, @PathVariable("taskId") UUID taskId) throws BadRequestException, KeyNotFoundException {

        _taskService.changeTaskStatus(taskId, userTaskStatusModel);
    }

    @DeleteMapping("{taskId}")
    public void DeleteTask(@PathVariable("taskId") UUID taskId) throws BadRequestException, KeyNotFoundException {

        _taskService.deleteTask(taskId);
    }

    @GetMapping("{taskId}")
    public TaskModel GetTask(@PathVariable("taskId") UUID taskId) throws BadRequestException, KeyNotFoundException {

        return _taskService.getTask(taskId);

    }

    @GetMapping("users/{userId}")
    public TaskShortModelList GetUserTasks(@PathVariable("userId") UUID userId) throws BadRequestException, KeyNotFoundException {

        return _taskService.getUserTasks(userId);

    }
}
