const KNOWN_WORDS = {
    positive: ["yes", "sure", "absolutely", "indeed", "please"],
    negative: ["no", "nope", "dont"]
}

const CONTEXT_SWITCHER = [
    {
        ctx: "YES_NO_SPOTIFY",
        match: [["play", "spotify"], ["play", "music"], ["cast", "music"], ["listen", "music"], ["help", "relax"], ["calm", "me", "down"]],
        prompt: "Would you like me to play your Spotify playlist for you on your bedroom speakers?"
    },
    {
        ctx: "PROMPT_LOG_DAY",
        match: [["vent"], ["venting"], ["lets", "talk"], ["log", "day"], ["log", "today"], ["remember", "today"], ["recap"]],
        prompt: "Alright, tell me about your day."
    },
]

const POSITIVE_RESPONSES = {
    "YES_NO_SPOTIFY": "Okay, I will cast your Spotify playlist to your bedroom speakers."
}

const NEGATIVE_RESPONSES = {
    "YES_NO_SPOTIFY": "Okay, I won't play music then."
}

const b = b => {
    return {
        id: Math.floor(Math.random*10000),
        timestamp: Date.now(),
        text: b,
        receiving: true
    }
}

let delayDispatch = (d, x) => setTimeout(() => d(x), 2000)

export function pushMessages(messages) {
    return (dispatch, getState) => {
        dispatch({
            type: "PUSH_MESSAGES",
            payload: messages
        })
        messages.forEach(x => {
            let ctx = getState().chat.currentChatStage || ""
            let body = x.text.toLowerCase()
            body = body.replace(/[^A-Za-z0-9 ]/g, "")
            body = body.split(" ")
            console.log(body, ctx)
            if(ctx == "PROMPT_LOG_DAY") {
                let unmodified = x.text.toLowerCase()
                fetch(`http://10.232.33.120/analyze?sent=${unmodified}`)
                .then(response => response.json())
                .then(data => {
                    data = parseInt(data)
                    dispatch({
                        type: "PUSH_HISTORY",
                        payload: {
                            type: "d",
                            info: unmodified
                        }
                    })
                    if(data == 0 || data == 1) {
                        delayDispatch(dispatch, {
                            type: "PUSH_MESSAGES",
                            payload: [
                                b("Sorry to hear you're not feeling so well. Would you like me to play your Spotify playlist to help you feel better?")
                            ]
                        })
                        dispatch({
                            type: "SWITCH_CONTEXT",
                            payload: "YES_NO_SPOTIFY"
                        })
                    }else if(data == 2) {
                        delayDispatch(dispatch, {
                            type: "PUSH_MESSAGES",
                            payload: [
                                b("Thanks for logging your day!")
                            ]
                        })
                    }else {
                        delayDispatch(dispatch, {
                            type: "PUSH_MESSAGES",
                            payload: [
                                b("It's great to hear that you are feeling so well today!")
                            ]
                        }) 
                    }
                    dispatch({
                        type: "SWITCH_CONTEXT",
                        payload: ""
                    })
                })
            }
            if(ctx.includes("YES_NO")) {
                if(KNOWN_WORDS.positive.some(r => body.includes(r)))
                    delayDispatch(dispatch, {
                        type: "PUSH_MESSAGES",
                        payload: [
                            b(POSITIVE_RESPONSES[ctx])
                        ]
                    })
                else
                    delayDispatch(dispatch, {
                        type: "PUSH_MESSAGES",
                        payload: [
                            b(NEGATIVE_RESPONSES[ctx])
                        ]
                    })
                dispatch({
                    type: "SWITCH_CONTEXT",
                    payload: ""
                })
            }
            if(ctx == "") {
                CONTEXT_SWITCHER.forEach(item => {
                    let switchContext = false
                    item.match.forEach(i => {
                        if(i.every(r => body.includes(r))) switchContext = true
                    })

                    if(switchContext) {
                        dispatch({
                            type: "SWITCH_CONTEXT",
                            payload: item.ctx
                        })
                        delayDispatch(dispatch, {
                            type: "PUSH_MESSAGES",
                            payload: [
                                b(item.prompt)
                            ]
                        })
                    }
                })
            }
        })
    }
}