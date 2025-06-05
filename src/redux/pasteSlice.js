import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    pastes: localStorage.getItem('pastes') ? JSON.parse(localStorage.getItem('pastes')) : [],
}

export const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addTOPaste: (state, action) => {
            const newPaste = action.payload;

            // Check if a paste with the same title already exists
            const existingPaste = state.pastes.find((paste) => paste.title === newPaste.title);
            if (existingPaste) {
                toast.error(`paste with title ${newPaste.title} already exists!`, {
                    icon: '❌',
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                });
                return;
            }

            state.pastes.push(newPaste);
            localStorage.setItem('pastes', JSON.stringify(state.pastes));
            toast.success(`paste ${newPaste.title} created successfully!`, {
                icon: '✅',
                style: {
                    background: '#333',
                    color: '#fff',
                },
            }

            )

        },

        updateToPaste: (state, action) => {
            const updatedPaste = action.payload;
            const index = state.pastes.findIndex((paste) => paste._id === updatedPaste._id);
            if (index !== -1) {
                state.pastes[index] = updatedPaste;
                localStorage.setItem('pastes', JSON.stringify(state.pastes));
                toast.success(`paste ${updatedPaste.title} updated successfully!`, {
                    icon: '✅',
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                });
            }
        },

        removeFromPaste: (state, action) => {
            const pasteId = action.payload;
            const index = state.pastes.findIndex((paste) => paste._id === pasteId);
            if (index >=0) {
                state.pastes.splice(index, 1);
                localStorage.setItem('pastes', JSON.stringify(state.pastes));
                toast.success(`paste deleted successfully!`, {
                    icon: '✅',
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                });
            }
            
        },

        resetAllPastes: (state, action) => {
            state.pastes = [];
            localStorage.removeItem('pastes');
        },


    }
})

// Action creators are generated for each case reducer function
export const { addTOPaste, updateToPaste, removeFromPaste, resetAllPastes } = pasteSlice.actions

export default pasteSlice.reducer