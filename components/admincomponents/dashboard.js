import prisma from "@/lib/prisma"

export default function Dashboard() {

    const getData = async (e) => {
        const res = await prisma.user.count()
        return res
    }
    
    return (
        <div className="grid min-h-screen z-40 bg-red-950">
            <div className="stats h-min w-min gap-4 m-4 shadow">
                <div className="stat bg-primary">
                    <div className="stat-title">Total Jumlah Pengguna</div>
                    <div className="stat-value">{getData()}</div>
                    <div className="stat-desc">Bjir momen</div>
                </div>
            </div>   
        </div>
    )
}