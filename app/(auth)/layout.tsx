const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex-center bg-primary-50 min-h-screen bg-dotted-pattern w-full bg-cover bg-fixed bg-center">{children}</div>
    )
}

export default layout