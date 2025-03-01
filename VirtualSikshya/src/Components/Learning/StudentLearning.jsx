import React, { useState, useEffect } from "react";
import "../../styles/learning.css";

const courses = [
    {
        name: "ST5007CEM Web Development",
        lessons: [
          {
            title: "Lesson1:HTML",
            content: "HTML (HyperText Markup Language) is the foundational language for creating and structuring content on the web. It uses various elements to define the structure of web pages, such as headings, paragraphs, images, links, lists, and forms. HTML elements are enclosed within tags, typically consisting of an opening tag (e.g., `<p>`) and a closing tag (e.g., `</p>`). The content within these tags is displayed on the webpage, and attributes can be added to provide more details about the element, such as using `href` in links or `src` in images. " +
              "An HTML document is organized with a specific structure, starting with the `<!DOCTYPE html>` declaration, followed by the `<html>` tag that wraps the entire page. The `<head>` section includes metadata, such as the document title and links to stylesheets, while the `<body>` section contains the visible content of the page. HTML works alongside CSS (Cascading Style Sheets) for design and JavaScript for interactive functionality, enabling the creation of dynamic and visually appealing webpages."+
              "HTML (HyperText Markup Language) is the foundational language for creating and structuring content on the web. It uses various elements to define the structure of web pages, such as headings, paragraphs, images, links, lists, and forms. HTML elements are enclosed within tags, typically consisting of an opening tag (e.g., <p>) and a closing tag (e.g., </p>). The content within these tags is displayed on the webpage, and attributes can be added to provide more details about the element, such as using href in links or src in images. An HTML document is organized with a specific structure, starting with the <!DOCTYPE html> declaration, followed by the <html> tag that wraps the entire page. The <head> section includes metadata, such as the document title and links to stylesheets, while the <body> section contains the visible content of the page. HTML works alongside CSS (Cascading Style Sheets) for design and JavaScript for interactive functionality, enabling the creation of dynamic and visually appealing webpages."
          },
          { title: "Lesson2:CSS Introduction", content: "CSS (Cascading Style Sheets) is used to control the appearance and layout of HTML elements. With CSS, you can style elements by modifying properties like color, font size, margins, padding, borders, and positioning. CSS allows web developers to separate content (HTML) from design (styling), making it easier to maintain and update websites. CSS is typically added in three ways: inline (within the HTML element), internal (inside a style tag in the head), or external (through a linked stylesheet). A simple CSS rule looks like this: selector { property: value; }. For example, h1 { color: blue; } will make all h1 elements blue.CSS (Cascading Style Sheets) is used to control the appearance and layout of HTML elements. With CSS, you can style elements by modifying properties like color, font size, margins, padding, borders, and positioning. CSS allows web developers to separate content (HTML) from design (styling), making it easier to maintain and update websites. CSS is typically added in three ways: inline (within the HTML element), internal (inside a style tag in the head), or external (through a linked stylesheet). A simple CSS rule looks like this: selector { property: value; }. For example, h1 { color: blue; } will make all h1 elements blue."+
            "The combination of HTML, CSS, and JavaScript creates the foundation for modern web development. While HTML defines the structure and content, CSS is used to apply styles such as colors, fonts, layouts, and responsiveness across different devices. JavaScript brings interactivity and dynamic behavior to web pages, enabling functions like form validation, animations, and real-time updates. This collaboration ensures that websites are not only functional but also visually appealing and user-friendly."
           },
          { title: "Lesson3:Javascript", content: "JavaScript is a programming language used to create interactive and dynamic content on webpages. It allows developers to manipulate HTML and CSS to change the content, structure, and style of a page in response to user actions, such as clicks, form submissions, or keyboard inputs.JavaScript is a versatile language that can handle tasks like data validation, animations, interactive maps, and even back-end operations in web development. A simple JavaScript example is: document.getElementById('myElement').innerHTML = 'Hello, World!'; which will change the content of an HTML element with the ID myElement to 'Hello, World!'.JavaScript uses variables, functions, loops, and conditional statements to handle logic and control the flow of an application. It's commonly used with other technologies like HTML and CSS to create rich user experiences. JavaScript can also interact with APIs to retrieve and display data dynamically, as seen in modern web applications. Additionally, JavaScript libraries and frameworks such as React, Angular, and Vue.js are widely used to streamline development and build complex applications efficiently." +
            "JavaScript is an event-driven, non-blocking, and asynchronous language, which means that it can handle tasks such as processing data in the background without freezing the entire webpage. This makes it particularly useful for modern web applications that require constant data updates without interrupting the user experience. JavaScript interacts with the HTML structure and the CSS styles of a webpage, allowing for the manipulation of the Document Object Model (DOM) and dynamic styling.Overall, JavaScript is a key component of web development, making websites interactive, responsive, and feature-rich. Whether it's for simple animations or complex web applications, JavaScript plays an essential role in creating dynamic user experiences."
          },
        ],
      },
      
  {
    name: "ST4005CEM Database System",
    lessons: [
      { title: "Lesson 1: Database Management System", content: "A Database Management System (DBMS) enables users to perform various tasks such as data definition, data manipulation, and transaction management.A Database Management System (DBMS) enables users to perform various tasks such as data definition, where users can create and specify structures like tables, data types, constraints, and table relationships. It also allows data manipulation, providing instructions to insert, retrieve, update, and delete data through queries. DBMS enforces data integrity by setting standards and constraints that ensure data accuracy and consistency. It manages transactions, ensuring that operations are executed reliably with ACID properties (Atomicity, Consistency, Isolation, Durability). Concurrency control is another essential feature, ensuring that multiple users can access and interact with the database without conflicts, maintaining consistency. Users can query the database using languages like SQL for reporting and data retrieval. DBMS also secures data through user authentication, authorization, and encryption, preventing unauthorized access. Backup and recovery mechanisms ensure data protection, while performance optimization tools enhance the system’s efficiency. Additionally, DBMS supports scalability and high availability, enabling the system to grow and maintain uptime through features like replication and clustering. The pros of DBMS include controlling database redundancy, facilitating data sharing, easy maintenance, reducing time for operations, providing regular backups, and offering multiple user interfaces. However, the costs associated with hardware and software specifications for DBMS can be significant, depending on the features and scale of the system." },
      { title: "Lesson 2: Introduction to Relational Database Management System", content: "A Relational Database Management System (RDBMS) is an advanced database management system that stores and organizes data in tables, using rows (tuples) and columns (attributes).It handles data efficiently and ensures better productivity, innovation, and speed than traditional DBMS. RDBMS addresses data redundancy, enforces database integrity, and supports relationships between tables. It utilizes Structured Query Language (SQL) for querying and managing data and complies with the ACID properties—Atomicity, Consistency, Isolation, and Durability—to ensure reliable transaction processing. RDBMS systems offer flexibility, automation, and security features like user permissions and encryption. They are highly scalable, supporting both vertical and horizontal expansion to meet growing data demands. Common examples of RDBMS include IBM, MySQL, Oracle, and Microsoft SQLServer.The key advantages of RDBMS include maintaining data integrity through constraints, ensuring ACID compliance for dependable transactions, offering flexible querying with SQL, providing scalability, enhancing data security, ensuring data consistency through transaction support, and offering data independence. RDBMS systems also support normalization to reduce data redundancy and improve integrity. However, they come with challenges such as complexity in design and management, high costs for licensing and infrastructure, performance overhead with complex queries, and difficulties in scaling for large datasets. Additionally, RDBMS systems have rigid schemas, may lead to vendor lock-in, and offer limited support for unstructured data like images or videos. They can also present a single point of failure unless designed for high availability." },
    ],
  },
  {
    name: "ST4004CEM Computer Architecture And Networks",
    lessons: [
      { title: "Lesson 1: Introduction to Computer Architecture and Operating System", content: "Computer architecture refers to the design and organization of the components that make up a computer system.It includes the hardware, such as the central processing unit (CPU), memory, storage devices, and input/output devices, which work together to execute instructions. The architecture of a computer determines how data is processed, stored, and transmitted within the system, influencing its overall performance. Key components of computer architecture include the CPU, which performs calculations and executes instructions, memory (RAM), which temporarily stores data for fast access, and storage devices (such as hard drives or SSDs), which retain data long-term. Additionally, buses, which are pathways for data transfer between components, play a crucial role in computer architecture.An operating system (OS) is system software that manages computer hardware and software resources, providing a stable environment for users and applications. It acts as an intermediary between the user and the computer hardware. The OS performs essential tasks such as process management (handling multiple running programs), memory management (allocating and managing memory), file management (organizing and accessing data on storage devices), and device management (coordinating input/output operations). Examples of popular operating systems include Microsoft Windows, macOS, and Linux. The OS ensures that various programs and users running on the system can share resources without conflicts, providing a user-friendly interface to interact with the computer while optimizing system performance." },
    ],
  },
];

const CourseDetails = () => {
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [selectedLesson, setSelectedLesson] = useState(courses[0].lessons[0]);

  useEffect(() => {
    setSelectedLesson(selectedCourse.lessons[0]);
  }, [selectedCourse]);

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
              <div key={index} className={`lesson-item ${lesson.title === selectedLesson.title ? 'active' : ''}`} onClick={() => setSelectedLesson(lesson)}>
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
