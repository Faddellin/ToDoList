package ToDoList.Application.Repositories.ModelsDTO.Task.TaskShortModelComparators;

import ToDoList.Application.Repositories.ModelsDTO.Task.TaskShortModel;

import java.time.LocalDate;
import java.util.Comparator;

public class TaskShortModelDescDeadlineComparator implements Comparator<TaskShortModel> {
    @Override
    public int compare(TaskShortModel o1, TaskShortModel o2) {
        LocalDate fDeadline = o1.getDeadline();
        LocalDate sDeadline = o2.getDeadline();

        if (fDeadline.isAfter(sDeadline)) {
            return 1;
        }else if(fDeadline.isBefore(sDeadline)) {
            return 0;
        }else{
            return -1;
        }
    }
}
