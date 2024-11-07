import React, { useEffect, useState } from 'react';
import { baseURL } from '../config';

export const Specialization = ({
  onChanged,
  departmentId,
}: {
  onChanged: React.Dispatch<React.SetStateAction<string | number | undefined>>;
  departmentId: string | number | undefined;
}) => {
  const [specializations, setSpecializations] = useState([]);
  const [selectedValue, setSelectedValue] = useState<
    undefined | number | string
  >(undefined);

  const fetchSpecializations = async () => {
    if (!departmentId) return;
    const url = `${baseURL}/departments/${departmentId}/specializations`;
    const response = await fetch(url);
    const list = await response.json();
    setSpecializations(list);
  };

  const onInputChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChanged(value);
  };

  useEffect(() => {
    fetchSpecializations();
  }, [departmentId]);

  return (
    <div>
      <label
        htmlFor='location'
        className='block text-sm/6 font-medium text-gray-900'
      >
        Specialization
      </label>
      <select
        value={selectedValue} // ...force the select's value to match the state variable...
        onChange={onInputChanged} // ..
        className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm/6'
      >
        <option value={''} defaultValue={''}>
          Select Specialization
        </option>
        {specializations.map((uni: any) => {
          return (
            <option key={uni.id} value={uni.id}>
              {uni.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
