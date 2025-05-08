import Header from "../../../components/header";
import Footer from "../../../components/footer";
import Image from "next/image";
export default function Login() {
    return (
        <>
            <Header />
            <div className="flex flex-row items-center justify-center min-h-screen">
                <div className="hidden md:flex w-1/2 justify-center">
                    <Image src="/assets/deepimg-1746723654547-removebg-preview.png" width={500} height={300} alt="Login page" priority={false} />
                </div>
                <form className="flex flex-col items-center justify-center w-full md:w-1/2 h-screen">
                    <h1 className="text-4xl font-bold text-center">Log in to continue your </h1>
                    <h1 className="text-4xl font-bold text-center">learning journey</h1>
                    <div className="flex flex-col items-center mt-4 w-full max-w-xs">
                        <input
                            type="email"
                            placeholder="Email"
                            className="p-2 border border-gray-300 rounded mb-4 w-full"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="p-2 border border-gray-300 rounded mb-4 w-full"
                        />
                        <button className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-700 cursor-pointer transition duration-200">Sign Up</button>
                        <p className="mt-4 text-gray-600">Don't have an account? <a href="/auth/signup" className="text-blue-500 hover:underline">Sign Up</a></p>
                        <div className="w-full mt-6">
                            <div className="flex items-center my-4">
                                <div className="flex-grow h-px bg-gray-300"></div>
                                <span className="mx-2 text-gray-400 text-sm">or continue with</span>
                                <div className="flex-grow h-px bg-gray-300"></div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <button className="flex items-center justify-center gap-2 border border-gray-300 rounded p-2 w-full hover:bg-gray-100 transition cursor-pointer">
                                    <Image src="/assets/4975303_search_web_internet_google search_search engine_icon.png" alt="Google" width={30} height={30} />
                                    <span>Continue with Google</span>
                                </button>
                                <button className="flex items-center justify-center gap-2 border border-gray-300 rounded p-2 w-full hover:bg-gray-100 transition cursor-pointer">
                                    <Image src="/assets/4102573_applications_facebook_media_social_icon.png" alt="Facebook" width={30} height={30} />
                                    <span>Continue with Facebook</span>
                                </button>
                                <button className="flex items-center justify-center gap-2 border border-gray-300 rounded p-2 w-full hover:bg-gray-100 transition cursor-pointer">
                                    <Image src="/assets/104490_apple_icon.png" alt="Apple" width={30} height={30} />
                                    <span>Continue with Apple</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}