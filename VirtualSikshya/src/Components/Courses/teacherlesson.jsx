import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaCheck } from "react-icons/fa";
import "../../styles/lessonForm.css";

const Courses = () => {
    const [courses, setCourses] = useState([
        {
            id: 1,
            name: "COURSE 1:ST5007CEM Web Development",
            lessons: ["Lesson1:HTML", "Lesson2:CSS Introduction", "Lesson3:Javascript"],
        },
        {
            id: 2,
            name: "ST4005CEM Database System",
            lessons: ["Lesson 1: Database Management System"
                , "Lesson 2: Introduction to Relational Database Management System"],
        },
        {
            id: 3,
            name: "ST4004CEM Computer Architecture And Networks",
            lessons: ["Lesson 1: Introduction to Computer Architecture and Operating System"],
        },
    ]);

    const [editingLesson, setEditingLesson] = useState(null);
    const [lessonText, setLessonText] = useState("");

    const addLesson = (courseId) => {
        setCourses((prevCourses) =>
            prevCourses.map((course) =>
                course.id === courseId
                    ? { ...course, lessons: [...course.lessons, `Lesson ${course.lessons.length + 1}`] }
                    : course
            )
        );
    };

    const editLesson = (courseId, index, lesson) => {
        setEditingLesson({ courseId, index });
        setLessonText(lesson);
    };

    const saveLesson = (courseId, index) => {
        setCourses((prevCourses) =>
            prevCourses.map((course) =>
                course.id === courseId
                    ? {
                        ...course,
                        lessons: course.lessons.map((lesson, i) => (i === index ? lessonText : lesson)),
                    }
                    : course
            )
        );
        setEditingLesson(null);
    };

    const deleteCourse = (courseId) => {
        setCourses(courses.filter((course) => course.id !== courseId));
    };

    return (
        <div className="courses-container">
            <div className="header">COURSES</div>
            {courses.map((course) => (
                <div key={course.id} className="course-card">
                    <div className="course-header">
                        <span className="course-title">{course.name}</span>
                        <div className="actions">
                            <FaEdit className="icon" />
                            <FaTrash className="icon delete" onClick={() => deleteCourse(course.id)} />
                        </div>
                    </div>
                    <div className="teacher-name">{course.teacher}</div>
                    <div className="lesson-list">
                        {course.lessons.map((lesson, index) => (
                            <div key={index} className="lesson-item">
                                {editingLesson && editingLesson.courseId === course.id && editingLesson.index === index ? (
                                    <input
                                        type="text"
                                        value={lessonText}
                                        onChange={(e) => setLessonText(e.target.value)}
                                        className="lesson-input"
                                    />
                                ) : (
                                    <span>{lesson}</span>
                                )}
                                {editingLesson && editingLesson.courseId === course.id && editingLesson.index === index ? (
                                    <FaCheck className="icon save" onClick={() => saveLesson(course.id, index)} />
                                ) : (
                                    <FaEdit className="icon edit" onClick={() => editLesson(course.id, index, lesson)} />
                                )}
                            </div>
                        ))}
                        <button className="add-lesson" onClick={() => addLesson(course.id)}>
                            <FaPlus className="icon plus" /> Add Lesson
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Courses;
