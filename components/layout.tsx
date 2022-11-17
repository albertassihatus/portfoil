import React, { ReactNode } from 'react'


interface LayoutProps {
  children?: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen justify-between font-content antialiased">
      {/* <Header /> */}
      <main className="mb-auto">{children}</main>
    </div>
  )
}

export default Layout
