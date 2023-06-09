export const getCurrentDate = async() => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const date = new Date();

    let day = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    const finalDate = `${month} ${day} ${year}`;

    return finalDate
}