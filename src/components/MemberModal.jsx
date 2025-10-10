import { X, Mail, Phone, Calendar, Users } from 'lucide-react';

const MemberModal = ({ member, onClose, onEdit, onDelete }) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Member Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {member.photo && (
            <div className="flex justify-center">
              <img
                src={member.photo}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-primary-100"
              />
            </div>
          )}

          <div>
            <h3 className="text-2xl font-semibold text-gray-900 text-center">
              {member.name}
            </h3>
          </div>

          <div className="space-y-3">
            {member.relation && (
              <div className="flex items-center space-x-3 text-gray-700">
                <Users className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-500">Relation</p>
                  <p className="font-medium">{member.relation}</p>
                </div>
              </div>
            )}

            {member.dateOfBirth && (
              <div className="flex items-center space-x-3 text-gray-700">
                <Calendar className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">{member.dateOfBirth}</p>
                </div>
              </div>
            )}

            {member.email && (
              <div className="flex items-center space-x-3 text-gray-700">
                <Mail className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{member.email}</p>
                </div>
              </div>
            )}

            {member.phone && (
              <div className="flex items-center space-x-3 text-gray-700">
                <Phone className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{member.phone}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={() => onEdit(member)}
              className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this member and all their descendants?')) {
                  onDelete(member.id);
                }
              }}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberModal;

