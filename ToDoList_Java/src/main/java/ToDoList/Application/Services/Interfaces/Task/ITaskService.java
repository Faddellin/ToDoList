package ToDoList.Application.Services.Interfaces.Task;

import ToDoList.Application.CustomExceptions.KeyNotFoundException;
import ToDoList.Application.Repositories.ModelsDTO.Enums.UserTaskStatusModel;
import ToDoList.Application.Repositories.ModelsDTO.Task.TaskCreateModel;
import ToDoList.Application.Repositories.ModelsDTO.Task.EditTaskModel;
import ToDoList.Application.Repositories.ModelsDTO.Task.TaskModel;
import ToDoList.Application.Repositories.ModelsDTO.Task.TaskShortModelList;
import org.apache.coyote.BadRequestException;

import java.util.UUID;

public interface ITaskService {
    UUID createTask(UUID userId, TaskCreateModel taskCreateModel) throws KeyNotFoundException, BadRequestException;

    void editTask(UUID taskId, EditTaskModel editTaskModel) throws KeyNotFoundException, BadRequestException;

    void changeTaskStatus(UUID taskId, UserTaskStatusModel newStatus) throws KeyNotFoundException, BadRequestException;

    void deleteTask(UUID taskId);

    TaskShortModelList getUserTasks(UUID userId) throws KeyNotFoundException;

    TaskModel getTask(UUID taskId) throws KeyNotFoundException;
}
