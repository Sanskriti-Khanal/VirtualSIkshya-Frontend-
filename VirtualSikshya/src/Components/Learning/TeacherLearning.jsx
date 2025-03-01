import React, { useState, useEffect } from "react";
import "../../styles/learning.css";

const courses = [
    {
        name: "ST5007CEM Web Development",
        lessons: [
          {
            title: "Lesson1:HTML",
            content: "HTML (HyperText Markup Language) is the foundational language for creating and structuring content on the web. It uses various elements to define the structure of web pages, such as headings, paragraphs, images, links, lists, and forms. HTML elements are enclosed within tags, typically consisting of an opening tag (e.g., `<p>`) and a closing tag (e.g., `</p>`). The content within these tags is displayed on the webpage, and attributes can be added to provide more details about the element, such as using `href` in links or `src` in images. " +
              "An HTML document is organized with a specific structure, starting with the `<!DOCTYPE html>` declaration, followed by the `<html>` tag that wraps the entire page. The `<head>` section includes metadata, such as the document title and links to stylesheets, while the `<body>` section contains the visible content of the page. HTML works alongside CSS (Cascading Style Sheets) for design and JavaScript for interactive functionality, enabling the creation of dynamic and visually appealing webpages.In HTML, various semantic tags are used to improve both accessibility and search engine optimization (SEO). These tags, such as <header>, <footer>, <article>, and <section>, provide meaning to the content they wrap, helping search engines understand the structure of a webpage and improving navigation for users with disabilities. Additionally, HTML5 introduced a number of new elements that provide better multimedia support, such as the <video> and <audio> tags for embedding media files directly into web pages. This allows developers to build more rich, interactive, and accessible websites. HTML also supports the inclusion of forms using the <form> tag, allowing users to submit data, such as contact information, or perform actions like searching or logging into an account.The combination of HTML, CSS, and JavaScript creates the foundation for modern web development. While HTML defines the structure and content, CSS is used to apply styles such as colors, fonts, layouts, and responsiveness across different devices. JavaScript brings interactivity and dynamic behavior to web pages, enabling functions like form validation, animations, and real-time updates. This collaboration ensures that websites are not only functional but also visually appealing and user-friendly."
          },
          { title: "Lesson2:CSS Introduction", content: "CSS (Cascading Style Sheets) is used to control the appearance and layout of HTML elements. With CSS, you can style elements by modifying properties like color, font size, margins, padding, borders, and positioning. CSS allows web developers to separate content (HTML) from design (styling), making it easier to maintain and update websites. CSS is typically added in three ways: inline (within the HTML element), internal (inside a style tag in the head), or external (through a linked stylesheet). A simple CSS rule looks like this: selector { property: value; }. For example, h1 { color: blue; } will make all h1 elements blue.CSS, you can style elements by modifying properties like color, font size, margins, padding, borders, and positioning. CSS allows web developers to separate content (HTML) from design (styling), making it easier to maintain and update websites. CSS is typically added in three ways: inline (within the HTML element), internal (inside a style tag in the head), or external (through a linked stylesheet). A simple CSS rule looks like this: selector { property: value; }. For example, h1 { color: blue; } will make all h1 elements blue."+

"In CSS, selectors are used to target HTML elements, and there are various types of selectors such as class selectors (denoted by a period .), ID selectors (denoted by a #), and element selectors (such as div, p, etc.). CSS also supports layout techniques like Flexbox and Grid, which provide more control over the positioning and arrangement of elements on a page."
 },
          { title: "Lesson3:Javascript", content: "JavaScript is a programming language used to create interactive and dynamic content on webpages. It allows developers to manipulate HTML and CSS to change the content, structure, and style of a page in response to user actions, such as clicks, form submissions, or keyboard inputs." },
        ],
      },
      
  {
    name: "ST4005CEM Database System",
    lessons: [
      { title: "Lesson 1: Database Management System", content: "A Database Management System (DBMS) enables users to perform various tasks such as data definition, data manipulation, and transaction management.A Database Management System (DBMS) enables users to perform various tasks such as data definition, where users can create and specify structures like tables, data types, constraints, and table relationships. It also allows data manipulation, providing instructions to insert, retrieve, update, and delete data through queries. DBMS enforces data integrity by setting standards and constraints that ensure data accuracy and consistency. It manages transactions, ensuring that operations are executed reliably with ACID properties (Atomicity, Consistency, Isolation, Durability). Concurrency control is another essential feature, ensuring that multiple users can access and interact with the database without conflicts, maintaining consistency. Users can query the database using languages like SQL for reporting and data retrieval. DBMS also secures data through user authentication, authorization, and encryption, preventing unauthorized access. Backup and recovery mechanisms ensure data protection, while performance optimization tools enhance the system’s efficiency. Additionally, DBMS supports scalability and high availability, enabling the system to grow and maintain uptime through features like replication and clustering. The pros of DBMS include controlling database redundancy, facilitating data sharing, easy maintenance, reducing time for operations, providing regular backups, and offering multiple user interfaces. However, the costs associated with hardware and software specifications for DBMS can be significant, depending on the features and scale of the system." },
      { title: "Lesson 2: Introduction to Relational Database Management System", content: "A Relational Database Management System (RDBMS) is an advanced database management system that stores and organizes data in tables, using rows (tuples) and columns (attributes).A Relational Database Management System (RDBMS) is an advanced database management system that stores and organizes data in tables, using rows (tuples) and columns (attributes). It handles data efficiently and ensures better productivity, innovation, and speed than traditional DBMS. RDBMS addresses data redundancy, enforces database integrity, and supports relationships between tables. It utilizes Structured Query Language (SQL) for querying and managing data and complies with the ACID properties—Atomicity, Consistency, Isolation, and Durability—to ensure reliable transaction processing. RDBMS systems offer flexibility, automation, and security features like user permissions and encryption. They are highly scalable, supporting both vertical and horizontal expansion to meet growing data demands. Common examples of RDBMS include IBM, MySQL, Oracle, and Microsoft SQLServer." },
    ],
  },
  {
    name: "ST4004CEM Computer Architecture And Networks",
    lessons: [
      { title: "Lesson 1: Introduction to Computer Architecture and Operating System", content: "Computer architecture refers to the design and organization of the components that make up a computer system.Computer architecture refers to the design and structure of a computer system, encompassing both the physical hardware components and the way they interact with each other. At its core, computer architecture focuses on the processor, memory, input/output (I/O) systems, and data paths that enable the execution of tasks. The central component of computer architecture is the central processing unit (CPU), which is responsible for executing instructions, processing data, and controlling the flow of information. Memory management, including the use of registers, cache, and main memory (RAM), is also a crucial part of the architecture, as it determines how efficiently data is accessed and processed."+

"On the other hand, the operating system (OS) is the software that acts as an intermediary between the computer hardware and the user, enabling the hardware to function in a way that is accessible to humans. It manages the computer's resources, such as the CPU, memory, and storage devices, ensuring that tasks are executed efficiently. The operating system handles various critical functions, including process management (starting, stopping, and scheduling processes), memory management (allocating and deallocating memory), file system management (organizing and storing files), and device management (coordinating input and output devices). The OS ensures that the computer operates smoothly by managing the execution of software programs and providing an environment in which applications can run effectively." },
    ],
  },
];

