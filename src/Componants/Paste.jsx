import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPaste } from '../redux/pasteSlice'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'
import { FaEdit, FaEye, FaTrash, FaCopy, FaShareAlt, FaDownload } from 'react-icons/fa'
import { format } from 'date-fns';


const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes)
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 py-6 ">
      <div className=" mx-6 ">
        <div className='flex gap-4 mb-4'>
          <input
            type="search"
            placeholder="🔍 Search pastes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" w-[calc(100%)] px-5 py-3 rounded-xl border border-blue-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg transition-all
            "
          />
          <button
            className='bg-blue-500 rounded-xl px-2 hover:bg-blue-600 '
          >
            <Link
              to="/"
            >
              <img
                className='w-9'
                src="/plus.png" alt="" />
            </Link>



          </button>



        </div>

        <div className="flex flex-col gap-3">
          {filteredData.length > 0 ? (
            filteredData.map((paste) => (
              <div
                key={paste._id}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-200 p-6 transition-transform hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-blue-700">{paste.title}</h3>
                  <div className='flex gap-1 justify-center items-center'>
                    <img
                    className='h-4'
                    src="/calendar.svg" alt="" />
                    <span className="text-xs text-black-400">
                      {format(new Date(paste.createdAt), 'd MMMM yyyy')}
                    </span>
                  </div>

                </div>
                <div className="mb-4 text-gray-700 whitespace-pre-line break-words">

                  {/*add ... when content has more rows*/}
                  {paste.content.length >
                    100 ? (
                    paste.content.substring(0, 100) + "..."
                  ) : (
                    paste.content
                  )}



                </div>
                <div className="flex flex-wrap gap-1 justify-end absolute right-2 bottom-3">
                  <Link
                    to={`/?pasteId=${paste._id}`}
                    className="px-2 py-2 rounded-full bg-yellow-300 text-blue-800 font-semibold shadow hover:bg-yellow-400 transition flex items-center gap-2"
                  >
                    <FaEdit />
                  </Link>
                  <Link
                    to={`/pastes/${paste._id}`}
                    className="px-2 py-2 rounded-full bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition flex items-center gap-2"
                  >
                    <FaEye />
                  </Link>
                  <button
                    onClick={() => dispatch(removeFromPaste(paste._id))}
                    className="px-2 py-2 rounded-full bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition flex items-center gap-2"
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content)
                      toast.success('Content copied to clipboard!', {
                        icon: '✅',
                        style: {
                          background: '#333',
                          color: '#fff',
                        },
                      });
                    }}
                    className="px-2 py-2 rounded-full bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition flex items-center gap-2"
                  >
                    <FaCopy />
                  </button>
                  <button
                    onClick={() => {
                      const url = `${window.location.origin}/pastes/${paste._id}`;
                      navigator.share?.({
                        title: paste.title,
                        text: paste.content,
                        url: url
                      });
                    }}
                    className="px-2 py-2 rounded-full bg-purple-500 text-white font-semibold shadow hover:bg-purple-600 transition flex items-center gap-2"
                  >
                    <FaShareAlt />
                  </button>
                  <button
                    onClick={() => {
                      const blob = new Blob([paste.content], { type: 'text/plain' });
                      const link = document.createElement('a');
                      link.href = URL.createObjectURL(blob);
                      link.download = `${paste.title || 'paste'}.txt`;
                      link.click();
                    }}
                    className="px-2 py-2 rounded-full bg-gray-500 text-white font-semibold shadow hover:bg-gray-600 transition flex items-center gap-2"
                  >
                    <FaDownload />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-grey-500 text-lg font-semibold mt-10 ">

              No pastes found.
              <div className='flex justify-center'>
                <img
                  className='flex justify-center m-5  w-50 h-50'
                  src="/empty.png" alt="" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Paste