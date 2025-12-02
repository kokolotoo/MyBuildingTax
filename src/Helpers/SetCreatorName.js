
export const commentCreator = (dataSettings, user) => {
   
    let creator;
    const cashier = dataSettings.cashier.apartment
    const houseMenager = dataSettings.houseMenager.apartment
    if (user.user == cashier) {
        creator = 'Касиер'
    } else if (user.user == houseMenager) {
        creator = 'Домоуправител'
    } else {
        creator = `Ап. ${user.user}`
    }
    return creator
}