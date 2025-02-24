"use client"

import Announcements from '@/components/Announcements'
import AttendanceChart from '@/components/AttendanceChart'
import CountChart from '@/components/CountChart'
import EventCalendar from '@/components/EventCalendar'
import FinanceChart from '@/components/FinanceChart'
import UserCard from '@/components/UserCard'
import React, { useEffect, useState } from 'react'

type Analytics = {
  studentCount: number;
  teacherCount: number;
  parentCount: number;
  maleStudentCount: number;
  femaleStudentCount: number;
}

function AdminPage() {

  const [analytics, setAnalytics] = useState<Analytics>();

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schools/analytics`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 200) {
          const j = await res.json();
          const data = j.data;
          console.log(data);

          setAnalytics(data);

        } else {
          console.error("Failed to fetch analytics");
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchFees();
  }, []);

  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      {/* LEFT */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
        {/* USER CARDS */}
        <div className='flex gap-4 justify-between flex-wrap'>
          <UserCard type='Student' count={analytics?.studentCount ?? 0} />
          <UserCard type='Teacher' count={analytics?.teacherCount ?? 0} />
          <UserCard type='Parent' count={analytics?.parentCount ?? 0} />
          <UserCard type='Staff' count={analytics?.parentCount ?? 0} />
        </div>
        {/* MIDDLE CHARTS */}
        <div className='flex gap-4 flex-col lg:flex-row'>
          {/* COUNT CHARTS */}
          <div className='w-full lg:w-1/3 h-[450px]'>
            <CountChart male={analytics?.maleStudentCount ?? 0} female={analytics?.femaleStudentCount ?? 0} />
          </div>
          {/* ATTENDANCE CHARTS */}
          <div className='w-full lg:w-2/3 h-[450px]'>
            <AttendanceChart />
          </div>
        </div>
        {/* BOTTOM CHARTS */}
        <div className='w-full h-[500px]'>
          <FinanceChart />
        </div>
      </div>
      {/* RIGHT */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
        <Announcements />
        <EventCalendar />
      </div>
    </div>
  )
}

export default AdminPage