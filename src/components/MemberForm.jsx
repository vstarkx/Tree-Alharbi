import { useState, useEffect } from 'react';
import { X, User, Users, Search, Edit2, UserPlus, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';

const MemberForm = ({ member, members, onSave, onClose, preselectedParentId, preselectedChildId }) => {
  const [formData, setFormData] = useState({
    name: '',
    parentId: '',
    childId: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [childSearchTerm, setChildSearchTerm] = useState('');
  const [fieldStates, setFieldStates] = useState({
    name: { isValid: false, isTouched: false, error: '' },
    parentId: { isValid: true, isTouched: false, error: '' },
    childId: { isValid: true, isTouched: false, error: '' }
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        parentId: member.parentId || '',
        childId: '',
      });
    } else if (preselectedParentId) {
      setFormData(prev => ({
        ...prev,
        parentId: preselectedParentId,
        childId: ''
      }));
    } else if (preselectedChildId) {
      setFormData(prev => ({
        ...prev,
        childId: preselectedChildId,
        parentId: ''
      }));
    }
  }, [member, preselectedParentId, preselectedChildId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave(formData);
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return { isValid: false, error: 'الاسم مطلوب' };
        }
        if (value.trim().length < 2) {
          return { isValid: false, error: 'الاسم يجب أن يكون حرفين على الأقل' };
        }
        if (value.trim().length > 50) {
          return { isValid: false, error: 'الاسم يجب أن يكون أقل من 50 حرف' };
        }
        if (!/^[a-zA-Z\u0600-\u06FF\s'-]+$/.test(value.trim())) {
          return { isValid: false, error: 'الاسم يمكن أن يحتوي على أحرف ومسافات وشرطات فقط' };
        }
        return { isValid: true, error: '' };
      case 'parentId':
        return { isValid: true, error: '' };
      default:
        return { isValid: true, error: '' };
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const validation = validateField(name, value);
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setFieldStates(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        isValid: validation.isValid,
        error: validation.error,
        isTouched: true
      }
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const validation = validateField(name, value);
    
    setFieldStates(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        isValid: validation.isValid,
        error: validation.error,
        isTouched: true
      }
    }));
  };

  // Filter members based on search - allow all members except current member
  const filteredMembers = (members || []).filter(m => 
    (!member || m.id !== member.id) && 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter children based on search
  const filteredChildren = (members || []).filter(m => 
    (!member || m.id !== member.id) && 
    m.name.toLowerCase().includes(childSearchTerm.toLowerCase())
  );

  // Get selected parent name for display
  const selectedParent = (members || []).find(m => m.id === formData.parentId);
  
  // Get selected child name for display
  const selectedChild = (members || []).find(m => m.id === formData.childId);

  return (
    <div 
      className="modern-popup-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="member-form-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modern-popup-content">
        {/* Modern Header */}
        <div className="modern-popup-header">
          <div className="modern-popup-header-content">
            <div>
              <h2 id="member-form-title" className="modern-popup-title">
                {member ? 'تعديل العضو' : 'إضافة عضو'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="modern-popup-close"
              aria-label="إغلاق النموذج"
            >
              <X className="h-6 w-6" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="modern-popup-body">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="modern-form-group">
              <label className="modern-form-label">
                الاسم الكامل <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                autoFocus
                aria-label="الاسم الكامل للعضو"
                className={`modern-form-input ${
                  fieldStates.name.isTouched 
                    ? fieldStates.name.isValid 
                      ? 'border-green-500 focus:border-green-500' 
                      : 'border-red-500 focus:border-red-500'
                    : ''
                }`}
                placeholder="أدخل الاسم الكامل..."
              />
              {fieldStates.name.isTouched && !fieldStates.name.isValid && (
                <div className="text-red-500 text-sm mt-1">
                  {fieldStates.name.error}
                </div>
              )}
            </div>

            {/* Parent Selection */}
            <div className="modern-form-group">
              <label className="modern-form-label">
                اختر الأب
              </label>
            
              {/* Selected Parent Display */}
              {formData.parentId && selectedParent && (
                <div className="p-4 border-2 border-green-200 rounded-xl bg-green-50 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
                        {selectedParent.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{selectedParent.name}</div>
                        <div className="text-sm text-green-600">الأب المختار</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, parentId: '' }))}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              )}

              {/* Search Input */}
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="البحث عن الأب"
                className="modern-form-input"
                placeholder="ابحث عن الأب..."
              />
              
              {/* Searchable Dropdown */}
              {searchTerm && (
                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg shadow-lg bg-white mt-2">
                  {filteredMembers.length > 0 ? (
                    <div className="p-2 space-y-1">
                      {filteredMembers.map(member => (
                        <button
                          key={member.id}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, parentId: member.id }));
                            setSearchTerm('');
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-gray-50 text-right"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            {member.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                          </div>
                          <div className="font-medium text-gray-900">{member.name}</div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      لا توجد نتائج
                    </div>
                  )}
                </div>
              )}

              {/* No Parent Option */}
              {!formData.parentId && !searchTerm && (
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 mt-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center text-white">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">بدون أب</div>
                      <div className="text-sm text-gray-600">عضو رئيسي في العائلة</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Child Selection */}
            <div className="modern-form-group">
              <label className="modern-form-label">
                اختر الابن
              </label>
              
              {/* Selected Child Display */}
              {formData.childId && selectedChild && (
                <div className="p-4 border-2 border-blue-200 rounded-xl bg-blue-50 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">
                        {selectedChild.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{selectedChild.name}</div>
                        <div className="text-sm text-blue-600">الابن المختار</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, childId: '' }))}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              )}

              {/* Child Search Input */}
              <input
                type="text"
                value={childSearchTerm}
                onChange={(e) => setChildSearchTerm(e.target.value)}
                aria-label="البحث عن الابن"
                className="modern-form-input"
                placeholder="ابحث عن الابن..."
              />

              {/* Child Searchable Dropdown */}
              {childSearchTerm && (
                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg shadow-lg bg-white mt-2">
                  {filteredChildren.length > 0 ? (
                    <div className="p-2 space-y-1">
                      {filteredChildren.map(child => (
                        <button
                          key={child.id}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, childId: child.id }));
                            setChildSearchTerm('');
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-gray-50 text-right"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            {child.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                          </div>
                          <div className="font-medium text-gray-900">{child.name}</div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      لا توجد نتائج
                    </div>
                  )}
                </div>
              )}

              {/* No Child Option */}
              {!formData.childId && !childSearchTerm && (
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 mt-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center text-white">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">بدون ابن</div>
                      <div className="text-sm text-gray-600">عضو بدون أبناء</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="modern-button modern-button-secondary flex-1"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={!formData.name.trim() || !fieldStates.name.isValid}
                className={`modern-button flex-1 ${
                  formData.name.trim() && fieldStates.name.isValid
                    ? 'modern-button-primary'
                    : 'modern-button-secondary opacity-50 cursor-not-allowed'
                }`}
              >
                {member ? 'تحديث العضو' : 'إضافة العضو'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MemberForm;
