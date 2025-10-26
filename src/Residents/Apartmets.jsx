const lowTax = 5
const hightTax = 15
const euro = 1.95583

export const monthTax = (apartment, peoples) => {
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
        free: true
    },
    {
        id: 'apart2',
        apartment: 2,
        owner: 'Павлина',
        people: 1,
        year: [],
        free: false
    },
    {
        id: 'apart3',
        apartment: 3,
        owner: 'Анчо Цонве',
        people: 2,
        year: [],
        free: false
    },
    {
        id: 'apart4',
        apartment: 4,
        owner: 'Наталия Бончева',
        people: 1,
        year: [],
        free: false
    },
    {
        id: 'apart5',
        apartment: 5,
        owner: 'Наталия Иванова',
        people: 1,
        year: [],
        free: false
    },
    {
        id: 'apart6',
        apartment: 6,
        owner: 'Иван Чакалов',
        people: 2,
        year: [],
        free: false
    },
    {
        id: 'apart7',
        apartment: 7,
        owner: 'undefined',
        people: 0,
        year: [],
        free: false
    },
    {
        id: 'apart8',
        apartment: 8,
        owner: 'undefined',
        people: 0,
        year: [],
        free: false
    },
    {
        id: 'apart9',
        apartment: 9,
        owner: 'undefined',
        people: 0,
        year: [],
        free: false
    },
    {
        id: 'apart10',
        apartment: 10,
        owner: 'undefined',
        people: 0,
        year: [],
        free: false
    },
    {
        id: 'apart11',
        apartment: 11,
        owner: 'undefined',
        people: 0,
        year: [],
        free: false
    },
    {
        id: 'apart12',
        apartment: 12,
        owner: 'undefined',
        people: 0,
        year: [],
        free: false
    },
    {
        id: 'apart13',
        apartment: 13,
        owner: 'undefined',
        people: 0,
        year: [],
        free: false
    },
    {
        id: 'apart14',
        apartment: 14,
        owner: 'undefined',
        people: 0,
        year: [],
        free: false
    },
    {
        id: 'apart15',
        apartment: 15,
        owner: 'undefined',
        people: 0,
        year: [],
        free: false
    },
    {
        id: 'apart16',
        apartment: 16,
        owner: 'Николай Митков',
        people: 1,
        year: [],
        free: false
    },
    {
        id: 'apart17',
        apartment: 17,
        owner: 'undefined',
        people: 0,
        year: [],
        free: false
    },
    {
        id: 'apart18',
        apartment: 18,
        owner: 'undefined',
        people: 0,
        year: [],
        free: false
    },
    {
        id: 'apart19',
        apartment: 19,
        owner: 'undefined',
        people: 0,
        year: [],
        free: false
    },
    {
        id: 'apart20',
        apartment: 20,
        owner: 'undefined',
        people: 0,
        year: [],
        free: false
    },
    {
        id: 'apart21',
        apartment: 21,
        owner: 'undefined',
        people: 0,
        year: [],
        free: false
    },
    {
        id: 'apart22',
        apartment: 22,
        owner: 'undefined',
        people: 0,
        year: [],
        free: false
    },
    {
        id: 'apart23',
        apartment: 23,
        owner: 'undefined',
        people: 0,
        year: [],
        free: false
    },
    {
        id: 'apart24',
        apartment: 24,
        owner: 'undefined',
        people: 0,
        year: [],
        free: false
    },
]

export default apartments

