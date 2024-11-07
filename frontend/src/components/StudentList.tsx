import React, { useEffect, useState } from 'react';
import { baseURL } from '../config';

export const StudentList = ({
  specializationId,
}: {
  specializationId: string | number | undefined;
}) => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    if (!specializationId) return;
    const url = `${baseURL}/specializations/${specializationId}/students`;
    const response = await fetch(url);
    const list = await response.json();
    setStudents(list);
  };

  useEffect(() => {
    fetchStudents();
  }, [specializationId]);

  return (
    <div className='mt-8 flow-root'>
      <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
          <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                  >
                    Name
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Last Name
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    ID
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Email
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 bg-white'>
                {students.map((student: any) => (
                  <tr key={student.email}>
                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                      {student.name}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {student.lastName}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {student.id}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {student.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
