import React from 'react';

const Announcements = () => {
    return (
        <div className='bg-white p-4 rounded-md'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-semibold'>Announcements</h1>
                <span className='text-sx text-gray-400'>View All</span>
            </div>
            <div className='flex flex-col gap-4 mt-4'>
                <div className='bg-tomSkyLight rounded-md p-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-medium'>Parent-Teacher Conference</h2>
                        <span className='text-sx text-gray-400 bg-white rounded-md px-1 py-1'>2025-01-01</span>
                    </div>
                    <p className='text-sm text-gray-400 mt-1'>The upcoming Parent-Teacher Conference will be held on Thursday,</p>
                </div>
                <div className='bg-tomPurpleLight rounded-md p-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-medium'>Parent-Teacher Conference</h2>
                        <span className='text-sx text-gray-400 bg-white rounded-md px-1 py-1'>2025-01-01</span>
                    </div>
                    <p className='text-sm text-gray-400 mt-1'>The upcoming Parent-Teacher Conference will be held on Thursday,</p>
                </div>
                <div className='bg-tomYellowLight rounded-md p-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-medium'>Parent-Teacher Conference</h2>
                        <span className='text-sx text-gray-400 bg-white rounded-md px-1 py-1'>2025-01-01</span>
                    </div>
                    <p className='text-sm text-gray-400 mt-1'>The upcoming Parent-Teacher Conference will be held on Thursday,</p>
                </div>
            </div>
        </div>
    );
}

export default Announcements;
