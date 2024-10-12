import RealtimeViolation from '@/components/tables/realtime-violation';
import ViolationHistory from '@/components/tables/violation-history';
import { useLocation } from 'react-router-dom';

const ViolationTable = () => {
    const location = useLocation();
    const historyPage = location.pathname === '/violations' || location.pathname === '/admin/violation-history' || location.pathname === '/';
    return ( 
    <div className="bg-white absolute right-0 top-28 left-0 mx-12 my-7 rounded-md">
        <h1 className="px-8 py-4 text-lg font-semibold text-gray-700">Chi tiết vi phạm</h1>
        {
            historyPage ? (<ViolationHistory />) : (<RealtimeViolation />)
        }
        
    </div>
    );
}
 
export default ViolationTable;