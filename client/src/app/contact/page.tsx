import Header from "../../components/notLoggedHeader";
import Footer from "../../components/footer";
export default function Contact() {
    return (
        <>
            <div className="bg-gradient-to-b from-white to-blue-500 h-screen flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <h1 className="text-4xl font-bold text-center text-white">Contact Us</h1>
                    <p className="mt-4 text-lg text-center text-white">We would love to hear from you!</p>
                    <form className="flex flex-col items-center mt-6 w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="p-2 border border-gray-300 rounded mb-4 w-full text-white placeholder:text-white"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="p-2 border border-gray-300 rounded mb-4 w-full text-white placeholder:text-white"
                        />
                        <textarea
                            placeholder="Your Message"
                            className="p-2 border border-gray-300 rounded mb-4 w-full h-32 text-white placeholder:text-white"
                        ></textarea>
                        <button className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-700 cursor-pointer transition duration-200">Send Message</button>
                    </form>
                </div>
                <Footer />
            </div>
        </>
    );
}