import { X, UserPlus, Edit2, Trash2, Calendar, Users, Heart, User } from 'lucide-react';

const MemberModal = ({ member, onClose, onEdit, onDelete, onAddChild, onAddParent }) => {
  if (!member) return null;

  const initials = member.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div 
      className="modern-popup-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="member-modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modern-popup-content">
        {/* Modern Header */}
        <div className="modern-popup-header">
          <div className="modern-popup-header-content">
            <div>
              <h2 id="member-modal-title" className="modern-popup-title">ملف العضو</h2>
            </div>
            <button
              onClick={onClose}
              className="modern-popup-close"
              aria-label="إغلاق النافذة"
            >
              <X className="h-6 w-6" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="modern-popup-body">
          {/* Enhanced Member Avatar Section */}
          <div className="text-center relative">
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-white text-3xl font-black">
                    {initials}
                  </span>
                </div>
              </div>
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-2">
              {member.name}
            </h3>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Users className="h-4 w-4" />
              <span className="text-sm font-semibold">Family Member</span>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => onAddChild(member.id)}
              className="w-full group relative overflow-hidden"
              aria-label={`Add child to ${member.name}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative flex items-center justify-center space-x-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-4 rounded-2xl hover:from-emerald-700 hover:to-teal-700 transition-all font-bold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]">
                <UserPlus className="h-5 w-5" />
                <span className="text-lg">إضافة ابن</span>
              </div>
            </button>

            <button
              onClick={() => onAddParent(member.id)}
              className="w-full group relative overflow-hidden"
              aria-label={`Add parent to ${member.name}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative flex items-center justify-center space-x-3 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-4 rounded-2xl hover:from-orange-700 hover:to-red-700 transition-all font-bold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]">
                <User className="h-5 w-5" />
                <span className="text-lg">إضافة أب</span>
              </div>
            </button>

            <button
              onClick={() => onEdit(member)}
              className="w-full group relative overflow-hidden"
              aria-label={`Edit ${member.name}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all font-bold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]">
                <Edit2 className="h-5 w-5" />
                <span className="text-lg">تعديل العضو</span>
              </div>
            </button>

            <button
              onClick={() => {
                if (window.confirm(`Delete "${member.name}" and all descendants?`)) {
                  onDelete(member.id);
                }
              }}
              className="w-full group relative overflow-hidden"
              aria-label={`Delete ${member.name} and all descendants`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative flex items-center justify-center space-x-3 bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-4 rounded-2xl hover:from-red-700 hover:to-pink-700 transition-all font-bold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]">
                <Trash2 className="h-5 w-5" />
                <span className="text-lg">حذف العضو</span>
              </div>
            </button>
          </div>

          {/* Additional Info Section */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">معلومات سريعة</span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• اضغط "إضافة ابن" لإنشاء ابن جديد</p>
              <p>• اضغط "إضافة أب" لاختيار أب لهذا العضو</p>
              <p>• استخدم "تعديل العضو" لتحديث المعلومات</p>
              <p>• "حذف العضو" يزيل هذا العضو وجميع الأبناء</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberModal;
