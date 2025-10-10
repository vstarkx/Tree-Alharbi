// Utility functions for family tree data management

export const saveFamilyData = (data) => {
  localStorage.setItem('familyTreeData', JSON.stringify(data));
};

export const loadFamilyData = () => {
  const data = localStorage.getItem('familyTreeData');
  return data ? JSON.parse(data) : [];
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Convert flat array to tree structure for react-d3-tree
export const convertToTreeStructure = (members) => {
  if (members.length === 0) return null;

  // Create a map for quick lookup
  const memberMap = {};
  members.forEach(member => {
    memberMap[member.id] = {
      name: member.name,
      attributes: {
        id: member.id,
      },
      children: []
    };
  });

  // Find root (members without parents) and build tree
  let root = null;
  members.forEach(member => {
    if (member.parentId && memberMap[member.parentId]) {
      memberMap[member.parentId].children.push(memberMap[member.id]);
    } else {
      // This is a root node
      if (!root) {
        root = memberMap[member.id];
      }
    }
  });

  return root;
};

// Get all descendants of a member (for deletion)
export const getDescendants = (members, parentId) => {
  const descendants = [];
  const findChildren = (pid) => {
    members.forEach(member => {
      if (member.parentId === pid) {
        descendants.push(member.id);
        findChildren(member.id);
      }
    });
  };
  findChildren(parentId);
  return descendants;
};
