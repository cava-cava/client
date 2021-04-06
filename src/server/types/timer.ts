export interface Timer {
    seconds: number
    isRunning: boolean
    interval?: ReturnType<typeof setInterval>
}
