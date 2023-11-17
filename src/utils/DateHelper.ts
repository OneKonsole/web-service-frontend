/**
 * Format a date to a string
 * @param date - Date to format
 * @returns {string} - Formatted date
 * @example formatDate(new Date()) // "January 1, 2021"
 */
export const formatDate = (date: Date | undefined): string => {
    if (date === undefined) {
        return "";
    }
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    }).format(date);
}