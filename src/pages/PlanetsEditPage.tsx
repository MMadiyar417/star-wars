import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import { updatePlanet } from '../redux/planetsSlice';

interface FormData {
  name: string;
  rotation_period: string;
  orbital_period: string;
}

const PlanetsEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const planet = useSelector((state: RootState) => 
    state.planets.planets.find((p) => p.id.toString() === id)
  );

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: planet?.name || '',
      rotation_period: planet?.rotation_period || '',
      orbital_period: planet?.orbital_period || '',
    },
  });

  const onSubmit = (data: FormData) => {
    dispatch(updatePlanet({ id: Number(id), ...data }));
    navigate(`/planets/details/${id}`);
  };

  return (
    <div className="container">
      <h1 className="my-4">Редактировать планету</h1>
      <div className="mb-4">
        <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>Назад</button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="card p-4">
        <div className="mb-3">
          <label className="form-label">Название:</label>
          <input {...register('name', { required: true })} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Длина суток:</label>
          <input {...register('rotation_period', { required: true })} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Орбитальный период:</label>
          <input {...register('orbital_period', { required: true })} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Сохранить</button>
      </form>
    </div>
  );
};

export default PlanetsEditPage;
