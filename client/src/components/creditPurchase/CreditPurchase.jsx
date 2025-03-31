import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';

const CreditPurchase = ({ onBuy }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [credits, setCredits] = useState(100);
    const navigate = useNavigate();
    const cardRef = useRef(null);

    const handleBuy = () => {
        setIsOpen(false);
        navigate("/checkout", { state: { credits } });
    };

    const handleCreditChange = (value) => {
        const numericValue = Number(value);
        if (!isNaN(numericValue) && numericValue >= 50 && numericValue <= 5000) {
            setCredits(numericValue);
        }
    };

    // Close card when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block">
            <Button
                className="pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                Buy Credits
            </Button>

            {isOpen && (
                <Card 
                    ref={cardRef} 
                    className="absolute top-12 right-0 bg-white shadow-md border border-gray-200 p-4 rounded-lg w-64 z-10 dark:text-white dark:bg-black dark:border-blue-500"
                >
                    <label className="block text-sm font-bold mb-2">Select Credits:</label>
                    <Input
                        type="range"
                        min="50"
                        max="5000"
                        value={credits}
                        onChange={(e) => handleCreditChange(e.target.value)}
                        className="w-full accent-blue"
                    />
                    <Input
                        type="number"
                        min="50"
                        max="5000"
                        value={credits}
                        onChange={(e) => handleCreditChange(e.target.value)}
                        className="w-full p-2 border rounded-md mt-2"
                    />
                    <p className="mt-2 text-sm">Selected Credits: {credits}</p>
                    <p className="text-sm">Total Price: ₹{credits}</p>

                    <Button
                        className="mt-3 w-full bg-primary text-white dark:text-black pointer"
                        onClick={handleBuy}
                    >
                        Buy
                    </Button>
                </Card>
            )}
        </div>
    );
};

export default CreditPurchase;
