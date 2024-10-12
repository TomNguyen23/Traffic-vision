import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

const Dashboard = () => {

    return ( 
        <div className="bg-white text-2xl text-center absolute right-0 top-28 left-0 h-3/4 mx-12 my-7 rounded-md flex justify-center items-center">
            <div>
                <FontAwesomeIcon icon={faCircleCheck} className='text-[#63e6be] pb-3' size='7x' />
                <h1 className='font-bold'>Chào mừng bạn đến với Traffic vision! Hãy bắt đầu bằng việc tra cứu lịch sử vi phạm</h1>
            </div>
        </div>
     );
}
 
export default Dashboard;