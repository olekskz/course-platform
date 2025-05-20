// client/src/pages/CoursePage.tsx
import React from "react";

export default function CoursePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow p-8">

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Title, Video, About, Content */}
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold mb-6">Основи програмування</h1>
            <video
              width={420}
              height={240}
              controls
              preload="none"
              className="bg-[#181C20] rounded-md w-full max-w-md mb-6"
              style={{ objectFit: "cover" }}
            >
              <source src="/assets/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="mb-6">
              <h2 className="font-bold text-xl mb-2">About</h2>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. indequm uusenus.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-xl mb-2">Course Content</h2>
              <div className="bg-gray-100 rounded-md divide-y">
                {[
                  "Introduction",
                  "Lesson 2",
                  "Fourth Lesson",
                  "Fourth Lesson",
                ].map((title, idx) => (
                  <div key={idx} className="flex items-center px-4 py-3">
                    <button className="mr-4 text-gray-600">
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="8,5 19,12 8,19" fill="currentColor" />
                      </svg>
                    </button>
                    <span className="font-medium mr-2">{idx + 1}</span>
                    <span>{title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Card */}
          <div className="w-full md:w-80">
            <div className="border rounded-xl p-6 bg-white shadow flex flex-col items-center">
              <div className="text-3xl font-bold mb-2">$49.00</div>
              <button className="bg-blue-600 text-white px-8 py-2 rounded-md font-semibold mb-4 hover:bg-blue-700 transition">
                Enroll
              </button>
              <div className="flex items-center text-gray-700 mb-2">
                <span className="mr-2">🕒</span> 12 hours
              </div>
              <div className="flex items-center text-gray-700 mb-2">
                <span className="mr-2">📋</span> 8 lessons
              </div>
              <div className="flex items-center text-gray-700">
                <span className="mr-2">👤</span>
                <span>
                  <span className="font-bold">Інструктор</span>
                  <br />
                  Ім’я прізвище
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}