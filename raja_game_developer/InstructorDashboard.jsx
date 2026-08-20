import React, { useState } from 'react';
import { MOCK_CLASS_DATA } from '../data/mockState';
import { GraduationCap, Download, AlertTriangle, Users, TrendingUp, Search } from 'lucide-react';

export default function InstructorDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const classData = MOCK_CLASS_DATA;

  const filteredStudents = classData.students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    let csv = 'Student Name,Email,Completed Quests,Average Quiz Score (%),Status,Last Active\n';
    classData.students.forEach(s => {
      csv += `"${s.name}","${s.email}",${s.completedZones},${s.avgScore}%,"${s.status}","${s.lastActive}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CO1_Outcome_Attainment_Report.csv';
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-6">
      
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-3xl border border-indigo-500/30 flex flex-wrap items-center justify-between gap-6 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-cyan-950/80">
        <div>
          <span className="text-xs uppercase font-bold text-cyan-400 font-mono">Learning Analytics & OBE Accreditation</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{classData.courseName}</h2>
          <p className="text-xs text-indigo-300 font-medium mt-1">{classData.courseOutcome}</p>
        </div>

        <button 
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-glow-neon transition"
        >
          <Download className="w-4 h-4" /> Export OBE CSV Report
        </button>
      </div>

      {/* Class Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Enrolled Students</span>
            <div className="text-2xl font-extrabold text-white font-mono">{classData.totalStudents}</div>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Average Class Attainment</span>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">{classData.averageAttainment}%</div>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Students Needing Support</span>
            <div className="text-2xl font-extrabold text-amber-400 font-mono">2</div>
          </div>
        </div>
      </div>

      {/* Class-wide Mastery Heatmap across 15 topics */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-indigo-400" /> Class Mastery Heatmap per Syllabus Topic (CO1)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {classData.topicMasteryHeatmap.map(topic => {
            const mastery = topic.masteryPct;
            let badgeColor = 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300';
            if (mastery < 75) badgeColor = 'bg-rose-500/20 border-rose-500/40 text-rose-300';
            else if (mastery < 85) badgeColor = 'bg-amber-500/20 border-amber-500/40 text-amber-300';

            return (
              <div key={topic.zoneId} className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase">{topic.unit}</span>
                    <h4 className="text-xs font-bold text-slate-200">{topic.topic}</h4>
                  </div>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${badgeColor}`}>
                    {mastery}%
                  </span>
                </div>

                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400" style={{ width: `${mastery}%` }} />
                </div>

                <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-1 border-t border-slate-800/60">
                  <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                  <span className="truncate">{topic.missteps}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Per-Student Progress Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h3 className="text-base font-bold text-white">Individual Student Roster & Attainment</h3>
          
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input 
              type="text"
              placeholder="Search student..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3">Student Name</th>
                <th className="p-3">Email</th>
                <th className="p-3 text-center">Quests Cleared</th>
                <th className="p-3 text-center">Avg Quiz Score</th>
                <th className="p-3">Attainment Status</th>
                <th className="p-3 text-right">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredStudents.map(s => (
                <tr key={s.id} className="hover:bg-slate-900/50 transition">
                  <td className="p-3 font-semibold text-white">{s.name}</td>
                  <td className="p-3 font-mono text-slate-400">{s.email}</td>
                  <td className="p-3 text-center font-mono font-bold text-indigo-400">{s.completedZones} / 15</td>
                  <td className="p-3 text-center font-mono font-bold text-cyan-400">{s.avgScore}%</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                      s.status === 'Mastered' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      s.status === 'Proficient' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                      'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="p-3 text-right font-mono text-slate-500">{s.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
