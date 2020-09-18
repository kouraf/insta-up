export default (state = {}, action) => {
    switch (action.type) {
        case 'ADD_COMMENT':
            return { comments: action.payload };
        default:
            return state;
    }
}