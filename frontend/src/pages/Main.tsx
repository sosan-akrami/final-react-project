import { useState } from 'react';
import { Department } from '../components/Department';
import Header from '../components/Header';
import { Specialization } from '../components/Specialization';
import { StudentList } from '../components/StudentList';
import { University } from '../components/University';

export default function Main() {
  const [university, setUniversity] = useState<undefined | number | string>();
  const [department, setDepartment] = useState<undefined | number | string>();
  const [specialization, setSpecialization] = useState<
    undefined | number | string
  >();

  return (
    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[680px]'>
      <Header />
      <div className='bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12'>
        <University onChanged={setUniversity} />
        <Department onChanged={setDepartment} universityId={university} />
        <Specialization
          onChanged={setSpecialization}
          departmentId={department}
        />
      </div>
      {specialization && university && department && (
        <StudentList specializationId={specialization} />
      )}
    </div>
  );
}
