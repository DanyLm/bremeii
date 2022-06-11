import React from 'react';
import { styled } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Personalized components
import TodoContextProvider from '../contexts/TodoContext';
import TodoTable from './TodoTable';
import AppSnackbar from './AppSnackbar';
import Navigation from './Navigation';
import NotFound from './NotFound';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const TodoList = () => (
    <TodoContextProvider>
        <TodoTable />
        <AppSnackbar />
    </TodoContextProvider>
);

const Router = () => (
    <BrowserRouter>
        <Navigation />
        <Offset />
        <Routes>
            <Route path="/" element={<TodoList />}>
                <Route path="todo-list" element={<TodoList />} />
            </Route>
            <Route path="tag-list" element={<div>okkk</div>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);

export default Router;
