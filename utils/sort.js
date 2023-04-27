export const sort = (method, data) => {
    if (method==='A-to-Z') {
        newData = data.sorted('name', false)

        return newData
    } else {
        newData = data.sorted('name', true)

        return newData
    }
}