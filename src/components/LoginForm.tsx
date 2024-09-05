import { authenticateUser } from "@/api/AuthAPI";
import toyCar from "@/assets/toy-car.svg";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { PlayerLoginForm } from "../types";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PlayerLoginForm>();

  const navigate = useNavigate();

  const [requestError, setRequestError] = useState("");

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      console.error("Error:", error);
      setRequestError("Código de jugador incorrecto");
    },
    onSuccess: () => {
      reset();
      navigate("/");
    },
  });

  const handleLogin = (formData: PlayerLoginForm) => mutate(formData);

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <img src={toyCar} className="" alt="Toy Car" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Bingo Game Login
        </h2>
        <p className="text-center text-xl font-light text-gray-500">
          Introduce tu código para empezar a jugar
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleLogin)}>
        <div className="rounded-md shadow-sm -space-y-px">
          {errors.code && (
            <p className="p-1 text-red-500 capitalize text-sm">
              {errors.code.message}
            </p>
          )}
          {requestError && (
            <p className="p-1 text-red-500 capitalize text-sm">
              {requestError}
            </p>
          )}
          <div>
            <label htmlFor="code"></label>
            <input
              id="code"
              type="text"
              placeholder="Código de Jugador"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
          </div>
        </div>

        <div>
          <button
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
