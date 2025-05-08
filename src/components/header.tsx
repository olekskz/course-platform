import Link from "next/link"
export default function Header() {
    return (
        <header className="container mx-auto bg-white shadow-md sticky top-0 z-10">
            <div className="flex flex-row mx-20 justify-between mt-3">
                <Link href="/" className="text-2xl font-bold p-2">Learnify</Link>
                <ul className="flex flex-row justify-between gap-6">
                    <li className="p-2 group relative">
                        <Link href="/courses" className="relative">
                         Courses
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </li>
                    <li className="p-2 group relative">
                        <Link href="/about" className="relative">
                        About
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </li>
                    <li className="p-2 group relative">
                        <Link href="/contact" className="relative">
                        Contact
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </li>
                    <li className="p-2 px-8 border-2 border-black rounded-lg hover:bg-gray-600 hover:text-white hover:border-transparent transition duration-300">
                        <Link href="/auth">Sign In</Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}