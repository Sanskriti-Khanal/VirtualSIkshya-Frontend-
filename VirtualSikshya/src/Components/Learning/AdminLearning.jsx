import React, { useState } from 'react';
import "../../styles/learning.css";

const CourseContent = ({ userRole }) => {
    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedContent, setSelectedContent] = useState(null);
    const [courseModules, setCourseModules] = useState([
        { id: 1, title: 'Introduction to Programming', contents: [{ id: 1, title: 'Getting Started', contentText: '' }, { id: 2, title: 'Syntax', contentText: '' }], teacher: null },
        { id: 2, title: 'Data Structures', contents: [{ id: 3, title: 'Arrays', contentText: '' }, { id: 4, title: 'Lists', contentText: '' }], teacher: null },
        { id: 3, title: 'Ethical Computing', contents: [{ id: 5, title: 'Ethical Considerations', contentText: '' }, { id: 6, title: 'Data Privacy', contentText: '' }], teacher: null },
        { id: 4, title: 'AI Fundamentals', contents: [{ id: 7, title: 'Machine Learning Intro', contentText: '' }, { id: 8, title: 'AI Ethics', contentText: '' }], teacher: null },
    ]);

    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [newModuleTitle, setNewModuleTitle] = useState('');
    const [newContentTitle, setNewContentTitle] = useState('');
    const [assignTeacherModal, setAssignTeacherModal] = useState(false);
    const [availableTeachers, setAvailableTeachers] = useState([
        { id: 1, name: 'John Doe', faculty: 'AI' },
        { id: 2, name: 'Jane Doe', faculty: 'Computing' },
        { id: 3, name: 'Bob Smith', faculty: 'Ethics' },
        { id: 4, name: 'Alice Johnson', faculty: 'AI' },
        { id: 5, name: 'Mike Brown', faculty: 'Computing' },
        { id: 6, name: 'Emily Davis', faculty: 'Ethics' },
    ]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [contentText, setContentText] = useState('');

    const handleEdit = () => {
        const updatedModules = courseModules.map(module => {
            if (module.id === selectedModule.id) {
                return {
                    ...module,
                    contents: module.contents.map(content =>
                        content.id === selectedContent.id ? { ...content, title: editedTitle, contentText } : content
                    )
                };
            }
            return module;
        });
        setCourseModules(updatedModules);
        setEditMode(false);
    };

    const handleDeleteContent = () => {
        const updatedModules = courseModules.map(module => ({
            ...module,
            contents: module.contents.filter(content => content.id !== selectedContent.id)
        }));
        setCourseModules(updatedModules);
        setSelectedContent(null);
    };

    const handleCreateModule = () => {
        if (newModuleTitle.trim() !== '') {
            const newModule = {
                id: courseModules.length + 1,
                title: newModuleTitle,
                contents: [],
                teacher: null,
            };
            setCourseModules([...courseModules, newModule]);
            setNewModuleTitle('');
        }
    };

    const handleCreateContent = () => {
        if (selectedModule && newContentTitle.trim() !== '') {
            const newContent = {
                id: selectedModule.contents.length + 1,
                title: newContentTitle,
                contentText: '', // Initialize with empty content text
            };
            const updatedModules = courseModules.map(module =>
                module.id === selectedModule.id ? { ...module, contents: [...module.contents, newContent] } : module
            );
            setCourseModules(updatedModules);
            setNewContentTitle('');
        }
    };

    const handleDeleteModule = () => {
        if (selectedModule) {
            setCourseModules(courseModules.filter(module => module.id !== selectedModule.id));
            setSelectedModule(null);
            setSelectedContent(null);
        }
    };

    const handleAssignTeacher = () => {
        setAssignTeacherModal(true);
    };

    const handleSelectTeacher = (teacher) => {
        const updatedModules = courseModules.map(module =>
            module.id === selectedModule.id ? { ...module, teacher: teacher } : module
        );
        setCourseModules(updatedModules);
        setSelectedTeacher(teacher);
        setAssignTeacherModal(false);
    };

    return (
        <div className="learning-portal">
            <div className="module-list">
                <h2>Course Modules</h2>
                {courseModules.map((module) => (
                    <div
                        key={module.id}
                        className={`module-item ${selectedModule?.id === module.id ? 'active' : ''}`}
                        onClick={() => setSelectedModule(module)}
                    >
                        <h3>{module.title}</h3>
                        {selectedModule?.id === module.id && (
                            <div className="content-list">
                                {module.contents.map((content) => (
                                    <div
                                        key={content.id}
                                        className={`content-item ${selectedContent?.id === content.id ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedContent(content);
                                            setEditMode(false);
                                            setEditedTitle(content.title);
                                            setContentText(content.contentText); // Set content text for editing
                                        }}
                                    >
                                        <span className="content-title">{content.title}</span>
                                    </div>
                                ))}
                                <div className="add-content">
                                    <input
                                        type="text"
                                        placeholder="New Content Title"
                                        value={newContentTitle}
                                        onChange={(e) => setNewContentTitle(e.target.value)}
                                        className="input-field"
                                    />
                                    <button onClick={handleCreateContent} className="btn btn-primary">
                                        Add Content
                                    </button>
                                </div>
                            </div>
                        )}
                        {selectedModule?.id === module.id && (
                            <div className="module-actions">
                                <button className="btn btn-danger delete-module" onClick={handleDeleteModule}>
                                    Delete Module
                                </button>
                                <button className="btn btn-info assign-teacher" onClick={handleAssignTeacher}>Assign Teacher</button>
                                {module.teacher && (
                                    <p>Assigned Teacher: {module.teacher.name}</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}

                <div className="add-module">
                    <input
                        type="text"
                        placeholder="New Module Title"
                        value={newModuleTitle}
                        onChange={(e) => setNewModuleTitle(e.target.value)}
                        className="input-field"
                    />
                    <button onClick={handleCreateModule} className="btn btn-primary">
                        Add Module
                    </button>
                </div>
            </div>

            <div className="content-display">
                {selectedContent ? (
                    <div>
                        {editMode ? (
                            <div className="edit-content">
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    className="input-field"
                                />
                                <textarea
                                    value={contentText}
                                    onChange={(e) => setContentText(e.target.value)}
                                    placeholder="Enter content text here..."
                                    className="input-field"
                                    rows="5"
                                />
                                <button className="btn btn-primary" onClick={handleEdit}>
                                    Save
                                </button>
                                <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="content-viewer text-viewer">
                                <h4>{selectedContent.title}</h4>
                                <p>{selectedContent.contentText || "Content Text Here (To be implemented)"}</p>
                            </div>
                        )}
                        <div className="content-actions">
                            <button className="btn btn-primary" onClick={() => setEditMode(true)}>
                                Edit
                            </button>
                            <button className="btn btn-danger" onClick={handleDeleteContent}>
                                Delete
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="select-content-prompt">
                        <h3>Select a content item to begin</h3>
                    </div>
                )}
            </div>

            {assignTeacherModal && (
                <div className="assign-teacher-modal">
                    <div className="modal-content">
                        <h2>Assign Teacher</h2>
                        <div className="teacher-list">
                            {availableTeachers.map((teacher) => (
                                <div key={teacher.id} className="teacher" onClick={() => handleSelectTeacher(teacher)}>
                                    <div className="teacher-name">{teacher.name}</div>
                                    <div className="teacher-faculty">{teacher.faculty}</div>
                                </div>
                            ))}
                        </div>
                        <div className="modal-button-group">
                            <button className="btn-cancel" onClick={() => setAssignTeacherModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseContent;