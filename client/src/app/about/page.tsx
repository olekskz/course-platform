import Header from "../../components/notLoggedHeader"
import Footer from "../../components/footer"

export default function About() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto px-4 md:px-20 py-10">
                <h1 className="text-3xl font-bold mb-4">About Us</h1>
                <p className="mb-4">Welcome to our online course platform! We are dedicated to providing high-quality educational content to help you learn and grow.</p>
                <p>Our mission is to make learning accessible and enjoyable for everyone. Whether you're looking to advance your career, pick up a new hobby, or simply expand your knowledge, we have something for you.</p>
            </main>
            <Footer />
        </div>
    )
}