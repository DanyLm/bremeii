import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

// Personalized components
import { TodoContext } from '../contexts/TodoContext';

/**
 *
 * @param {*} props
 * @returns
 */
export default function DeleteDialog(props) {
    const { open, onClose, todo } = props;
    const context = useContext(TodoContext);

    return (
        <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
            <DialogTitle>Delete confirmation</DialogTitle>
            <DialogContent dividers>
                Are you sure you want to delete <strong>{todo?.name}</strong> ?
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    color="warning"
                    onClick={() => {
                        context.deleteTodo(todo);
                        onClose();
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

DeleteDialog.defaultProps = {
    todo: {
        id: 0,
        name: ''
    }
};

DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    todo: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })
};
