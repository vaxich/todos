import {TaskStatuses, TaskType} from "../../API/todolists-api";
import {Delete} from "@mui/icons-material";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import {ChangeEvent, useCallback} from "react";


export const Task = (props: taskPropsType) => {

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => { // функция изменения статуса таски
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {//функция изменения титла
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.todolistId]);

    return <div key={props.task.id}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
        <IconButton /*onClick={onClickHandler}*/>
            <Delete/>
        </IconButton>

    </div>
}


//type

export type taskPropsType = {
    task: TaskType
    todolistId: string
        changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
}