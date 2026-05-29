import { useState } from "react";
import { movieApi } from "../constants/axios";
import { userRequests } from "../constants/requests";
import { useAppStatContext } from "../hooks/useAppStateContext";
import DynamicForm from "./DynamicForm";

const RegisterForm = () => {
  const { dispatch } = useAppStatContext()
  const [message, setMessage] = useState("");

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const registerUser = (event) => {
    event.preventDefault()

    if (!user.email || !user.username) {
      setMessage("Please fill all required fields")
    } else {
      movieApi.post(userRequests.register, {
        email: user.email,
        password: user.password,
        username: user.username
      }).then((response) => {
        console.log(response)
        dispatch({
          type: "Register",
          payload: {
            email: response.data.email,
            username: response.data.username
          }
        })
      }).catch((error) => {
        // display message
      })
    }
  };
  return (
    <div>
      <div className="inputs-container">
        <DynamicForm
          fields={[
            {
              name: 'email',
              label: 'Email',
              type: 'email',
              placeholder: 'Enter your email',
              gridColumn: '1 / -1'
            },
            {
              name: 'password',
              label: 'Password',
              type: 'password',
              placeholder: 'Enter your password',
              gridColumn: '1 / -1'
            },
            {
              name: 'username',
              label: 'Username',
              type: 'text',
              placeholder: 'Choose a username',
              gridColumn: '1 / -1'
            }
          ]}
          values={user}
          onChange={setUser}
          onSubmit={registerUser}
          useFormWrapper={false}
          submitLabel="Register"
        />
        <span className="form-message">{message}</span>
      </div>
    </div>
  );
};

export default RegisterForm;