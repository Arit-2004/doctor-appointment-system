import React from 'react'

function Department() {
  return (
    
    <div className="w-full flex flex-col !items-center justify-center mt-3">
      <marquee behavior="alternate" direction="" className="font-bold sm:!text-4xl text-blue-500 text-2xl" id="department">Department we serves</marquee>
      <div className="flex mt-10 flex-col grid grid-cols-1 lg:ml-[100px] lg:w-[70%] w-full lg:grid-cols-3 lg:flex-wrap lg:flex-row md:flex-row gap-1">
        <div className="lg:w-[200px] sm:w-full shadow-md flex flex-col gap-2 justify-center items-center justify-center lg:h-[130px] h-40 !bg-gray-100 hover:text-white hover:!bg-blue-500  text-xl font-semibold lg:mb-[10px]">
          <i className="fa-solid fa-stethoscope text-2xl "></i>
          <p>Neurology</p>
        </div>
        <div className="lg:w-[200px] sm:w-full shadow-md flex flex-col gap-2 justify-center items-center lg:h-[130px] h-40 !bg-gray-100 hover:text-white hover:!bg-blue-500  text-xl font-semibold lg:mb-[10px]">
          <i className="fa-solid fa-stethoscope text-2xl "></i>
          <p>Surgical</p>
        </div>
        <div className="lg:w-[200px] sm:w-full shadow-md flex flex-col gap-2 justify-center items-center lg:h-[130px] h-40 !bg-gray-100 hover:text-white hover:!bg-blue-500  text-xl font-semibold lg:mb-[10px]">
          <i className="fa-solid fa-stethoscope text-2xl "></i>
          <p>Dental</p>
        </div>
        <div className="lg:w-[200px] sm:w-full shadow-md flex flex-col gap-2 justify-center items-center lg:h-[130px] h-40 !bg-gray-100 hover:text-white hover:!bg-blue-500  text-xl font-semibold lg:mb-[10px]">
          <i className="fa-solid fa-stethoscope text-2xl "></i>
          <p>Opthalmology</p>
        </div>
        <div className="lg:w-[200px] sm:w-full shadow-md flex flex-col gap-2 justify-center items-center lg:h-[130px] h-40 !bg-gray-100 hover:text-white hover:!bg-blue-500  text-xl font-semibold lg:mb-[10px]">
          <i className="fa-solid fa-stethoscope text-2xl "></i>
          <p>Cardiology</p>
        </div>
        <div className="lg:w-[200px] sm:w-full shadow-md flex flex-col gap-2 justify-center items-center lg:h-[130px] h-40 !bg-gray-100 hover:text-white hover:!bg-blue-500  text-xl font-semibold lg:mb-[10px]">
          <i className="fa-solid fa-stethoscope text-2xl "></i>
          <p>Gianology</p>
        </div>
      </div>
    </div>
  )
}

export default Department