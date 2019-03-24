export default function(state={
    items: [
        {
            type: "s",
            items: [ "Depression", "Concentration", "Distracted" ]
        },
        {
            type: "d",
            info: "I felt great today."
        }
    ]
}, action) {
    switch(action.type) {
        case "PUSH_HISTORY": {
            return {...state, items: [action.payload, ...state.items]}
        }
        default: {
            return {...state}
        }
    }
}