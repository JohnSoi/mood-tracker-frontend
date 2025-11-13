function getSubtractYearFromCurrentDate(subtractYear: number): Date {
    const currentDate: Date = new Date();
    return new Date(currentDate.getFullYear() - subtractYear, currentDate.getMonth(), currentDate.getDate() + 1);
}

export { getSubtractYearFromCurrentDate };
