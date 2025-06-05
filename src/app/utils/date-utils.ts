export function formatToIsoDate(rawDate: string): string{

    const [day, month, year] = rawDate.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3').split('/');
    
    return new Date(`${year}-${month}-${day}`).toISOString();
}

export function formatDateDayMonthYear(isoDate: string): string{

    const timestamp = Date.parse(isoDate);
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;

  };
