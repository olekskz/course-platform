import { useState } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";

export default function InstructorModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [name, setName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const socket = useWebSocket();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (socket) {
            socket.emit('InstructorRequest', { name, secondName, phone, email });
        }
        onClose();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-8 rounded-lg shadow-lg z-10 relative">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer" onClick={onClose}>x</button>
                <h2 className="text-2xl font-bold mb-4">Become an Instructor</h2>
                <p className="mb-4">
                    If you have a passion for teaching and a knack for explaining complex concepts, becoming an instructor with us could be the perfect opportunity for you.
                </p>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 max-w-xs p-2 " placeholder="Name" required />
                        <br />
                        <label htmlFor="secondName" className="block text-sm font-medium text-gray-700">Second Name</label>
                        <input type="text" id="secondName" name="secondName" value={secondName} onChange={(e) => setSecondName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 max-w-xs p-2 " placeholder="Second Name" required />
                        <br />
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 max-w-xs p-2 " placeholder="Email" required />
                        <br />
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                        <input type="tel" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 max-w-xs p-2 " placeholder="Phone" required />
                    </div>
                    <button type="submit" className="bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer px-4 py-2">Submit</button>
                </form>
            </div>
        </div>
    )
}

