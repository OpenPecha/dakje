export function setRightDrawerOpen (state, value) {
    state.rightDrawerOpen = value
}

export function toggleRightDrawer (state) {
    state.rightDrawerOpen = !state.rightDrawerOpen
}