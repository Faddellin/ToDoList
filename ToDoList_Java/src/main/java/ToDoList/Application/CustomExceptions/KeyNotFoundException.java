package ToDoList.Application.CustomExceptions;

public class KeyNotFoundException extends Exception{
    public KeyNotFoundException(String message) {
        super(message);
    }
}
