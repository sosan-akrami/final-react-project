import React, { useEffect, useState } from 'react';
import { baseURL } from '../config';

interface University {
  id: number;
  name: string;
}

const UniversityTable: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [currentUniversity, setCurrentUniversity] = useState<University | null>(
    null
  );
  const [updatedName, setUpdatedName] = useState<string>('');

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    setLoading(true);
    try {
      const url = baseURL + '/universities';
      const response = await fetch(url);
      const data = await response.json();
      setUniversities(data);
    } catch (error) {
      console.error('Error fetching universities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this university?'
    );

    if (isConfirmed) {
      setDeleteLoading(id);
      try {
        const url = `${baseURL}/universities/${id}`;
        const response = await fetch(url, {
          method: 'DELETE',
        });

        if (response.ok) {
          setUniversities((prevUniversities) =>
            prevUniversities.filter((university) => university.id !== id)
          );
          alert('University deleted successfully');
        } else {
          alert('Failed to delete university');
        }
      } catch (error) {
        console.error('Error deleting university:', error);
        alert('Error deleting university');
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  const handleEdit = (university: University) => {
    setCurrentUniversity(university);
    setUpdatedName(university.name);
    setEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (currentUniversity) {
      setSaveLoading(true);
      try {
        const url = `${baseURL}/universities/${currentUniversity.id}`;
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: updatedName }),
        });

        if (response.ok) {
          setUniversities((prevUniversities) =>
            prevUniversities.map((university) =>
              university.id === currentUniversity.id
                ? { ...university, name: updatedName }
                : university
            )
          );
          alert('University updated successfully');
          setEditModalOpen(false);
        } else {
          alert('Failed to update university');
        }
      } catch (error) {
        console.error('Error updating university:', error);
        alert('Error updating university');
      } finally {
        setSaveLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setEditModalOpen(false);
  };

  if (loading) {
    return <div className='text-center py-4'>Loading...</div>;
  }

  return (
    <div className='max-w-5xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-3xl font-semibold text-gray-800'>
          University List
        </h2>

        <button
          onClick={fetchUniversities}
          className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center'
        >
          Refresh Table
        </button>
      </div>
      <table className='min-w-full table-auto border-collapse text-left'>
        <thead>
          <tr className='bg-blue-600 text-white'>
            <th className='py-3 px-6 text-sm font-medium'>University ID</th>
            <th className='py-3 px-6 text-sm font-medium'>University Name</th>
            <th className='py-3 px-6 text-sm font-medium'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((university) => (
            <tr key={university.id} className='border-b hover:bg-gray-50'>
              <td className='py-4 px-6 text-sm text-gray-800'>
                {university.id}
              </td>

              <td className='py-4 px-6 text-sm text-gray-800'>
                {university.name}
              </td>

              <td className='py-4 px-6 text-sm text-gray-800 flex justify-between'>
                <button
                  onClick={() => handleEdit(university)}
                  className='bg-yellow-600 text-white py-1 px-3 rounded hover:bg-yellow-700'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(university.id)}
                  className='bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed ml-2 flex items-center'
                  disabled={deleteLoading === university.id}
                >
                  {deleteLoading === university.id ? (
                    <svg
                      className='w-5 h-5 animate-spin mr-2 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0a10 10 0 00-10 10h2z'
                      ></path>
                    </svg>
                  ) : (
                    'Delete'
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 max-w-sm w-full'>
            <h2 className='text-xl font-semibold text-center text-gray-800 mb-4'>
              Edit University
            </h2>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-semibold mb-2'
                htmlFor='name'
              >
                University Name
              </label>
              <input
                type='text'
                id='name'
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div className='flex justify-between'>
              <button
                onClick={handleCancel}
                className='bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500'
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center'
                disabled={saveLoading}
              >
                {saveLoading ? (
                  <svg
                    className='w-5 h-5 animate-spin mr-2 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0a10 10 0 00-10 10h2z'
                    ></path>
                  </svg>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversityTable;
