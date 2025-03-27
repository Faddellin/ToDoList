package ToDoList.Domain.Services;

import ToDoList.Application.CustomExceptions.KeyNotFoundException;
import ToDoList.Application.CustomExceptions.NotEnoughAccessException;
import ToDoList.Application.Repositories.ModelsDTO.Enums.TaskSortModel;
import ToDoList.Application.Repositories.ModelsDTO.Enums.UserTaskStatusModel;
import ToDoList.Application.Repositories.ModelsDTO.Task.*;
import ToDoList.Application.Repositories.ModelsDTO.Task.TaskShortModelComparators.TaskShortModelAscCreateTimeComparator;
import ToDoList.Application.Repositories.ModelsDTO.Task.TaskShortModelComparators.TaskShortModelAscDeadlineComparator;
import ToDoList.Application.Repositories.ModelsDTO.Task.TaskShortModelComparators.TaskShortModelDescCreateTimeComparator;
import ToDoList.Application.Repositories.ModelsDTO.Task.TaskShortModelComparators.TaskShortModelDescDeadlineComparator;
import ToDoList.Application.Services.Interfaces.Task.ITaskService;
import ToDoList.Domain.Entities.Task.Task;
import ToDoList.Domain.Entities.User.User;
import ToDoList.Domain.Enums.TaskStatus;
import ToDoList.Infrastructure.PostgreDB.Repositories.TaskRepository;
import ToDoList.Infrastructure.PostgreDB.Repositories.UserRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class TaskService implements ITaskService {

    private UserRepository _userRepository;
    private TaskRepository _taskRepository;


    public TaskService(UserRepository userRepository, TaskRepository taskRepository) {
        _taskRepository = taskRepository;
        _userRepository = userRepository;
    }

    public UUID createTask(UUID userId, TaskCreateModel taskCreateModel) throws KeyNotFoundException, BadRequestException {

        Optional<User> userO = _userRepository.findById(userId);

        if(!userO.isPresent()){
            throw new KeyNotFoundException("User is not found");
        }

        if(taskCreateModel.getDeadline().isBefore(LocalDate.now())){
            throw new BadRequestException("Deadline can't be before now");
        }

        Task task = new Task(
                UUID.randomUUID(),
                userO.get().getId(),
                taskCreateModel.getTitle(),
                taskCreateModel.getDescription(),
                TaskStatus.Active,
                taskCreateModel.getPriority(),
                taskCreateModel.getDeadline(),
                Calendar.getInstance().getTime()
        );
        _taskRepository.save(task);
        return task.getId();
    }

    public void editTask(UUID taskId, UUID userId, EditTaskModel editTaskModel)
            throws KeyNotFoundException, BadRequestException, NotEnoughAccessException {
        Optional<User> userO = _userRepository.findById(userId);
        Optional<Task> taskO = _taskRepository.findById(taskId);

        if(!taskO.isPresent()){
            throw new KeyNotFoundException("Task is not found");
        }
        if(!userO.isPresent()){
            throw new KeyNotFoundException("User is not found");
        }
        if(editTaskModel.getDeadline().isBefore(LocalDate.now())){
            throw new BadRequestException("Deadline can't be before now");
        }

        Task task = taskO.get();

        if(task.getUserId() != userId){
            throw new NotEnoughAccessException("You are trying to change not your task");
        }

        task.setTitle(editTaskModel.getTitle());
        task.setDescription(editTaskModel.getDescription());
        task.setDeadline(editTaskModel.getDeadline());
        task.setPriority(editTaskModel.getPriority());
        task.setUpdateTime(Calendar.getInstance().getTime());


        _taskRepository.save(task);
    }

    public void changeTaskStatus(UUID taskId, UUID userId, UserTaskStatusModel newStatus)
            throws KeyNotFoundException, BadRequestException, NotEnoughAccessException {
        Optional<Task> taskO = _taskRepository.findById(taskId);
        Optional<User> userO = _userRepository.findById(userId);

        if(!taskO.isPresent()){
            throw new KeyNotFoundException("Task is not found");
        }
        if(!userO.isPresent()){
            throw new KeyNotFoundException("User is not found");
        }

        Task task = taskO.get();

        if(task.getUserId() != userId){
            throw new NotEnoughAccessException("You are trying to change not your task");
        }

        if(newStatus.equals(UserTaskStatusModel.Active)){

            if (task.getDeadline().isBefore(LocalDate.now())){
                task.setStatus(TaskStatus.Overdue);
            }else{
                task.setStatus(TaskStatus.Active);
            }

        }else{

            if (task.getDeadline().isBefore(LocalDate.now())){
                task.setStatus(TaskStatus.Late);
            }else {
                task.setStatus(TaskStatus.Completed);
            }

        }

        _taskRepository.save(task);

    }

    public void deleteTask(UUID taskId, UUID userId) throws KeyNotFoundException, NotEnoughAccessException {
        Optional<Task> taskO = _taskRepository.findById(taskId);
        Optional<User> userO = _userRepository.findById(userId);

        if(!taskO.isPresent()){
            throw new KeyNotFoundException("Task is not found");
        }
        if(!userO.isPresent()){
            throw new KeyNotFoundException("User is not found");
        }

        Task task = taskO.get();

        if(task.getUserId() != userId){
            throw new NotEnoughAccessException("You are trying to delete not your task");
        }

        _taskRepository.deleteById(taskId);
    }

    private void changeTaskStatus(Task task){
        TaskStatus status = task.getStatus();
        LocalDate deadline = task.getDeadline();
        
        if(status == TaskStatus.Active && deadline.isBefore(LocalDate.now())){
            task.setStatus(TaskStatus.Completed);
        }
    }

    public TaskModel getTask(UUID taskId, UUID userId) throws KeyNotFoundException, NotEnoughAccessException {
        Optional<Task> taskO = _taskRepository.findById(taskId);
        Optional<User> userO = _userRepository.findById(userId);

        if(!taskO.isPresent()){
            throw new KeyNotFoundException("Task is not found");
        }
        if(!userO.isPresent()){
            throw new KeyNotFoundException("User is not found");
        }

        Task task = taskO.get();

        if(task.getUserId() != userId){
            throw new NotEnoughAccessException("You are trying to delete not your task");
        }

        changeTaskStatus(task);
        _taskRepository.save(task);

        TaskModel taskModel = new TaskModel(task.getId(),
                task.getTitle(),
                task.getDeadline(),
                task.getPriority(),
                task.getStatus(),
                task.getDescription(),
                task.getCreateTime(),
                task.getUpdateTime()
        );

        return taskModel;
    }

    public TaskShortModelList getUserTasks(UUID userId, TaskSortModel taskSortModel) throws KeyNotFoundException {

        Optional<User> userO = _userRepository.findById(userId);
        if(!userO.isPresent()){
            throw  new KeyNotFoundException("User is not found");
        }

        List<Task> taskList = _taskRepository.findByUserId(userId);
        List<TaskShortModel> taskShortModels = new ArrayList<TaskShortModel>();

        taskList.forEach(task -> {
            taskShortModels.add(new TaskShortModel(task.getId(),
                    task.getTitle(),
                    task.getDeadline(),
                    task.getPriority(),
                    task.getStatus(),
                    task.getCreateTime())
            );
        });

        if (taskSortModel != null){
            Comparator taskShortModelComparator;

            switch (taskSortModel){
                case AscCreationTime:
                    taskShortModelComparator =  new TaskShortModelAscCreateTimeComparator();
                    break;
                case DescCreationTime:
                    taskShortModelComparator =  new TaskShortModelDescCreateTimeComparator();
                    break;
                case DescDeadline:
                    taskShortModelComparator =  new TaskShortModelDescDeadlineComparator();
                    break;
                case AscDeadline:
                    taskShortModelComparator =  new TaskShortModelAscDeadlineComparator();
                    break;
                default:
                    taskShortModelComparator =  new TaskShortModelDescCreateTimeComparator();
            }

            taskShortModels.sort(taskShortModelComparator);
        }

        TaskShortModelList taskShortModelList = new TaskShortModelList(taskShortModels);

        return taskShortModelList;
    }
}
