import React from 'react';

function ProfileSidebar() {
  return (
    <div className="w-full">
      {/* Activity Section */}
      <section>
        <div className="border-b border-[#2c3440] pb-2 mb-4">
          <h2 className="text-[12px] text-[#8b9bb4] font-bold uppercase tracking-widest">Actividad</h2>
        </div>
        <p className="text-[#8b9bb4] text-[13px]">
          Sin actividad reciente
        </p>
      </section>
    </div>
  );
}

export default ProfileSidebar;