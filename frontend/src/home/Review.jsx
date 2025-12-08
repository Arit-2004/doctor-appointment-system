import React from "react";
import axios from "axios";

const FeedbackForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/v1/feedbacks/", formData);
      console.log("Feedback submitted successfully:", response.data);
      alert("Feedback submitted successfully!");
      e.target.reset();
    } catch (error) {
      console.log("Error submitting feedback:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="mt-6 w-full flex flex-col items-center">
      <p className="font-bold text-4xl text-blue-500 text-center">
        Please feel free to <br />
        Share your experience..
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex p-4 flex-col gap-3 items-center w-72 sm:w-96 shadow-md bg-gray-100 mt-3 rounded-lg"
      >
        {/* Name */}
        <div className="flex flex-col w-full">
          <label htmlFor="name" className="font-semibold text-xl">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name.."
            className="border rounded-[10px] shadow-md pl-2 h-9"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col w-full">
          <label htmlFor="email" className="font-semibold text-xl">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email.."
            className="border rounded-[10px] shadow-md pl-2 h-9"
          />
        </div>

        {/* Subject */}
        <div className="flex flex-col w-full">
          <label htmlFor="subject" className="font-semibold text-xl">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Enter your subject.."
            className="border rounded-[10px] shadow-md pl-2 h-9"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col w-full">
          <label htmlFor="message" className="font-semibold text-xl">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="3"
            placeholder="Enter text.."
            className="border rounded-[10px] shadow-md pl-2"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-40 h-10 bg-red-400 rounded-full font-bold text-white hover:opacity-80"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
