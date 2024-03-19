"use client"

import axios from 'axios';
import { useForm } from 'react-hook-form';

const AddTweet = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    await axios.post('/api/add-tweet', {
      ...data,
    });

    reset();
  });

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-2'>
      <label>
        Message:
        <input className='text-black' type="text" {...register('message')} />
      </label>

      <label>
        Scheduled date:
        <input
        className='text-black'
          type="datetime-local"
          {...register('scheduledDate', { valueAsDate: true })}
        />
      </label>

      <button className='bg-blue-400' type="submit" value="Submit">subm</button>
    </form>
  );
};

export default AddTweet;