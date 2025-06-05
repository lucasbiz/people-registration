export function formatToIsoDate(rawDate: string): string{

    const [day, month, year] = rawDate.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3').split('/');
    
    return new Date(`${year}-${month}-${day}`).toISOString();
}
