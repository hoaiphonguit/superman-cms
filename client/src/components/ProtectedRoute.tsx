import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { authSelector } from 'src/redux/selectors/auth';

const ProtectedRoute = () => {
    const authState = useSelector(authSelector);

    return authState?.isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default memo(ProtectedRoute);
