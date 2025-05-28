'use client';
import { useQuery } from "@apollo/client";
import { GET_INSTRUCTOR_REQUESTS } from "@/graphql/instructorGraphQL";
import { useWebSocket } from '@/hooks/useWebSocket';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

interface InstructorRequest {
    id: string;
    name: string;
    secondName: string;
    email: string;
    phone: string;
    status: string;
}


export default function AdminDashboard() {
    const socket = useWebSocket();
    const [requests, setRequests] = useState<InstructorRequest[]>([]);

    const { data, loading, error } = useQuery(GET_INSTRUCTOR_REQUESTS);

    useEffect(() => {
        if (data?.getInstructorsRequests) {
            setRequests(data.getInstructorsRequests);
        }
    }, [data]);

    useEffect(() => {
        if (socket) {
            socket.on('instructorRequest', (newRequest: InstructorRequest) => {
                setRequests(prev => [...prev, newRequest]);
            });

            return () => {
                socket.off('instructorRequest');
            };
        }
    }, [socket]);

    const handleApprove = (id: string) => {
        if (socket) {
            socket.emit('approveInstructorRequest', id);
            socket.emit('createInstructor', {
                name: requests.find(request => request.id === id)?.name,
                secondName: requests.find(request => request.id === id)?.secondName,
                email: requests.find(request => request.id === id)?.email,
                phone: requests.find(request => request.id === id)?.phone,
            });
            setRequests(prev => prev.filter(request => request.id !== id));
        }
    }

    const handleReject = (id: string) => {
        if (socket) {
            socket.emit('rejectInstructorRequest', id);
            setRequests(prev => prev.filter(request => request.id !== id));
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="min-h-screen">
            <main className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-6">Instructor Requests</h2>
                        <div className="space-y-4">
                            {requests.length === 0 ? (
                                <p className="text-gray-500">No pending requests</p>
                            ) : (
                                requests.map((request) => (
                                    <div key={request.id} className="border rounded-lg p-4 hover:bg-gray-50">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium">{request.name} {request.secondName}</h3>
                                                <p className="text-gray-600">{request.phone}</p>
                                                <p className="text-gray-600">{request.email}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition" onClick={() => handleApprove(request.id)}>
                                                    Approve
                                                </button>
                                                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition" onClick={() => handleReject(request.id)}>
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
