import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { addTOPaste, updateToPaste } from '../redux/pasteSlice'

const Home = () => {
    const [title, setTitle] = useState('')
    const [value, setValue] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const pasteId = searchParams.get('pasteId')
    const dispatch = useDispatch()

    useEffect(() => {
        if (pasteId) {
            const pastes = JSON.parse(localStorage.getItem('pastes')) || [];
            const existingPaste = pastes.find(paste => paste._id === pasteId);
            if (existingPaste) {
                setTitle(existingPaste.title);
                setValue(existingPaste.content);
            }
        } else {
            setTitle('');
            setValue('');
        }
    }, [pasteId])

    function createPaste() {
        const pasteData = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }

        if (pasteId) {
            dispatch(updateToPaste(pasteData))
        } else {
            dispatch(addTOPaste(pasteData))
        }

        setTitle('')
        setValue('')
        setSearchParams({})
    }

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-72px)] w-[100vw] 
        bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
            <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-4 w-full max-w-2xl h-[calc(100vh-100px)] border border-blue-200 mt-1.5 flex flex-col mx-2 ">
                <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center drop-shadow">{
                    pasteId ? 'Edit Your Paste' : 'Create a New Paste'
                }</h2>
                <div className="flex flex-col gap-3">
                    <input
                        className="px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-lg shadow"
                        type="text"
                        placeholder="Enter title here"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-lg shadow resize-none min-h-[calc(100vh-300px)]"
                        placeholder="Enter your paste here"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        
                    />
                    <button
                        className="mt-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 rounded-xl shadow-lg hover:from-yellow-400 hover:to-yellow-500 hover:text-blue-800 transition-all duration-300 text-lg"
                        onClick={createPaste}
                    >
                        {pasteId ? 'Update My Paste' : 'Create My Paste'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home