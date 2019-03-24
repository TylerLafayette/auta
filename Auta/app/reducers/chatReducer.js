export default function(state={
    messages: [
    ],
    currentChatStage: "",
    suggestions: [
        {
            id: 0,
            label: "Log today."
        },
        {
            id: 1,
            label: "Help me relax."
        }
    ]
}, action) {
    switch(action.type) {
        case "PUSH_MESSAGES": {
            return {...state, messages: [...action.payload, ...state.messages]}
        }
        case "REMOVE_MESSAGE": {
            return {...state, messages: state.messages.filter(x => x.id != action.payload)}
        }
        case "PUSH_SUGGESTIONS": {
            return {...state, suggestions: [...action.payload, ...state.suggestions]}
        }
        case "REMOVE_SUGGESTION": {
            return {...state, suggestions: state.suggestions.filter(x => x.id != action.payload)}
        }
        case "CLEAR_SUGGESTIONS": {
            return {...state, suggestions: []}
        }
        case "SWITCH_CONTEXT": {
            return {...state, currentChatStage: action.payload}
        }
        default: {
            return {...state}
        }
    }
}