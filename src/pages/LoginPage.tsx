import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function login(data) {
    console.log("Login...");
    console.log(data);
    fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: data.code }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error("Not found");
      })
      .then((token) => {
        console.log(token);
        localStorage.setItem("AUTH_TOKEN", token.token);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al iniciar sesión");
      });
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(login)}>
        <input
          id="code"
          type="text"
          placeholder="Código de Jugador"
          {...register("code", {
            required: "El código del jugador es obligatorio",
            minLength: {
              value: 8,
              message: "Mínimo 8 caracteres",
            },
            maxLength: {
              value: 8,
              message: "Máximo 8 caracteres",
            },
          })}
        />
        <button type="submit">Login</button>
      </form>

      {errors.code && <p>{errors.code.message}</p>}
    </div>
  );
};

export default LoginPage;
