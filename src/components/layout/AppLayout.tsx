import { type ReactNode } from 'react'
import Sidebar from './Sidebar'

interface AppLayoutProps {
    children: ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <div className='min-h-screen bg-background'>
            <Sidebar />
            <main className='pl-64'>
                {children}
            </main>
        </div>
    )
}

export default AppLayout