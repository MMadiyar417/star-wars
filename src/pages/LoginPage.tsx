import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from '../redux/authSlice'; 

const schema = yup.object().shape({
  username: yup.string().required('Логин обязательный'),
  password: yup.string().required('Пароль обязательный'),
});

interface FormData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    if (data.username === 'admin' && data.password === 'password') {
      dispatch(login()); 
      navigate('/people'); 
    } else {
      alert('Неверные логин или пароль');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Логин</label>
          <input
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            {...register('username')}
          />
          {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Пароль</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            {...register('password')}
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Войти</button>
      </form>
    </div>
  );
};

export default LoginPage;
