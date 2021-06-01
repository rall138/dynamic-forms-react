export const select = (element) => {
    return{
        type: 'SELECT',
        payload: element
    }
}

export const unselect = () => {
    return{
        type: 'UNSELECT',
    }
}