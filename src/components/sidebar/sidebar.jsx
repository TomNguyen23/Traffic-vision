import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faMagnifyingGlass, faMap, faTrafficLight, faUser } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';

const SideBar = () => {
    const user = useSelector((state) => state.auth.user);
    return ( 
        <div className="basis-1/6 md:p-4">
            <Link to="/">
                <div className="md:pt-6 md:pb-10 text-[#475569] font-bold uppercase">Traffic Vision</div>
            </Link>

            <ul className='md:pt-4'>
                <li className='md:pb-5 text-[#64748B] text-xs font-bold uppercase'>Danh mục</li>
                
                {!user && (
                    <li className='md:pb-4'>
                        <Link
                            className={(window.location.href.indexOf("/violations") !== -1) 
                                ? "text-blue-500 hover:text-blue-600" 
                                : "text-gray-500 hover:text-gray-600"}
                            to="/violations">
                            <div className="text-xs font-bold uppercase">
                            <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' />  Tra cứu vi phạm
                            </div>
                        </Link>
                    </li>
                )}

                {user && (
                    <div>
                        <li className='md:pb-4'>
                            <Link
                                className={(window.location.href.indexOf("/admin/violation-history") !== -1) 
                                    ? "text-blue-500 hover:text-blue-600" 
                                    : "text-gray-500 hover:text-gray-600"}
                                to="/admin/violation-history">
                                <div className="text-xs font-bold uppercase">
                                <FontAwesomeIcon icon={faClockRotateLeft} size='lg' className='pr-2' />  Lịch sử vi phạm
                                </div>
                            </Link>
                        </li>

                        <li className='md:pb-4'>
                            <Link
                                className={(window.location.href.indexOf("/admin/realtime-violation") !== -1) 
                                    ? "text-blue-500 hover:text-blue-600" 
                                    : "text-gray-500 hover:text-gray-600"}
                                to="/admin/realtime-violation">
                                <div className="text-xs font-bold uppercase">
                                <FontAwesomeIcon icon={faTrafficLight} size='lg' className='pr-2'/>  Theo dõi vi phạm
                                </div>
                            </Link>
                        </li>

                        <li className='md:pb-4'>
                            <Link
                                className={(window.location.href.indexOf("/admin/map") !== -1) 
                                    ? "text-blue-500 hover:text-blue-600" 
                                    : "text-gray-500 hover:text-gray-600"}
                                to="/admin/map">
                                <div className="text-xs font-bold uppercase">
                                <FontAwesomeIcon icon={faMap} size='lg' className='pr-2'/>  Bản đồ
                                </div>
                            </Link>
                        </li>
                    </div>
                )}

                
                
                {!user && (
                    
                    <div>
                        <div className="divider"></div>

                        <li className='md:pb-5'>
                            <Link
                                className={(window.location.href.indexOf("/login") !== -1) 
                                    ? "text-blue-500 hover:text-blue-600" 
                                    : "text-gray-500 hover:text-gray-600"}
                                to="/login">
                                <div className="text-xs font-bold uppercase">
                                <FontAwesomeIcon icon={faUser} size='lg' />  Đăng nhập
                                </div>
                            </Link>
                        </li>
                    </div>
                )}
                
            </ul>
            
        </div>
     );
}
 
export default SideBar;