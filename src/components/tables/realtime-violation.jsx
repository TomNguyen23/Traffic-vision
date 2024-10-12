import { getAllViolators } from '@/services/axios/violations-service';
import { useState, useEffect } from 'react';

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import CardModal from '@/components/cards/cardModal';

import { w3cwebsocket as W3CWebSocket } from "websocket";

const RealtimeViolation = () => {
    const [violators, setViolators] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [highlightedRecord, setHighlightedRecord] = useState(null);

    const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/');

    const getViolators = async (page) => {
        try {
          let res = await getAllViolators(page);
          if (res && res.data) {
            setViolators(res.data.violations);
            setTotalPages(res.data.total_pages);
          }
        } catch (error) {
          console.error('There was an error!', error);
        }
    }

    useEffect(() => {
        getViolators(totalPages);
    }, [totalPages])

    useEffect(() => {
        if (highlightedRecord) {
          setTimeout(() => {
            setHighlightedRecord(null);
          }, 1000);
        }
    }, [highlightedRecord]);

    useEffect(() => {
        client.onopen = () => {
          console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
          const dataFromServer = JSON.parse(message.data);
          console.log(dataFromServer);
          if (dataFromServer['type'] === 'on_connect') {
            client.send(JSON.stringify({
              connect_type: 'client',
            }));   
          }
          else {
            setViolators((prevViolators) => {
              let newViolators = [dataFromServer, ...prevViolators];
              
              if (newViolators.length > 10) {
                newViolators = newViolators.slice(0, 10);
              }
    
              setHighlightedRecord(dataFromServer);
    
              return newViolators;
            });
          }
        };
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

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
            <Table>
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
                        
                        <TableRow key={`violator-${index}`} className={violator === highlightedRecord ? 'bg-base-200' : ''}>
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
            </Table>
            
        </div>
     );
}
 
export default RealtimeViolation;