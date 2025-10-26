//nextMonth, prevMonth - 1 , 2 и тн или булева

export const pictureName = (apartmentNumber, nextMonth, prevMonth) => {
    const now = new Date();
    let monthName = now.toLocaleString('en-US', { month: 'long' });
    let year = now.getFullYear();

    if (nextMonth || prevMonth) {
        const targetDate = nextMonth ? new Date(now.getFullYear(), now.getMonth() + nextMonth, 1)
            : prevMonth ? new Date(now.getFullYear(), now.getMonth() - prevMonth, 1) : now;

        const nextMonthName = targetDate.toLocaleString('en-US', { month: 'long' });
        monthName = nextMonthName.charAt(0).toUpperCase() + nextMonthName.slice(1);
        year = targetDate.getFullYear();
    }

    return `${year}_${monthName}_${apartmentNumber}.png`;
};

