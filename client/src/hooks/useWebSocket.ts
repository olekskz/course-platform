import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';

export const useWebSocket = () => {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const token = Cookies.get('token');
        
        if (!token) {
            console.error('No token found in cookies');
            return;
        }

        socketRef.current = io('http://localhost:4000', {
            auth: {
                token
            }
        });

        socketRef.current.on('connect_error', (error) => {
            console.error('WebSocket connection error:', error);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    return socketRef.current;
}; 