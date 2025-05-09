'use client';
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setIsSelected } from "../features/menuSlice";
export default function LoginnedHeader() {
    const [open, setOpen] = useState(false);
    const isSelected = useSelector((state: any) => state.menu.isSelected);
    const dispatch = useDispatch()
    return (
        <header className="container mx-auto bg-white shadow-md sticky top-0 z-10 ">
            <div className="flex flex-row flex-nowrap min-w-0 mx-4 md:mx-10 lg:mx-20 justify-between mt-3 items-center">
                {/* Hamburger for mobile phones */}
                <button
                    className="sm:hidden p-2"
                    onClick={() => setOpen(!open)}
                    aria-label="Open menu"
                >
                    <span className="block w-6 h-0.5 bg-black mb-1"></span>
                    <span className="block w-6 h-0.5 bg-black mb-1"></span>
                    <span className="block w-6 h-0.5 bg-black"></span>
                </button>
                <Link href="/" className="text-2xl font-bold p-2">Learnify</Link>
                <input type="text" name="" id="" className="border-2 border-gray-300 rounded-lg p-1 w-1/3 md:w-1/4 lg:w-1/3 items-center min-w-0" placeholder="Search..." />
                {/* Desktop menu */}
                <ul className="hidden sm:flex flex-row justify-between gap-6">
                    <li className={`p-2 group relative ${isSelected === 'courses' ? 'text-blue-500' : ''}`}>
                        <Link href="/courses" className="relative" onClick={() => dispatch(setIsSelected('courses'))}>
                            Courses
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </li>
                    <li className={`p-2 group relative ${isSelected === 'about' ? 'text-blue-500' : ''}`}>
                        <Link href="/about" className="relative" onClick={() => dispatch(setIsSelected('about'))}>
                            About
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </li>
                    <li className={`p-2 group relative ${isSelected === 'contact' ? 'text-blue-500' : ''}`}>
                        <Link href="/contact" className="relative" onClick={() => dispatch(setIsSelected('contact'))}>
                            Contact
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </li>
                    <li className={`p-2 group relative ${isSelected === 'dashboard' ? 'text-blue-500' : ''}`}>
                        <Link href="/dashboard/" className="relative" onClick={() => dispatch(setIsSelected('dashboard'))}>
                            Dashboard
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </Link>
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
                        <Link href="/" onClick={() => setOpen(false)}>Home</Link>
                        <Link href="/courses" onClick={() => setOpen(false)}>Courses</Link>
                        <Link href="/about" onClick={() => setOpen(false)}>About</Link>
                        <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
                        <Link href="/dashboard/" onClick={() => setOpen(false)}>Dashboard</Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}
