import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import { updateStarship } from '../redux/starshipsSlice';

interface FormData {
  name: string;
  model: string;
  manufacturer: string;
}

const StarshipsEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const starship = useSelector((state: RootState) => 
    state.starships.starships.find((s) => s.id.toString() === id)
  );

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: starship?.name || '',
      model: starship?.model || '',
      manufacturer: starship?.manufacturer || '',
    },
  });

  const onSubmit = (data: FormData) => {
    dispatch(updateStarship({ id: Number(id), ...data }));
    navigate(`/starships/details/${id}`);
  };

  return (
    <div className="container">
      <h1 className="my-4">Редактировать космический корабль</h1>
      <div className="mb-4">
        <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>Назад</button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="card p-4">
        <div className="mb-3">
          <label className="form-label">Название:</label>
          <input {...register('name', { required: true })} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Модель:</label>
          <input {...register('model', { required: true })} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Производитель:</label>
          <input {...register('manufacturer', { required: true })} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Сохранить</button>
      </form>
    </div>
  );
};

export default StarshipsEditPage;
