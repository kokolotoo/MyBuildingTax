const lowTax = 5
const hightTax = 15
const euro = 1.95583

const monthTax = (apartment, peoples) => {
    const taxPerPeople = apartment <= 9 ? lowTax : hightTax
    const totalTax = taxPerPeople * peoples
    return totalTax
}

const apartments = [
    {
        id: 'apart1',
        apartment: 1,
        owner: undefined,
        people: 0,
        year: [],
        tax: monthTax(1, 0),
        inEuro: Number(monthTax(1, 0) / euro).toFixed(2),
        free: true
    },
    {
        id: 'apart2',
        apartment: 2,
        owner: 'Павлина',
        people: 1,
        year: [],
        tax: monthTax(2, 1),
        inEuro: parseFloat((monthTax(2, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart3',
        apartment: 3,
        owner: 'Анчо Цонве',
        people: 2,
        year: [],
        tax: monthTax(3, 2),
        inEuro: parseFloat((monthTax(3, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart4',
        apartment: 4,
        owner: 'Наталия Бончева',
        people: 1,
        year: [],
        tax: monthTax(4, 1),
        inEuro: parseFloat((monthTax(4, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart5',
        apartment: 5,
        owner: 'Наталия Иванова',
        people: 1,
        year: [],
        tax: monthTax(5, 1),
        inEuro: parseFloat((monthTax(5, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart6',
        apartment: 6,
        owner: 'Иван Чакалов',
        people: 2,
        year: [],
        tax: monthTax(6, 2),
        inEuro: parseFloat((monthTax(6, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart7',
        apartment: 7,
        owner: 'undefined',
        people: 0,
        year: [],
        tax: monthTax(7, 1),
        inEuro: parseFloat((monthTax(7, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart8',
        apartment: 8,
        owner: 'undefined',
        people: 0,
        year: [],
        tax: monthTax(8, 1),
        inEuro: parseFloat((monthTax(8, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart9',
        apartment: 9,
        owner: 'undefined',
        people: 0,
        year: [],
        tax: monthTax(9, 1),
        inEuro: parseFloat((monthTax(9, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart10',
        apartment: 10,
        owner: 'undefined',
        people: 0,
        year: [],
        tax: monthTax(10, 1),
        inEuro: parseFloat((monthTax(10, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart11',
        apartment: 11,
        owner: 'undefined',
        people: 0,
        year: [],
        tax: monthTax(11, 1),
        inEuro: parseFloat((monthTax(11, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart12',
        apartment: 12,
        owner: 'undefined',
        people: 0,
        year: [],
        tax: monthTax(12, 1),
        inEuro: parseFloat((monthTax(12, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart13',
        apartment: 13,
        owner: 'undefined',
        people: 0,
        year: [],
        tax: monthTax(13, 1),
        inEuro: parseFloat((monthTax(13, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart14',
        apartment: 14,
        owner: 'undefined',
        people: 0,
        year: [],
        tax: monthTax(14, 1),
        inEuro: parseFloat((monthTax(14, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart15',
        apartment: 15,
        owner: 'undefined',
        people: 0,
        year: [],
        tax: monthTax(15, 1),
        inEuro: parseFloat((monthTax(15, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart16',
        apartment: 16,
        owner: 'Николай Митков',
        people: 1,
        year: [],
        tax: monthTax(16, 1),
        inEuro: parseFloat((monthTax(16, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart17',
        apartment: 17,
        owner: 'undefined',
        people: 0,
        year: [],
        tax: monthTax(17, 1),
        inEuro: parseFloat((monthTax(17, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart18',
        apartment: 18,
        owner: 'undefined',
        people: 0,
        year: [],
        tax: monthTax(18, 1),
        inEuro: parseFloat((monthTax(18, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart19',
        apartment: 19,
        owner: 'undefined',
        people: 0,
        year: [],
        tax: monthTax(19, 1),
        inEuro: parseFloat((monthTax(19, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart20',
        apartment: 20,
        owner: 'undefined',
        people: 0,
        year: [],
        tax: monthTax(20, 1),
        inEuro: parseFloat((monthTax(20, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart21',
        apartment: 21,
        owner: 'undefined',
        people: 0,
        year: [],
        tax: monthTax(21, 1),
        inEuro: parseFloat((monthTax(21, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart22',
        apartment: 22,
        owner: 'undefined',
        people: 0,
        year: [],
        tax: monthTax(22, 1),
        inEuro: parseFloat((monthTax(22, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart23',
        apartment: 23,
        owner: 'undefined',
        people: 0,
        year: [],
        tax: monthTax(23, 1),
        inEuro: parseFloat((monthTax(23, 1) / euro).toFixed(2)),
        free: false
    },
    {
        id: 'apart24',
        apartment: 24,
        owner: 'undefined',
        people: 0,
        year: [],
        tax: monthTax(24, 1),
        inEuro: parseFloat((monthTax(24, 1) / euro).toFixed(2)),
        free: false
    },
]

export default apartments

