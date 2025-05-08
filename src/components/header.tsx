'use client';
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="container mx-auto bg-white shadow-md sticky top-0 z-10 ">
            <div className="flex flex-row mx-4 md:mx-20 justify-between mt-3 items-center">
                {/* Hamburger for mobile phones */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setOpen(!open)}
                    aria-label="Open menu"
                >
                    <span className="block w-6 h-0.5 bg-black mb-1"></span>
                    <span className="block w-6 h-0.5 bg-black mb-1"></span>
                    <span className="block w-6 h-0.5 bg-black"></span>
                </button>
                <Link href="/" className="text-2xl font-bold p-2">Learnify</Link>
                {/* Desktop menu */}
                <ul className="hidden md:flex flex-row justify-between gap-6">
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
                {/* Mobile side pannel */}
                <div className="fixed inset-0 z-20 md:hidden" style={{pointerEvents: open ? 'auto' : 'none'}}>
                    <nav
                        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col gap-6 transform transition-transform duration-300
                        ${open ? 'translate-x-0' : '-translate-x-full'}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <button className="self-end mb-4" onClick={() => setOpen(false)} aria-label="Close menu">
                            ✕
                        </button>
                        <Link href="/courses" onClick={() => setOpen(false)}>Courses</Link>
                        <Link href="/about" onClick={() => setOpen(false)}>About</Link>
                        <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
                        <Link href="/auth" onClick={() => setOpen(false)} className="border-2 border-black rounded-lg px-4 py-2 text-center">Sign In</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}