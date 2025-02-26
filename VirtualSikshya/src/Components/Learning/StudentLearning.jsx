import React, { useState } from 'react';
import "../../styles/learning.css";

const StudentLearning = () => {
    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedContent, setSelectedContent] = useState(null);
    const [courseModules, setCourseModules] = useState([
        { id: 1, title: 'Introduction to Programming', contents: [{ id: 1, title: 'Getting Started', contentText: 'Introduction to programming concepts.', isRead: false }, { id: 2, title: 'Syntax', contentText: 'Understanding syntax in programming.', isRead: false }], teacher: null },
        { id: 2, title: 'Data Structures', contents: [{ id: 3, title: 'Arrays', contentText: 'Introduction to arrays.', isRead: false }, { id: 4, title: 'Lists', contentText: 'Understanding lists.', isRead: false }], teacher: null },
        { id: 3, title: 'Ethical Computing', contents: [{ id: 5, title: 'Ethical Considerations', contentText: 'Understanding ethical considerations in computing.', isRead: false }, { id: 6, title: 'Data Privacy', contentText: 'Importance of data privacy.', isRead: false }], teacher: null },
        { id: 4, title: 'AI Fundamentals', contents: [{ id: 7, title: 'Machine Learning Intro', contentText: 'Introduction to machine learning.', isRead: false }, { id: 8, title: 'AI Ethics', contentText: 'Understanding ethics in AI.', isRead: false }], teacher: null },
    ]);

    const handleMarkAsRead = (content) => {
        const updatedModules = courseModules.map(module => {
            if (module.id === selectedModule.id) {
                return {
                    ...module,
                    contents: module.contents.map(item =>
                        item.id === content.id ? { ...item, isRead: true } : item
                    )
                };
            }
            return module;
        });
        setCourseModules(updatedModules);
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
                                        }}
                                    >
                                        <span className="content-title">{content.title}</span>
                                        {content.isRead && <span className="badge">Read</span>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="content-display">
                {selectedContent ? (
                    <div className="content-viewer text-viewer">
                        <h4>{selectedContent.title}</h4>
                        <p>{selectedContent.contentText || "Content Text Here (To be implemented)"}</p>
                        {!selectedContent.isRead && (
                            <button className="btn btn-primary" onClick={() => handleMarkAsRead(selectedContent)}>
                                Mark as Read
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="select-content-prompt">
                        <h3>Select a content item to begin</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentLearning;