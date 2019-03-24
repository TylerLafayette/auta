export default function(state={
    messages: [
        {
            id: 1289337892374238,
            timestamp: 1553400915600,
            text: "Absolutely! Tell me anything you want.",
            receiving: true,
        },
        {
            id: 1289347892374238,
            timestamp: 1553400915598,
            text: "Can I vent?",
            receiving: false,
        },
    ],
    suggestions: [
        {
            id: 0,
            label: "Yes, please."
        },
        {
            id: 1,
            label: "No, thanks."
        }
    ]
}, action) {
    switch(action.type) {
        case "PUSH_MESSAGES": {
            return {...state, messages: [...messages, ...action.payload]}
        }
        case "REMOVE_MESSAGE": {
            return {...state, messages: state.messages.filter(x => x.id != action.payload)}
        }
        case "PUSH_SUGGESTIONS": {
            return {...state, suggestions: [...action.payload, ...suggestions]}
        }
        case "REMOVE_SUGGESTION": {
            return {...state, suggestions: suggestions.filter(x => x.id != action.payload)}
        }
        case "CLEAR_SUGGESTIONS": {
            return {...state, suggestions: []}
        }
        default: {
            return {...state}
        }
    }
}