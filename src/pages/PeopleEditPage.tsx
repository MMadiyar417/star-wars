import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import { updateCharacter } from '../redux/peopleSlice';

interface FormData {
  name: string;
  height: string;
  mass: string;
}

const PeopleEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const character = useSelector((state: RootState) => 
    state.people.characters.find((char) => char.id.toString() === id)
  );

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: character?.name || '',
      height: character?.height || '',
      mass: character?.mass || '',
    },
  });

  const onSubmit = (data: FormData) => {
    dispatch(updateCharacter({ id: Number(id), ...data }));
    navigate(`/people/details/${id}`);
  };

  return (
    <div className="container">
      <h1 className="my-4">Редактировать персонажа</h1>
      <div className="mb-4">
        <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>Назад</button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="card p-4">
        <div className="mb-3">
          <label className="form-label">Имя:</label>
          <input {...register('name', { required: true })} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Рост:</label>
          <input {...register('height', { required: true })} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Масса:</label>
          <input {...register('mass', { required: true })} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Сохранить</button>
      </form>
    </div>
  );
};

export default PeopleEditPage;
