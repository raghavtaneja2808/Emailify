import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";

function Profile({ user, onLogout }) {
    const [isOpen, setIsOpen] = useState(false);
    const profileRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block " ref={profileRef}>
            <img 
                src={user?.photo || '/default-profile.png'} 
                alt="Profile" 
                className={`w-10 h-10 rounded-full cursor-pointer border-2 
                ${isOpen ? 'border-primary' : 'border-gray-300'}`}
                onClick={() => setIsOpen(!isOpen)}
            />

            {isOpen && (
                <div
                    className="absolute top-12 right-0 bg-white shadow-lg 
                    border border-gray-200 p-4 rounded-xl w-60 z-10 
                    transition-all duration-200 dark:bg-black dark:border-blue-500"
                >
                    <p className="font-bold dark:text-white">{user?.name || 'Guest'}</p>
                    <p className="text-sm text-gray-500 dark:text-white">{user?.email || 'No Email'}</p>
                    <Button
                        className="mt-3 w-full bg-primary text-white pointer dark:text-black"
                        onClick={onLogout}
                    >
                        Logout
                    </Button>
                </div>
            )}
        </div>
    );
}
export default Profile