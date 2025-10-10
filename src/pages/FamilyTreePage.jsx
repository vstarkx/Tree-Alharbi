import { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import { Plus, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
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
    if (editingMember) {
      // Update existing member
      setMembers(prev =>
        prev.map(m => m.id === editingMember.id ? { ...formData, id: m.id } : m)
      );
    } else {
      // Add new member
      const newMember = {
        ...formData,
        id: generateId()
      };
      setMembers(prev => [...prev, newMember]);
    }
    setShowForm(false);
    setEditingMember(null);
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setSelectedMember(null);
    setShowForm(true);
  };

  const handleDeleteMember = (memberId) => {
    const descendants = getDescendants(members, memberId);
    setMembers(prev =>
      prev.filter(m => m.id !== memberId && !descendants.includes(m.id))
    );
    setSelectedMember(null);
  };

  const handleNodeClick = (nodeData) => {
    const memberId = nodeData.data.attributes?.id;
    if (memberId) {
      const member = members.find(m => m.id === memberId);
      if (member) {
        setSelectedMember(member);
      }
    }
  };

  const treeData = convertToTreeStructure(members);

  const renderCustomNode = ({ nodeDatum }) => {
    const hasPhoto = nodeDatum.attributes?.photo;
    
    return (
      <g>
        {hasPhoto ? (
          <>
            <defs>
              <clipPath id={`clip-${nodeDatum.attributes.id}`}>
                <circle cx="0" cy="0" r="30" />
              </clipPath>
            </defs>
            <circle
              r="32"
              fill="#0ea5e9"
              stroke="#0369a1"
              strokeWidth="2"
            />
            <image
              href={nodeDatum.attributes.photo}
              x="-30"
              y="-30"
              width="60"
              height="60"
              clipPath={`url(#clip-${nodeDatum.attributes.id})`}
            />
          </>
        ) : (
          <circle
            r="30"
            fill="#0ea5e9"
            stroke="#0369a1"
            strokeWidth="2"
          />
        )}
        <text
          fill="white"
          strokeWidth="0"
          x="0"
          y={hasPhoto ? 0 : 5}
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
        >
          {!hasPhoto && nodeDatum.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
        </text>
        <text
          fill="#1f2937"
          strokeWidth="0"
          x="0"
          y="50"
          textAnchor="middle"
          fontSize="14"
          fontWeight="600"
        >
          {nodeDatum.name}
        </text>
        {nodeDatum.attributes?.relation && (
          <text
            fill="#6b7280"
            strokeWidth="0"
            x="0"
            y="68"
            textAnchor="middle"
            fontSize="12"
          >
            {nodeDatum.attributes.relation}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Family Tree
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {members.length} member{members.length !== 1 ? 's' : ''} in your family tree
            </p>
          </div>
          
          <button
            onClick={() => {
              setEditingMember(null);
              setShowForm(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Tree View */}
      <div className="flex-1 relative">
        {members.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-4 p-8">
              <div className="flex justify-center">
                <div className="p-4 bg-primary-100 rounded-full">
                  <Plus className="h-12 w-12 text-primary-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                No family members yet
              </h2>
              <p className="text-gray-600 max-w-md">
                Start building your family tree by adding your first family member.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-md"
              >
                <Plus className="h-5 w-5" />
                <span>Add First Member</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
              <button
                onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))}
                className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="h-5 w-5 text-gray-700" />
              </button>
              <button
                onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.3))}
                className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="h-5 w-5 text-gray-700" />
              </button>
              <button
                onClick={() => {
                  setZoom(1);
                  setTranslate({ x: 0, y: 0 });
                }}
                className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                title="Reset View"
              >
                <Maximize2 className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            {treeData && (
              <Tree
                data={treeData}
                orientation="vertical"
                pathFunc="step"
                translate={translate}
                zoom={zoom}
                onNodeClick={handleNodeClick}
                renderCustomNodeElement={renderCustomNode}
                separation={{ siblings: 2, nonSiblings: 2 }}
                nodeSize={{ x: 200, y: 200 }}
                centeringTransitionDuration={500}
                collapsible={false}
                zoomable={true}
                draggable={true}
                onUpdate={({ zoom, translate }) => {
                  setZoom(zoom);
                  setTranslate(translate);
                }}
                rootNodeClassName="node__root"
                branchNodeClassName="node__branch"
                leafNodeClassName="node__leaf"
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
          onSave={handleSaveMember}
          onClose={() => {
            setShowForm(false);
            setEditingMember(null);
          }}
        />
      )}

      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onEdit={handleEditMember}
          onDelete={handleDeleteMember}
        />
      )}
    </div>
  );
};

export default FamilyTreePage;

