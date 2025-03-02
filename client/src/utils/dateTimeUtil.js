export function formatIsoDate(isoDate) {
    const date = new Date(isoDate);

    return date.toLocaleString(`en-US`, { year: `numeric`, month: `long`, day: `numeric` });
}