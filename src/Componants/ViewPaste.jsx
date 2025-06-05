import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {

const {id} = useParams();
const allPastes = useSelector( 
    (state) => state.paste.pastes
);

const Paste = allPastes.filter((paste) => paste._id === id)[0];

  return (
    <div>
      <div className="flex justify-center items-center min-h-[calc(100vh-72px)] w-[100vw] 
        bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
            <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-4 w-full max-w-2xl h-[calc(100vh-100px)] border border-blue-200 mt-1.5 flex flex-col mx-2 ">
                
                <div className="flex flex-col gap-3">
                    <input
                        className="px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-lg shadow"
                        type="text"
                        placeholder="Enter title here"
                        value={ Paste.title}
                        disabled
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-lg shadow resize-none min-h-[calc(100vh-192px)]"
                        placeholder="Enter your paste here"
                        value={ Paste.content}
                        disabled
                        onChange={(e) => setValue(e.target.value)}
                        
                    />
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewPaste
