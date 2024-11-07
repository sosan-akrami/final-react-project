import React, { useState } from 'react';
import { baseURL } from '../config';

const UniversityForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = { name };

    try {
      const url = baseURL + '/universities';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      setLoading(false);
      if (!response.ok) {
        throw new Error('Failed to create university');
      }
      setName('');
      alert('University created successfully');
    } catch (error) {
      setLoading(false);

      console.error(error);
      alert('Error creating university');
    }
  };

  return (
    <div className='max-w-3xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg'>
      <h2 className='text-3xl font-semibold text-gray-800 mb-6 text-center'>
        Add University
      </h2>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label htmlFor='name' className='block text-lg text-gray-700'>
            University Name
          </label>
          <input
            type='text'
            id='name'
            placeholder='University Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
            required
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className={`w-full text-white p-3 rounded-lg  transition-all ${
            loading ? 'bg-gray-400' : 'hover:bg-blue-700 bg-blue-600'
          }`}
        >
          {loading ? 'Submitting' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default UniversityForm;
