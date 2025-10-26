import React from 'react'
import Navbar from "../components/Navbar";

function AllDoctor() {
  return (
    <>
  <div className="flex flex-col justify-center items-center">
      <Navbar />
      <div className="relative flex flex-col items-center justify-center w-full transition-colors duration-300">
        <div className="relative flex items-center justify-between mt-6 bg-gray-800 lg:w-[70%] sm:w-[92%] dark:bg-gray-200 rounded-[10px] overflow-hidden">
          
          <input type="radio" name="tabs" id="tab-1" className="hidden peer/tab1" defaultChecked />
          <label
            htmlFor="tab-1"
            className="cursor-pointer flex-1 py-3 text-center font-medium text-gray-300 dark:text-gray-600 peer-checked/tab1:text-white z-10"
          >
            Neurology
          </label>

          <input type="radio" name="tabs" id="tab-2" className="hidden peer/tab2" />
          <label
            htmlFor="tab-2"
            className="cursor-pointer flex-1 py-3 text-center font-medium text-gray-300 dark:text-gray-600 peer-checked/tab2:text-white z-10"
          >
            Surgical
          </label>

          <input type="radio" name="tabs" id="tab-3" className="hidden peer/tab3" />
          <label
            htmlFor="tab-3"
            className="cursor-pointer flex-1 py-3 text-center font-medium text-gray-300 dark:text-gray-600 peer-checked/tab3:text-white z-10"
          >
            Dental
          </label>

          <input type="radio" name="tabs" id="tab-4" className="hidden peer/tab4" />
          <label
            htmlFor="tab-4"
            className="cursor-pointer flex-1 py-3 text-center font-medium text-gray-300 dark:text-gray-600 peer-checked/tab4:text-white z-10"
          >
            Ophthalmology
          </label>

          <input type="radio" name="tabs" id="tab-5" className="hidden peer/tab5" />
          <label
            htmlFor="tab-5"
            className="cursor-pointer flex-1 py-3 text-center font-medium text-gray-300 dark:text-gray-600 peer-checked/tab5:text-white z-10"
          >
            Cardiology
          </label>

          <input type="radio" name="tabs" id="tab-6" className="hidden peer/tab6" />
          <label
            htmlFor="tab-6"
            className="cursor-pointer flex-1 py-3 text-center font-medium text-gray-300 dark:text-gray-600 peer-checked/tab6:text-white z-10"
          >
            Gynecology
          </label>

          <div
            className="absolute top-1 bottom-1 left-1 h-[calc(100%-0.5rem)] bg-blue-600 dark:bg-gray-900 rounded-md transition-transform duration-500 
            w-1/6 peer-checked/tab2:translate-x-full 
            peer-checked/tab3:translate-x-[200%] 
            peer-checked/tab4:translate-x-[300%] 
            peer-checked/tab5:translate-x-[400%] 
            peer-checked/tab6:translate-x-[500%]"
          ></div>
        </div>
      </div>

      <div className="overflow-x-auto flex mt-7 mb-5 flex-1 snap-x snap-mandatory w-[80%] max-w-6xl mx-auto px-4 custom-scroll max-h-[330px] ">
        {[1, 2, 3, 4].map((card, i) => (
          <div
            key={i}
            className="bg-white/25 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[7px] rounded-[10px] p-8 m-2 min-w-[280px] max-w-[320px] flex-shrink-0 snap-center h-[280px]"
          >
            <div className="flex justify-around">
              <img
                src="https://static.vecteezy.com/system/resources/previews/009/221/589/non_2x/docter-women-icon-cartoon-female-nurse-logo-professional-healthcare-design-symbol-illustration-free-vector.jpg"
                alt="Doctor"
                className="w-28 max-h-[100px] rounded-xl shadow-md"
              />
              <div className="flex flex-col gap-2">
                <p className="text-blue-400 font-bold text-2xl">Surgical</p>
                <p className="bg-green-500 w-28 h-[35px] font-bold text-white rounded-full px-2 mt-[5px] text-center py-1">
                  Available
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-bold opacity-95 mt-6">Dr. Mamata Bannerjee</p>
              <p className="text-center font-semibold text-lg">
                <span>6:10 P.M</span> to <span>7:30 P.M</span>
              </p>
              <button className="bg-blue-500 w-28 h-[40px] font-bold text-white rounded-full hover:opacity-70 px-2 mt-[5px]">
                Book now
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  )
}

export default AllDoctor
