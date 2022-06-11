import React, { useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';

// Personalized components
import { TodoContext } from '../contexts/TodoContext';

/**
 *
 * @returns
 */
export default function AppSnackbar() {
    const context = useContext(TodoContext);

    return (
        <Snackbar
            open={context.message.text !== undefined}
            spacing={2}
            autoHideDuration={6000}
            onClose={() => context.setMessage({})}
        >
            <Alert onClose={() => context.setMessage({})} severity={context.message.level}>
                {context.message.text?.length > 1 ? (
                    <ul style={{ marginLeft: '-2em', listStyle: 'none' }}>
                        {context.message.text?.map(text => (
                            <li key={text}>{text}</li>
                        ))}
                    </ul>
                ) : (
                    context.message.text?.[0]
                )}
            </Alert>
        </Snackbar>
    );
}
