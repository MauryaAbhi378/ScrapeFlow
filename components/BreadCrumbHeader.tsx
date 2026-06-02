import { MobileSidebar } from "./Sidebar";

function BreadCrumbHeader() {
    return (
        <div className="flex items-center flex-start">
            <MobileSidebar />
            Home
        </div>
    )
}

export default BreadCrumbHeader;