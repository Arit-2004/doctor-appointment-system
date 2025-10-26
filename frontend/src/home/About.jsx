import React from 'react'

export default function About() {
  return (
    <>
      <div className="flex flex-col items-center relative" id="home">
        <div className="w-full relative">
          <img
            src="https://media.istockphoto.com/id/1988844230/photo/paediatric-medical-check-up.jpg?s=612x612&w=0&k=20&c=hz7jXpJmcvxSVkJLBucMOem1CYpjTGF-z0dUPGNSCgA="
            className="w-full h-[500px] opacity-70"
            alt=""
          />
          <div className="absolute top-10 left-10 z-10 w-[70%] ml-[35px]">
            <p className="!mt-[40px] !text-blue-500">WELCOME TO XYZ HOSPITAL</p>
            <p className="font-bold !text-4xl">We are here <br />for your care</p>
            <p>
              At XYZ Hospital, we are committed to delivering compassionate care
              with cutting-edge medical expertise. Our state-of-the-art facilities,
              highly skilled doctors, and dedicated staff work together to provide
              comprehensive healthcare services for patients of all ages
            </p>
            <a href="/appointment">
              <button
                className="bg-red-500 !h-[50px] mt-4 w-[200px] !rounded-3xl hover:!opacity-80 text-white"
              >
                Make an appointment
              </button>
            </a>
          </div>
        </div>

        <div className="mt-[30px] w-[80%]" id="about">
          <p className="font-bold !text-4xl">Our Services</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-[20px] justify-around">
            
            <div className="flex gap-4 justify-center w-[270px]">
              <i className="fa-solid fa-truck-medical text-3xl "></i>
              <div>
                <p className="text-xl font-bold">Emergency Services</p>
                <p className="opacity-80">
                  Our hospital provides 24/7 emergency care with advanced medical
                  facilities and a rapid response team to handle critical situations
                  without delay.
                </p>
              </div>
            </div>

            <div className="flex gap-4 justify-center w-[270px]">
              <i className="fa-solid fa-user-doctor text-3xl "></i>
              <div>
                <p className="text-xl font-bold">Qualified Doctors</p>
                <p className="opacity-80">
                  We have a team of highly experienced and specialized doctors
                  dedicated to offering the best medical care with compassion and
                  expertise.
                </p>
              </div>
            </div>

            <div className="flex gap-4 justify-center w-[270px]">
              <i className="fa-solid fa-stethoscope text-3xl "></i>
              <div>
                <p className="text-xl font-bold">Outdoor Checkup</p>
                <p className="opacity-80">
                  We have a team of highly experienced and specialized doctors
                  dedicated to offering the best medical care with compassion and
                  expertise.
                </p>
              </div>
            </div>

            <div className="flex gap-4 justify-center w-[270px]">
              <i className="fa-regular fa-clock text-3xl "></i>
              <div>
                <p className="text-xl font-bold">24 Hours Services</p>
                <p className="opacity-80">
                  From emergency care to regular medical support, our hospital is
                  open round the clock to serve patients anytime they need us.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

