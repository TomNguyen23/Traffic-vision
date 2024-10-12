import { APIProvider, Map } from "@vis.gl/react-google-maps";

const TestMap = () => {
    const potision = {lat: 51.5074, lng: 0.1278}
    
    return ( 
        
        <div className="bg-white absolute right-0 top-28 left-0 mx-12 my-7 rounded-md">
            <APIProvider apiKey={import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}>
                <div className="min-h-[40rem]">
                    <Map zoom={10} center={potision}>

                    </Map>
                </div>
            </APIProvider>
        </div>
     );
}
 
export default TestMap;