package ToDoList.Application.CustomExceptions;

public class NotEnoughAccessException extends Exception{
    public NotEnoughAccessException(String message) {
        super(message);
    }
}
