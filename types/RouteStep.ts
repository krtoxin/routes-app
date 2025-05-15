export interface Recipient {
    email: string
    action: string
    position: string
    notify: boolean
    attachAsLetter: boolean
}

export interface RouteStep {
    id: number
    recipients: Recipient[]
}
