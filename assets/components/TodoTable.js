import React, { useContext, useState } from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Tooltip,
    TextField,
    InputAdornment,
    Button
} from '@mui/material';

// Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

// Personalized components
import { TodoContext } from '../contexts/TodoContext';
import DeleteDialog from './DeleteDialog';

/**
 *
 * @param {*} theme
 * @returns
 */
const sx = {
    th: theme => ({
        backgroundColor: theme.palette.primary.dark
    })
};

/**
 *
 * @returns
 */
export default function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    const [appState, setAppState] = useState('listening');
    const [editTodo, setEditTodo] = useState('');
    const [deleteTodo, setDeleteTodo] = useState({});

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={sx.th}>Task</TableCell>
                        <TableCell align="right" sx={sx.th}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2}>
                            <form onSubmit={event => context.createTodo(event, { name: addTodo })}>
                                <TextField
                                    value={addTodo}
                                    onChange={event => setAddTodo(event.target.value)}
                                    label="New Task"
                                    fullWidth
                                    variant="outlined"
                                />
                                <Tooltip title="Add" type="submit">
                                    <IconButton>
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            </form>
                        </TableCell>
                    </TableRow>
                    {context.todos
                        .slice()
                        .reverse()
                        .map((todo, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {appState === `editing-${index}` ? (
                                        <form
                                            onSubmit={event => {
                                                context.updateTodo(event, {
                                                    id: todo.id,
                                                    name: editTodo
                                                });
                                                setAppState('listening');
                                            }}
                                        >
                                            <TextField
                                                value={editTodo}
                                                onChange={event => setEditTodo(event.target.value)}
                                                label="Edit Task"
                                                fullWidth
                                                autoFocus
                                                variant="outlined"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="start">
                                                            <Tooltip title="Validate changes">
                                                                <Button
                                                                    onClick={() =>
                                                                        setAppState('listening')
                                                                    }
                                                                >
                                                                    <ClearIcon />
                                                                </Button>
                                                            </Tooltip>
                                                            <Tooltip title="Validate changes">
                                                                <Button type="submit">
                                                                    <DoneIcon />
                                                                </Button>
                                                            </Tooltip>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </form>
                                    ) : (
                                        todo.name
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Edit">
                                        <IconButton
                                            color="secondary"
                                            onClick={() => {
                                                setAppState(`editing-${index}`);
                                                setEditTodo(todo.name);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            color="error"
                                            onClick={() => {
                                                setDeleteTodo(todo);
                                                setAppState('deleting');
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <DeleteDialog
                todo={deleteTodo}
                open={appState === 'deleting'}
                onClose={() => setAppState('listening')}
            />
        </>
    );
}
