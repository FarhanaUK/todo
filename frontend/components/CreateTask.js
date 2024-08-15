import React, {useState} from 'react'

import * as yup from 'yup'





const e = {
  
  createTaskMax: "Cannot exceed 20 characters",
  createTaskRequired: "Task is required"
  
};

const formSchema = yup.object().shape({
  createTask: yup
  .string().trim().max(20, e.createTaskMax).required(e.createTaskRequired)

});

function CreateTask() {
  const [values, setValues] = useState({ createTask: ""});
  const [errors, setErrors] = useState({ createTask: "" });
  const [taskList, setTaskList] = useState([])
  const [isDisabled, setDisabled] = useState(false)

  //UNDERSTAND DIFFERENCE BETWEEN ONCHANGE, USEEFFECT, ONSUBMIT,
  // ADD A LIMIT TO CHARACTERS TYPED IN BOX
  //ADD STYLNG USING STYLED COMPONENT
  //ADD TESTINGS
  //SEE HOW TO STOP BOX FROM MOVING WHEN 20 CHAR IS TYPED

 
  const onChange = (evt) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });


    

    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        setErrors({ ...errors, [name]: "" });
        setDisabled(false)
      })
      .catch((err) => {
        setErrors({ ...errors, [name]: err.errors[0] });
        setDisabled(true)
      });
  };

 const onClick =()=> {
 if(!values.createTask.trim() ) {
  alert("you must create a task first")
 }
 else
 setTaskList([...taskList, values.createTask]);
 setValues({ createTask: "" });
 
 }

  return (
    <div>
      <div>
        <input
          name="createTask"
          type="text"
          placeholder="Create New Task Here"
          onChange={onChange}
          value={values.createTask}
        />
        {errors.createTask && <div>{errors.createTask}</div>}
        <button onClick={onClick} disabled={isDisabled}>Add Task</button> 
      </div>
      <ul>
       {taskList.map((task, idx) => {
       return <li key={idx}>{task}</li>
       })}
       
      </ul>
    </div>
  );
}
export default CreateTask;