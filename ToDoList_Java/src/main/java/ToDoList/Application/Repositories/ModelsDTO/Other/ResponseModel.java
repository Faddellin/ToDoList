package ToDoList.Application.Repositories.ModelsDTO.Other;

public class ResponseModel {

    public ResponseModel(int status, String message) {
        this.status = status;
        this.message = message;
    }

    private int status;
    private String message;
}
