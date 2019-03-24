export function openDrawer() {
    return async d => d({
        type: "OPEN_DRAWER"
    })
}

export function closeDrawer() {
    return async d => d({
        type: "CLOSE_DRAWER"
    })
}

export function setDrawer(s) {
    return async d => d({
        type: s ? "OPEN_DRAWER" : "CLOSE_DRAWER"
    })
}