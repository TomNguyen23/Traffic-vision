import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { searchLicensePlate } from '@/services/axios/violations-service';
import CardModal from '@/components/cards/cardModal';
import { useSelector } from 'react-redux';
import useDebound from '@/hooks/useDebound';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const ViolationHistory = () => {
    const [violators, setViolators] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const searchValue = useSelector((state) => state.licensePlate.licensePlates);
    const searchValueDebound = useDebound(searchValue);

    const user = useSelector((state) => state.auth.user);


    useEffect(() => {
        getLicensePlateResult(1, searchValueDebound);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValueDebound]);

    const getLicensePlateResult = async (page, licensePlate) => {
        try {
            let res = await searchLicensePlate(page, licensePlate);
            if (res && res.data) {
                if (licensePlate === '' && !user ) return setViolators([]);
                setViolators(res.data.violations);
                setTotalPages(res.data.total_pages);
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    const handlePageClick = async (event) => {
        getLicensePlateResult(event.selected + 1, '');
    }

    const formatDate = (violation_time) => {
        const date = new Date(violation_time);
        const formattedDate = 
        ("0" + date.getDate()).slice(-2) + "/" +
        ("0" + (date.getMonth() + 1)).slice(-2) + "/" +
        date.getFullYear() + " " +
        
        ("0" + date.getHours()).slice(-2) + ":" +
        ("0" + date.getMinutes()).slice(-2) + ":" +
        ("0" + date.getSeconds()).slice(-2);
        return formattedDate;
    }

    return ( 
        <div>
            {violators.length === 0 
                ? (<div className="flex flex-col justify-center items-center w-full h-96 overflow-x-auto">
                    <FontAwesomeIcon icon={faCircleXmark} size='7x' className="text-red-500"/>
                    {/* <i className="far fa-times-circle text-7xl text-red-500"></i> */}
                    <h1 className="text-gray-400 text-3xl">Không tìm thấy kết quả</h1>
                </div>) 
                : (<Table>
                        <TableHeader>
                            <TableRow className="bg-[#f8fafc]">
                                <TableHead className="w-1/5">Loại phương tiện</TableHead>
                                <TableHead>Biển số xe</TableHead>
                                <TableHead>Thời gian vi phạm</TableHead>
                                <TableHead>Địa điểm vi phạm</TableHead>
                                <TableHead className="text-right">Hình ảnh vi phạm</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            
                            {violators.map((violator, index) => (
                                
                                <TableRow key={`violator-${index}`}>
                                    <TableCell>{violator.violator.vehicle_type}</TableCell>
                                    <TableCell >{violator.violator.vehicle_plate}</TableCell>
                                    <TableCell>{formatDate(violator.violation_time)}</TableCell>
                                    <TableCell>{violator.location.address}</TableCell>
                                    <TableCell className="text-right">
                                        <button className="btn btn-ghost" onClick={()=>document.getElementById(`${violator.violator.vehicle_plate}`).showModal()}>chi tiết</button>
                                    </TableCell>
                                    <CardModal vehiclePlate={violator.violator.vehicle_plate} imgPath={violator.violation_image_path}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>)
            }
            
            {user && (
                    <div className="w-full mb-12 px-4 flex justify-end items-center">
                        <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={totalPages}
                        previousLabel="< previous"

                        pageClassName="join-item btn"
                        previousClassName="join-item btn"
                        nextClassName="join-item btn"
                        containerClassName="join"
                        activeClassName="btn-active"
                        />
                    </div>
                )
            }
        </div>
     );
}
 
export default ViolationHistory;