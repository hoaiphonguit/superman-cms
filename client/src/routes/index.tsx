import { memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from 'src/components/ProtectedRoute';
import LoginView from 'src/modules/auth/view/login';
import RegisterView from 'src/modules/auth/view/register';
import HomeView from 'src/modules/dashboard/view/home';
import UserListView from 'src/modules/user/view/userlist';
import UserEditView from 'src/modules/user/view/useredit';
import NavigationListView from 'src/modules/app/view/navigationList';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute />}>
                <Route path="/" element={<HomeView />} />
            </Route>
            <Route path="/user/list" element={<ProtectedRoute />}>
                <Route path="/user/list" element={<UserListView />} />
            </Route>
            <Route path="/user/edit/:id" element={<ProtectedRoute />}>
                <Route path="/user/edit/:id" element={<UserEditView />} />
            </Route>
            <Route path="/user/add" element={<ProtectedRoute />}>
                <Route path="/user/add" element={<UserEditView />} />
            </Route>
            <Route path="/navigation/list" element={<ProtectedRoute />}>
                <Route
                    path="/navigation/list"
                    element={<NavigationListView />}
                />
            </Route>
            <Route caseSensitive path="/login" element={<LoginView />} />
            <Route caseSensitive path="/register" element={<RegisterView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default memo(AppRoutes);
