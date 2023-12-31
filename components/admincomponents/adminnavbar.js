import { faChartLine, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dashboard from "./dashboard";


export default function AdminNav() {
    return (
    <div className="drawer lg:drawer-open">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
        <div className="drawer-content flex flex-col text-3xl">
            <div className="w-full navbar bg-secondary">
                <div className="flex-none lg:hidden">
                    <label htmlFor="my-drawer-3" className="btn btn-square btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </label>
                </div> 
                <div className="flex-1 px-2 mx-2 text-black">Admin Page</div>
            </div>
            <Dashboard />
        </div> 
        <div className="drawer-side z-50">
            <label htmlFor="my-drawer-3" className="drawer-overlay"></label> 
            <ul className="menu p-4 w-80 min-h-full bg-primary">
                <li className="text-3xl text-white">Halo, Admin!</li>
                <div className="divider"></div>
                <li className="text-lg"><a><i><FontAwesomeIcon icon={faChartLine}/></i>Dashboard</a></li>
                <li className="text-lg"><a><i><FontAwesomeIcon icon={faUsers}/></i>Daftar Calon Umrah</a></li>
            </ul>
        </div>
    </div>
    )
}