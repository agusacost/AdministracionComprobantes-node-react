import { useForm } from "react-hook-form";
import { useAuth } from "../context/authcontext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tickets");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="bg-green-400 p-8 rounded shadow-md w-80">
        <h2 className="text-white font-bold text-2xl mb-4 text-center">
          Registro de Usuario
        </h2>
        <form onSubmit={onSubmit} className="space-y-5">
          <input
            type="text"
            {...register("user", { required: true })}
            className="block text-sm uppercase text-gray-500 w-full px-3 py-2 rounded-md my-2 font-semibold border border-gray-400"
            placeholder="User"
          />
          {errors.user && (
            <p className="text-red-500 uppercase text-xs text-center p-2 mb-1 font-bold ">
              *Username es requrido
            </p>
          )}

          <input
            type="password"
            {...register("password", { required: true })}
            className="block text-sm uppercase text-gray-500 w-full px-3 py-2 rounded-md my-2 font-semibold border border-gray-400"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 uppercase text-xs text-center p-2 mb-1 font-bold">
              *Contraseña es requerida
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-white hover:bg-gray-200 text-black font-bold py-3 cursor-pointer"
          >
            Registrar
          </button>
        </form>
        {registerErrors && registerErrors.length > 0 && (
          <div className="bg-red-200 p-4 rounded my-4 text-red-800">
            {registerErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;
