import React from 'react';
import { motion } from 'motion/react';
import { SiteConfig } from '../types/symposium';

export const CrewSection: React.FC<{ site: SiteConfig }> = ({ site }) => {
  const gradients = [
    'linear-gradient(135deg, #1565c0, #050d1c)',
    'linear-gradient(135deg, #9c1c28, #0a0206)',
    'linear-gradient(135deg, #e53935, #1a0505)',
    'linear-gradient(135deg, #ec407a, #0b3d3a)',
    'linear-gradient(135deg, #f9a825, #0d47a1)'
  ];

  const cast = [
    ['Guest Name', 'Keynote speaker'],
    ['Speaker Two', 'Industry talk'],
    ['Speaker Three', 'Guest of honour'],
    ['Judge Four', 'Event judge'],
    ['Chief Guest', 'Closing ceremony']
  ];

  const staff = [
    ['Staff Name', 'Staff coordinator'],
    ['Staff Name', 'Staff coordinator'],
    ['Staff Name', 'Staff coordinator'],
    ['Staff Name', 'Staff coordinator']
  ];

  const office = [
    ['Name', 'Chairperson'],
    ['Name', 'Vice chairperson'],
    ['Name', 'Secretary'],
    ['Name', 'Joint secretary'],
    ['Name', 'Treasurer']
  ];

  const renderRow = (data: string[][]) => (
    <div className="flex gap-[22px] overflow-x-auto py-[6px] no-scrollbar">
      {data.map((p, i) => (
        <div key={i} className="text-center flex-[0_0_120px] text-[13px]">
          <div 
            className="w-[110px] h-[110px] rounded-full my-0 mx-auto mb-[8px] grid place-items-center font-bebas text-[38px] font-normal tracking-wide"
            style={{ background: gradients[i % 5] }}
          >
            {p[0][0]}
          </div>
          <b>{p[0]}</b>
          <span className="text-[#b3b3b3] block text-[12px]">{p[1]}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="py-12 flex flex-col gap-[30px]">
      <motion.section id="cast" className="px-[4%]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="font-bebas text-[26px] mb-[10px] tracking-wide">Cast & crew</h2>
        {renderRow(cast)}
      </motion.section>
      
      <motion.section id="staff" className="px-[4%]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="font-bebas text-[26px] mb-[10px] tracking-wide">Staff coordinators</h2>
        {renderRow(staff)}
      </motion.section>
      
      <motion.section id="office" className="px-[4%]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="font-bebas text-[26px] mb-[10px] tracking-wide">Office bearers</h2>
        {renderRow(office)}
      </motion.section>
    </div>
  );
};
