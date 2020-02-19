import { useState, useEffect } from 'react';

export default function useLongPress(callback = (event) => {}, timeout = 500) {
    const [startLongPress, setStartLongPress] = useState({status: false, eventTarget: undefined});
    useEffect(() => {
        let timerId;
        if (startLongPress.status) {
            timerId = setTimeout(callback.bind(this, startLongPress.eventTarget), timeout);
        }
        return () => {
            if (startLongPress.status) {
                setStartLongPress({status:false, eventTarget: undefined});
            }
            clearTimeout(timerId);
        };
    }, [callback, timeout, startLongPress]);

    return {
        onMouseDown: (event) => setStartLongPress({status: true, eventTarget: event.currentTarget}),
        onMouseUp: () => setStartLongPress({status: false, eventTarget: undefined}),
        onMouseLeave: () => setStartLongPress({status: false, eventTarget: undefined}),
        onTouchStart: (event) => setStartLongPress({status: true, eventTarget: event.currentTarget}),
        onTouchEnd: () => setStartLongPress({status: false, eventTarget: undefined})
    };
}