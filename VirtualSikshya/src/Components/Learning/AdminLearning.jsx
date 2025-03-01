// import React, { useState, useEffect } from "react";
// import { courseAPI } from "../../api/api"; // Import the API calls
// import "../../styles/learning.css";

// const CourseContent = ({ userRole }) => {
//     const [selectedModule, setSelectedModule] = useState(null);
//     const [selectedContent, setSelectedContent] = useState(null);
//     const [courseModules, setCourseModules] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
    
//     const [editMode, setEditMode] = useState(false);
//     const [editedTitle, setEditedTitle] = useState('');
//     const [newModuleTitle, setNewModuleTitle] = useState('');
//     const [newContentTitle, setNewContentTitle] = useState('');
//     const [contentText, setContentText] = useState('');

//     // Fetch courses from the backend when the component mounts
//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 const response = await courseAPI.getAllCourses(); 
//                 setCourseModules(response.data); // Set state with the fetched courses
//                 setLoading(false);
//             } catch (err) {
//                 setError("Failed to fetch courses.");
//                 setLoading(false);
//             }
//         };
//         fetchCourses();
//     }, []);

//     // Function to handle course deletion
//     // const handleDeleteCourse = async (courseId) => {
//     //     const confirmDelete = window.confirm("Are you sure you want to delete this course?");
//     //     if (!confirmDelete) return; // Exit if user cancels

//     //     try {
//     //         await courseAPI.deleteCourse(courseId);
//     //         setCourseModules(courseModules.filter(module => module.courseId !== courseId)); // Update UI
//     //     } catch (error) {
//     //         console.error("Failed to delete course:", error);
//     //         setError("Failed to delete course.");
//     //     }
//     // };
//     const handleDeleteCourse = async (courseId) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this course?");
//         if (!confirmDelete) return; // Exit if user cancels
    
//         try {
//             const response = await courseAPI.deleteCourse(courseId);
//             console.log("Delete API Response:", response); // Log response to check if it's working
    
//             // Ensure API response is successful before updating state
//             if (response.status === 200 || response.status === 204) {
//                 setCourseModules(prevModules => prevModules.filter(module => module.courseId !== courseId));
//             } else {
//                 console.error("Unexpected API response:", response);
//                 setError("Failed to delete course.");
//             }
//         } catch (error) {
//             console.error("Delete course error:", error.response ? error.response.data : error.message);
//             setError("Failed to delete course.");
//         }
//     };
    
//     // Function to create a new module (Course)
//     const handleCreateModule = async () => {
//         if (newModuleTitle.trim() !== '') {
//             try {
//                 const response = await courseAPI.createCourse({
//                     title: newModuleTitle,
//                     description: "New module added",
//                     category: "General",
//                 });

//                 setCourseModules([...courseModules, response.data.course]);
//                 setNewModuleTitle('');
//             } catch (error) {
//                 console.error("Failed to create course:", error);
//                 setError("Failed to create course.");
//             }
//         }
//     };

//     return (
//         <div className="learning-portal">
//             <div className="module-list">
//                 <h2>Course Modules</h2>

//                 {loading ? (
//                     <p>Loading courses...</p>
//                 ) : error ? (
//                     <p className="error">{error}</p>
//                 ) : courseModules.length > 0 ? (
//                     courseModules.map((module) => (
//                         <div
//                             key={module.courseId}
//                             className={`module-item ${selectedModule?.courseId === module.courseId ? 'active' : ''}`}
//                             onClick={() => setSelectedModule(module)}
//                         >
//                             <div className="module-header">
//                                 <h3>{module.title}</h3>
//                                 <button 
//                                     className="btn btn-danger btn-sm"
//                                     onClick={(e) => {
//                                         e.stopPropagation(); // Prevent parent click event
//                                         handleDeleteCourse(module.courseId);
//                                     }}
//                                 >
//                                     🗑 Delete
//                                 </button>
//                             </div>
                            
//                             {selectedModule?.courseId === module.courseId && (
//                                 <div className="content-list">
//                                     {module.contents && module.contents.length > 0 ? (
//                                         module.contents.map((content) => (
//                                             <div
//                                                 key={content.id}
//                                                 className={`content-item ${selectedContent?.id === content.id ? 'active' : ''}`}
//                                                 onClick={(e) => {
//                                                     e.stopPropagation();
//                                                     setSelectedContent(content);
//                                                     setEditMode(false);
//                                                     setEditedTitle(content.title);
//                                                     setContentText(content.contentText);
//                                                 }}
//                                             >
//                                                 <span className="content-title">{content.title}</span>
//                                             </div>
//                                         ))
//                                     ) : (
//                                         <p>No content available for this course.</p>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     ))
//                 ) : (
//                     <p>No courses available.</p>
//                 )}

//                 {/* Add Module Button */}
//                 <div className="add-module">
//                     <input
//                         type="text"
//                         placeholder="New Module Title"
//                         value={newModuleTitle}
//                         onChange={(e) => setNewModuleTitle(e.target.value)}
//                         className="input-field"
//                     />
//                     <button onClick={handleCreateModule} className="btn btn-primary">
//                         Add Module
//                     </button>
//                 </div>
//             </div>

//             <div className="content-display">
//                 {selectedContent && (
//                     <div>
//                         {editMode ? (
//                             <div className="edit-content">
//                                 <input
//                                     type="text"
//                                     value={editedTitle}
//                                     onChange={(e) => setEditedTitle(e.target.value)}
//                                     className="input-field"
//                                 />
//                                 <textarea
//                                     value={contentText}
//                                     onChange={(e) => setContentText(e.target.value)}
//                                     placeholder="Enter content text here..."
//                                     className="input-field"
//                                     rows="5"
//                                 />
//                                 <button className="btn btn-primary" onClick={handleEdit}>
//                                     Save
//                                 </button>
//                                 <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
//                                     Cancel
//                                 </button>
//                             </div>
//                         ) : (
//                             <div className="content-viewer text-viewer">
//                                 <h4>{selectedContent.title}</h4>
//                                 <p>{selectedContent.contentText || "No content available."}</p>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CourseContent;
import React, { useState } from "react";
import "../../styles/learning.css";

const courses = [
  {
    name: "Course 1",
    lessons: [
      { title: "Lesson1", content: "Lesson1 content details..." },
      { title: "Lesson2", content: "Lesson2 content details..." },
      { title: "Lesson3", content: "Lesson3 content details..." },
    ],
  },
  {
    name: "Course 2",
    lessons: [
      { title: "Lesson1", content: "Lesson1 content details for Course 2..." },
      { title: "Lesson2", content: "Lesson2 content details for Course 2..." },
    ],
  },
  {
    name: "Course 3",
    lessons: [
      { title: "Lesson1", content: "Lesson1 content details for Course 3..." },
    ],
  },
];

const CourseDetails = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  return (
    <div className="main-container">
      <div className="course-sidebar">
        {courses.map((course, index) => (
          <div key={index} className="course-item" onClick={() => setSelectedCourse(course)}>
            {course.name}
          </div>
        ))}
      </div>
      {selectedCourse && (
        <div className="lesson-panel">
          <div className="lesson-header">{selectedCourse.name}</div>
          <div className="lesson-list">
            {selectedCourse.lessons.map((lesson, index) => (
              <div key={index} className="lesson-item" onClick={() => setSelectedLesson(lesson)}>
                {lesson.title}
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedLesson && (
        <div className="lesson-content">
          <h2>{selectedLesson.title} content</h2>
          <p>{selectedLesson.content}</p>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
