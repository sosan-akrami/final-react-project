import UniversityForm from '../components/UniversityForm';
import UniversityTable from '../components/UniversityTable';

export default function University() {
  return (
    <div className='bg-gray-100 min-h-screen py-10'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='bg-white rounded-lg shadow-lg p-8'>
            <UniversityForm />
          </div>
          <div className='bg-white rounded-lg shadow-lg p-8'>
            <UniversityTable />
          </div>
        </div>
      </div>
    </div>
  );
}
