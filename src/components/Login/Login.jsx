import { useState } from "react";

import cn from "classnames";
import { useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";

import "./Login.scss";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const successData = { email: "mail@co.ru", pass: "1234" };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsError(false);
    setIsLoading(true);

    setTimeout(() => {
      if (data.email !== successData.email || data.pass !== successData.pass) {
        setIsError(true);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="login">
      {isLoading && (
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{ position: "absolute", zIndex: 2 }}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#ccc"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
      <div className="login-card">
        <div className="login__title">
          {isSuccess ? "Успешный вход" : "Вход"}
        </div>
        {isError && <div className="error-form">Неверная почта или пароль</div>}
        <form
          className={cn(
            "login__form",
            { disabled: isLoading },
            { disabled: isSuccess }
          )}
        >
          <div className="email-wrap">
            <input
              type="email"
              className="input-email"
              placeholder="Почта"
              {...register("email", {
                required: "Это обязательное поле",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Неверный формат почты",
                },
              })}
            />
            {errors.email && (
              <div className="errorMsg">{errors.email.message}</div>
            )}
          </div>
          <div className="pass-wrap">
            <input
              type="password"
              className="input-pass"
              placeholder="Пароль"
              {...register("pass", {
                required: "Это обязательное поле",
              })}
            />
            {errors.pass && (
              <div className="errorMsg">{errors.pass.message}</div>
            )}
          </div>
        </form>
        <button
          className={cn(
            "btn",
            { disabled: isLoading },
            { disabled: isSuccess }
          )}
          onClick={handleSubmit(onSubmit)}
        >
          Войти
        </button>
      </div>
      <div className="successData">
        <div>mail: {successData.email}</div>
        <div>password: {successData.pass}</div>
      </div>
    </div>
  );
}

export default Login;
