import React from 'react'
import { RxDashboard } from "react-icons/rx";

const DashboardSidebar = () => {
    return (
        <div className='w-full h-[100vh] bg-white shadow-sm sticky top-0 left-0 z-10'>
            {/* single item */}
            <div className="w-full flex items-center p-4">
                <Link>
                    <RxDashboard
                        size={30}
                        color={`${activeHeading === 1 ? 'crimson' : '#555'}`} />
                    <h5 className={`display-bloakc-800px hidden pl-2 text-[18px] font-[400] ${activeHeading === 1 ? "text-[crimson]" : "text-[#555]"}`}>
                        Dashboard
                    </h5>
                </Link>
            </div>
        </div>
    )
}

export default DashboardSidebar
