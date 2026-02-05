import { type ReactNode } from 'react'

interface AppLayoutProps {
    children: ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <div className='min-h-screen bg-background'>
            <main className=''>
                {children}
            </main>
        </div>
    )
}

export default AppLayout