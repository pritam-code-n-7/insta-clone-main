export type TButton = {
    name: string
    type: 'button' | 'submit' | 'reset'
    onClick?: ()=>void
    className?: string
}