import React, { useState } from 'react';
import "../../styles/learning.css";

const CourseContent = ({ userRole }) => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [courseModules, setCourseModules] = useState([
    {
      id: 1,
      title: 'Introduction to Programming',
      contents: [
        { id: 1, type: 'video', title: 'Getting Started with Python', duration: '10:00' },
        { id: 2, type: 'document', title: 'Basic Syntax Guide', pages: 5, fileUrl: '#' }
      ]
    },
    {
      id: 2,
      title: 'Data Structures',
      contents: [
        { id: 3, type: 'video', title: 'Arrays and Lists', duration: '15:00' },
        { id: 4, type: 'document', title: 'Understanding Data Structures', pages: 8, fileUrl: '#' }
      ]
    }
  ]);

  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');

  const handleEdit = () => {
    const updatedModules = courseModules.map(module => {
      if (module.id === selectedModule.id) {
        return {
          ...module,
          contents: module.contents.map(content =>
            content.id === selectedContent.id ? { ...content, title: editedTitle } : content
          )
        };
      }
      return module;
    });
    setCourseModules(updatedModules);
    setEditMode(false);
  };

  const handleDelete = () => {
    const updatedModules = courseModules.map(module => ({
      ...module,
      contents: module.contents.filter(content => content.id !== selectedContent.id)
    }));
    setCourseModules(updatedModules);
    setSelectedContent(null);
  };

  const renderContent = (content) => {
    switch (content.type) {
      case 'video':
        return (
          <div className="content-viewer video-viewer">
            <h4>{content.title}</h4>
            <div className="video-placeholder">
              <p>Video Duration: {content.duration}</p>
              {/* Replace with an actual video player */}
              <p>🎥 Video Player Here</p>
            </div>
          </div>
        );
      case 'document':
        return (
          <div className="content-viewer document-viewer">
            <h4>{content.title}</h4>
            <div className="document-placeholder">
              <p>Pages: {content.pages}</p>
              <a href={content.fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                View PDF
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="learning-portal">
      <div className="module-list">
        {courseModules.map(module => (
          <div
            key={module.id}
            className={`module-item ${selectedModule?.id === module.id ? 'active' : ''}`}
            onClick={() => setSelectedModule(module)}
          >
            <h3>{module.title}</h3>
            {selectedModule?.id === module.id && (
              <div className="content-list">
                {module.contents.map(content => (
                  <div
                    key={content.id}
                    className={`content-item ${selectedContent?.id === content.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedContent(content);
                      setEditMode(false);
                      setEditedTitle(content.title);
                    }}
                  >
                    <span className={`content-type ${content.type}`}>{content.type}</span>
                    <span className="content-title">{content.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
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
                <button className="btn btn-primary" onClick={handleEdit}>Save</button>
                <button className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
              </div>
            ) : (
              renderContent(selectedContent)
            )}
            <div className="content-actions">
              <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit</button>
              <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
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

export default CourseContent;
