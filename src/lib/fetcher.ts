type Fetcher = <T>(...args: Parameters<typeof fetch>) => Promise<T>;

const fetcher: Fetcher = async (...args) => {
    const response = await fetch(...args);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export default fetcher;