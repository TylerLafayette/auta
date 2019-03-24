export default function(state={
    items: [
        {
            type: "s",
            startTime: Date.now(),
            endTime: Date.now() + 60000,
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