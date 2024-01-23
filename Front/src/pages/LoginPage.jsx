import { useForm } from "react-hook-form";
import {useAuth} from "../context/authcontext.jsx"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {signin ,errors: signinErrors,isAuthenticated} = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);

  });

  useEffect(() => {
    if(isAuthenticated) navigate("/tickets");
  }, [isAuthenticated,navigate])
  

  return (
    <div className="bg-white flex h-[calc(100vh-70px)] items-center justify-center">
      <div className="bg-gray-300 max-w-md w-full p-10 rounded shadow-md ">
        <h2 className="text-slate-950	 font-bold text-2xl mb-4 text-center">
          Gestor de Tickets
        </h2>
      <form onSubmit={onSubmit} className="space-y-5">
        <input
          type="text"
          {...register("user", { required: true })}
          className="block text-sm text-gray-500 w-full px-3 py-2 rounded-md my-2 font-semibold border border-gray-400"
          placeholder="Usuario"
        />
        {errors.user && (
          <p className="text-red-500 uppercase text-xs text-center p-2 mb-1 font-bold ">
            *Username es requrido
          </p>
        )}

        <input
          type="password"
          {...register("password", { required: true })}
          className="block text-sm  text-gray-500 w-full px-3 py-2 rounded-md my-2 font-semibold border border-gray-400"
          placeholder="Contraseña"
        />
        {errors.password && (
          <p className="text-red-500 uppercase text-xs text-center p-2 mb-1 font-bold">
            *Contraseña es requerida
          </p>
        )}
        {signinErrors && signinErrors.length > 0 && (
          <div className="bg-red-200 p-4 rounded my-4 text-red-800">
            {signinErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-white hover:bg-gray-200 text-black font-bold py-3 cursor-pointer"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
    </div>
  );
}

export default LoginPage;
