
const minutesToReadable = (minutes: number | undefined) => {
    if (minutes === undefined) return 'Unknown';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h${mins}m` : `Unknown`;
}

export default minutesToReadable