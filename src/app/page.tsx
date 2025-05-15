
import Link from "next/link";
import Footer from "../components/footer";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center px-2">
        <div className="w-full flex flex-col items-center justify-center px-4 py-12 mt-15 mb-10 max-w-2xl mx-auto">
          <h1 className="text-center text-3xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Learn new skills online with top educators
          </h1>
          <h2 className="text-center text-lg md:text-2xl mb-6 text-gray-700">
            Explore a variety of fresh topics and start learning new skills
          </h2>
          <Link href="/courses" className="bg-blue-500 text-white py-3 px-6 rounded-l text-lg font-semibold hover:bg-blue-600 transition-all duration-200 cursor-pointer" >
            Browse Courses
          </Link>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-20 mt-8 md:mt-10 w-full max-w-4xl">
          <div className="flex flex-col items-center">
            <Image src="/assets/5310239_education_graduation_hat_icon.png" width={40} height={40} alt="School icon" className="md:w-[50px] md:h-[50px]" />
            <h3 className="text-base md:text-lg font-semibold mt-2">Expert Instructors</h3>
            <h4 className="text-center break-words mt-2 text-sm md:text-base">
              Learn from industry experts<br />who are passionate about teaching.
            </h4>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/assets/4213466_media_online_play_social_video_icon.png" alt="Learn Anywhere" width={40} height={40} className="md:w-[50px] md:h-[50px]" />
            <h3 className="text-base md:text-lg font-semibold mt-2">Learn Anywhere</h3>
            <h4 className="text-center break-words mt-2 text-sm md:text-base">
              Switch between your computer,<br />tablet or mobile phone.
            </h4>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/assets/6599572_certificate_certification_completion_diploma_e-learning_icon.png" alt="Flexible courses" width={40} height={40} className="md:w-[50px] md:h-[50px]" />
            <h3 className="text-base md:text-lg font-semibold mt-2">Flexible Courses</h3>
            <h4 className="text-center break-words mt-2 text-sm md:text-base">
              Go at your own pace<br />with lifetime access to the courses.
            </h4>
          </div>
        </div>
        <div className="mt-14 w-full max-w-5xl">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Trending Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center">
              <Image src="/assets/9178381_dev_code_development_programming_web_icon.png" alt="Web Development" width={60} height={60} className="mb-3" />
              <h3 className="font-semibold text-lg mb-2">Web Development</h3>
              <p className="text-center text-sm text-gray-600 mb-4">HTML, CSS, JavaScript, React and modern frameworks.</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">Learn More</button>
            </div>
            <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center">
              <Image src="/assets/11019401_analytics_pie_chart_breakdown_business_icon.png" alt="Data Science" width={60} height={60} className="mb-3" />
              <h3 className="font-semibold text-lg mb-2">Data Science</h3>
              <p className="text-center text-sm text-gray-600 mb-4">Python, machine learning, data analytics and AI.</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">Learn More</button>
            </div>
            <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center">
              <Image src="/assets/11425208_ecommerce_ux_ui_shopping_web_icon.png" alt="UI/UX Design" width={60} height={60} className="mb-3" />
              <h3 className="font-semibold text-lg mb-2">UI/UX Design</h3>
              <p className="text-center text-sm text-gray-600 mb-4">Figma, UI and UX design</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">Learn More</button>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-around mt-10 md:mt-20 gap-6">
          <button className="py-3 border-2 rounded-xl px-7 hover:bg-gray-500 hover:text-white cursor-pointer transition-colors">Join Now</button>
          <button className="py-3 border-2 rounded-xl px-7 hover:bg-gray-500 hover:text-white cursor-pointer transition-colors">Learn More</button>
        </div>
      </div>
      <Footer />
    </>
  );
}