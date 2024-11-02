// src/hooks/useIsMobile.ts
import { useEffect, useState, useCallback } from 'react';

export const useIsMobile = (breakpoint: number = 768) => {
    // Initialize with null to handle SSR
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    // Basic debounce implementation
    const debounce = <T extends (...args: any[]) => void>(
        fn: T,
        delay: number
    ) => {
        let timeoutId: ReturnType<typeof setTimeout>;

        return (...args: Parameters<T>) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn(...args), delay);
        };
    };

    // Memoized check function
    const checkMobile = useCallback(() => {
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth < breakpoint);
        }
    }, [breakpoint]);

    useEffect(() => {
        // Initial check
        checkMobile();

        // Debounced event handler
        const debouncedHandler = debounce(checkMobile, 250);

        // Add event listener
        window.addEventListener('resize', debouncedHandler);

        // Cleanup
        return () => {
            window.removeEventListener('resize', debouncedHandler);
        };
    }, [checkMobile]);

    // Return null during SSR, boolean after hydration
    return isMobile;
};