const CourseDetails = () => {
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [selectedLesson, setSelectedLesson] = useState(courses[0].lessons[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setSelectedLesson(course.lessons[0]);
  };

  const handleEditClick = () => {
    setEditedContent(selectedLesson.content);
    setIsEditing(true);
  };

  const handleSave = () => {
    setSelectedLesson((prevLesson) => ({ ...prevLesson, content: editedContent }));
    setIsEditing(false);
  };

  return (
    <div className="main-container">
      <div className="course-sidebar">
        {courses.map((course, index) => (
          <div key={index} className="course-item" onClick={() => handleCourseClick(course)}>
            {course.name}
          </div>
        ))}
      </div>
      {selectedCourse && (
        <div className="lesson-panel">
          <div className="lesson-header">{selectedCourse.name}</div>
          <div className="lesson-list">
            {selectedCourse.lessons.map((lesson, index) => (
              <div key={index} className={`lesson-item ${lesson.title === selectedLesson.title ? 'active' : ''}`} onClick={() => setSelectedLesson(lesson)}>
                {lesson.title}
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedLesson && (
        <div className="lesson-content">
          <div className="lesson-title">
            <h2>{selectedLesson.title} content</h2>
            <span className="edit-icon" onClick={handleEditClick}>&#9998;</span>
          </div>
          {isEditing ? (
            <div>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="edit-textarea"
              />
              <button className="save-btn" onClick={handleSave}>Save</button>
            </div>
          ) : (
            <p>{selectedLesson.content}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
