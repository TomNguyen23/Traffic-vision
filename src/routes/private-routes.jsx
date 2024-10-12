import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ element: Component, roles, ...rest }) => {
    const user = useSelector((state) => state.auth.user);
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (roles && roles.length > 0 && !roles.includes(user.role)) {
        return <Navigate to="/not-authorized" state={{ from: location }} />;
    }

    return <Component {...rest} />;
};

PrivateRoute.propTypes = {
    element: PropTypes.elementType.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
};

export default PrivateRoute;