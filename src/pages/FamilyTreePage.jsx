import { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import { Plus, ZoomIn, ZoomOut, Maximize2, Users } from 'lucide-react';
import MemberForm from '../components/MemberForm';
import MemberModal from '../components/MemberModal';
import {
  loadFamilyData,
  saveFamilyData,
  generateId,
  convertToTreeStructure,
  getDescendants
} from '../utils/familyTreeUtils';

const FamilyTreePage = () => {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [preselectedParentId, setPreselectedParentId] = useState(null);
  const [preselectedChildId, setPreselectedChildId] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const data = loadFamilyData();
    setMembers(data);
  }, []);

  useEffect(() => {
    saveFamilyData(members);
  }, [members]);

  const handleSaveMember = (formData) => {
    const { childId, ...memberData } = formData; // Remove childId from member data
    
    if (editingMember) {
      // Update existing member
      const updatedMember = { ...memberData, id: editingMember.id };
      
      // If childId is provided, update the child's parentId
      if (childId) {
        setMembers(prev =>
          prev.map(m => {
            if (m.id === editingMember.id) {
              return updatedMember;
            } else if (m.id === childId) {
              return { ...m, parentId: editingMember.id };
            }
            return m;
          })
        );
      } else {
        setMembers(prev =>
          prev.map(m => m.id === editingMember.id ? updatedMember : m)
        );
      }
    } else {
      // Add new member
      const newMember = {
        ...memberData,
        id: generateId()
      };
      
      // If childId is provided, update the child's parentId
      if (childId) {
        setMembers(prev =>
          prev.map(m => 
            m.id === childId 
              ? { ...m, parentId: newMember.id }
              : m
          ).concat(newMember)
        );
      } else {
        setMembers(prev => [...prev, newMember]);
      }
    }
    setShowForm(false);
    setEditingMember(null);
    setPreselectedParentId(null);
    setPreselectedChildId(null);
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setSelectedMember(null);
    setPreselectedParentId(null);
    setPreselectedChildId(null);
    setShowForm(true);
  };

  const handleDeleteMember = (memberId) => {
    const descendants = getDescendants(members, memberId);
    setMembers(prev =>
      prev.filter(m => m.id !== memberId && !descendants.includes(m.id))
    );
    setSelectedMember(null);
  };

  const handleAddChild = (parentId) => {
    setPreselectedParentId(parentId);
    setEditingMember(null);
    setSelectedMember(null);
    setPreselectedChildId(null);
    setShowForm(true);
  };

  const handleAddParent = (childId) => {
    // Set the child as preselected and open form to add new parent
    setPreselectedChildId(childId);
    setEditingMember(null);
    setPreselectedParentId(null);
    setSelectedMember(null);
    setShowForm(true);
  };

  const handleNodeClick = (nodeData) => {
    const memberId = nodeData.data.attributes?.id;
    if (memberId) {
      const member = members.find(m => m.id === memberId);
      if (member) {
        // Open modal with member data
        setSelectedMember(member);
        // Close any open forms
        setShowForm(false);
        setEditingMember(null);
        setPreselectedParentId(null);
        setPreselectedChildId(null);
      }
    }
  };

  const treeData = convertToTreeStructure(members);

  const renderCustomNode = ({ nodeDatum }) => {
    return (
      <g className="tree-node-clickable">
        <defs>
          {/* Black gradient */}
          <linearGradient id={`blackGradient-${nodeDatum.attributes.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1f2937" />
            <stop offset="50%" stopColor="#111827" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          
          {/* Inner highlight */}
          <radialGradient id={`inner-highlight-${nodeDatum.attributes.id}`}>
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          
          {/* Shadow filter */}
          <filter id={`shadow-${nodeDatum.attributes.id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        {/* Main black circle */}
        <circle
          r="50"
          fill={`url(#blackGradient-${nodeDatum.attributes.id})`}
          stroke="#374151"
          strokeWidth="4"
          filter={`url(#shadow-${nodeDatum.attributes.id})`}
          style={{ cursor: 'pointer' }}
          className="transition-all duration-300"
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.strokeWidth = '5';
            e.target.style.stroke = '#6b7280';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.strokeWidth = '4';
            e.target.style.stroke = '#374151';
          }}
        />
        
        {/* Inner highlight */}
        <circle
          r="45"
          fill={`url(#inner-highlight-${nodeDatum.attributes.id})`}
          style={{ cursor: 'pointer' }}
        />
        
        {/* Person icon */}
        <g transform="translate(0, -5)">
          {/* Head */}
          <circle
            cx="0"
            cy="-15"
            r="12"
            fill="white"
            stroke="none"
          />
          
          {/* Body */}
          <path
            d="M -20 0 Q 0 -5 20 0 L 15 25 Q 0 20 -15 25 Z"
            fill="white"
            stroke="none"
          />
        </g>
        
        {/* Initials in center */}
        <text
          fill="white"
          strokeWidth="0"
          x="0"
          y="8"
          textAnchor="middle"
          fontSize="20"
          fontWeight="900"
          className="transition-all drop-shadow-lg"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
        >
          {nodeDatum.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
        </text>
        
        {/* Name below circle */}
        <text
          fill="#1f2937"
          strokeWidth="0"
          x="0"
          y="75"
          textAnchor="middle"
          fontSize="14"
          fontWeight="800"
          className="transition-all"
          style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}
        >
          {nodeDatum.name}
        </text>
        
        {/* Click hint */}
        <text
          fill="rgba(107, 114, 128, 0.8)"
          strokeWidth="0"
          x="0"
          y="95"
          textAnchor="middle"
          fontSize="10"
          fontWeight="600"
          className="transition-all animate-bounce"
          style={{ animationDuration: '2s' }}
        >
          انقر للعرض
        </text>
        
        {/* Decorative dots */}
        <circle cx="-35" cy="-25" r="2" fill="rgba(107, 114, 128, 0.6)" className="decorative-dot" />
        <circle cx="35" cy="-25" r="2" fill="rgba(107, 114, 128, 0.6)" className="decorative-dot" />
        <circle cx="-35" cy="35" r="2" fill="rgba(107, 114, 128, 0.6)" className="decorative-dot" />
        <circle cx="35" cy="35" r="2" fill="rgba(107, 114, 128, 0.6)" className="decorative-dot" />
      </g>
    );
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-gradient-to-br from-emerald-50/50 via-teal-50/50 to-cyan-50/50 rtl-support relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-teal-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
      </div>
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-emerald-100 px-4 py-4 md:px-6 shadow-sm relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              شجرة العائلة
            </h1>
            <div className="flex items-center space-x-2 mt-1">
              <Users className="h-4 w-4 text-emerald-600" />
              <p className="text-sm text-gray-600 font-medium">
                {members.length} عضو{members.length !== 1 ? '' : ''}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => {
              setEditingMember(null);
              setPreselectedParentId(null);
              setPreselectedChildId(null);
              setShowForm(true);
            }}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="h-5 w-5" />
            <span>إضافة عضو</span>
          </button>
        </div>
      </div>

      {/* Tree View */}
      <div className="flex-1 relative z-10">
        {members.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-8 p-8 animate-in fade-in zoom-in-95 duration-500">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                  <div className="relative p-8 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full">
                    <Plus className="h-20 w-20 text-emerald-600" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                ابدأ شجرة عائلتك
              </h2>
              <p className="text-gray-600 max-w-md text-lg">
                أضف أول عضو في عائلتك للبدء
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all font-semibold shadow-2xl hover:shadow-3xl text-lg transform hover:scale-105"
              >
                <Plus className="h-6 w-6" />
                <span>إضافة أول عضو</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
              <button
                onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))}
                className="p-3 bg-white/90 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl hover:bg-white transition-all border border-emerald-100 group"
                title="تكبير"
              >
                <ZoomIn className="h-6 w-6 text-emerald-600 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.3))}
                className="p-3 bg-white/90 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl hover:bg-white transition-all border border-emerald-100 group"
                title="تصغير"
              >
                <ZoomOut className="h-6 w-6 text-emerald-600 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={() => {
                  setZoom(1);
                  setTranslate({ x: 0, y: 0 });
                }}
                className="p-3 bg-white/90 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl hover:bg-white transition-all border border-emerald-100 group"
                title="إعادة تعيين العرض"
              >
                <Maximize2 className="h-6 w-6 text-emerald-600 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {treeData && (
              <Tree
                data={treeData}
                orientation="vertical"
                pathFunc="step"
                pathClassFunc={() => 'tree-link'}
                translate={translate}
                zoom={zoom}
                onNodeClick={handleNodeClick}
                renderCustomNodeElement={renderCustomNode}
                separation={{ siblings: 2.5, nonSiblings: 2.5 }}
                nodeSize={{ x: 220, y: 220 }}
                centeringTransitionDuration={500}
                collapsible={false}
                zoomable={true}
                draggable={true}
                onUpdate={({ zoom, translate }) => {
                  setZoom(zoom);
                  setTranslate(translate);
                }}
              />
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {showForm && (
        <MemberForm
          member={editingMember}
          members={members}
          preselectedParentId={preselectedParentId}
          preselectedChildId={preselectedChildId}
          onSave={handleSaveMember}
          onClose={() => {
            setShowForm(false);
            setEditingMember(null);
            setPreselectedParentId(null);
            setPreselectedChildId(null);
          }}
        />
      )}

      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onEdit={handleEditMember}
          onDelete={handleDeleteMember}
          onAddChild={handleAddChild}
          onAddParent={handleAddParent}
        />
      )}

      {/* Custom styles for tree links */}
      <style>{`
        .tree-link {
          stroke: url(#linkGradient);
          stroke-width: 4;
          fill: none;
          opacity: 0.8;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
          transition: all 0.3s ease;
        }
        
        .tree-link:hover {
          stroke-width: 6;
          opacity: 1;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
        }
        
        .tree-node-clickable:hover .tree-link {
          stroke-width: 5;
          opacity: 0.9;
        }
      `}</style>
      
      {/* Define gradient for links */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="50%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default FamilyTreePage;
