const selectionReducer = (state = null, action) => {
    switch(action.type){
        case 'SELECT':
            return state.payload;
        case 'UNSELECT':
            return null;
        default:
            return null;
    }
}

export default selectionReducer;