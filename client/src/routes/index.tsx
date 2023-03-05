import { memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from 'src/components';
import { NavigationListView } from 'src/modules/app';
import { LoginView, RegisterView } from 'src/modules/auth';
import { ContentEditView, ContentListView } from 'src/modules/content';
import { HomeView } from 'src/modules/dashboard';
import { UserEditView, UserListView } from 'src/modules/user';

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
            <Route path="/post/add" element={<ProtectedRoute />}>
                <Route path="/post/add" element={<ContentEditView />} />
            </Route>
            <Route path="/post/edit/:id" element={<ProtectedRoute />}>
                <Route path="/post/edit/:id" element={<ContentEditView />} />
            </Route>
            <Route path="/post/all-list" element={<ProtectedRoute />}>
                <Route path="/post/all-list" element={<ContentListView />} />
            </Route>
            <Route caseSensitive path="/login" element={<LoginView />} />
            <Route caseSensitive path="/register" element={<RegisterView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default memo(AppRoutes);
