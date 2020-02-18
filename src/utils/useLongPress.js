import { useState, useEffect } from 'react';

export default function useLongPress(callback = () => {}, timeout = 500) {
    const [startLongPress, setStartLongPress] = useState(false);
    useEffect(() => {
        let timerId;
        if (startLongPress) {
            timerId = setTimeout(callback, timeout);
        } else {
            clearTimeout(timerId);
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [startLongPress]);

    return {
        onMouseDown: () => setStartLongPress(true),
        onMouseUp: () => setStartLongPress(false),
        onMouseLeave: () => setStartLongPress(false),
        onTouchStart: () => setStartLongPress(true),
        onTouchEnd: () => setStartLongPress(false)
    };
}