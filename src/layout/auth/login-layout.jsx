import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Toaster } from "@/components/ui/toaster"

const LoginLayout = ({ children }) => {
    return ( 
        <div className="bg-[#1e293b] min-h-screen">
            <Link className='px-3 py-5 fixed top-0 right-0 left-0' to="/login">
                <h1 className='uppercase text-white text-sm font-bold px-4 mx-28'>Traffic Vision</h1>
            </Link>
            {children}

            <Toaster />
        </div>
     );
}

LoginLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };
export default LoginLayout;