export function formatDate(dateTZ: string) {
    const date = new Date(dateTZ);
    
    const formatOptions: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    let dateString = date.toLocaleDateString('en-GB', formatOptions);
    return dateString
}