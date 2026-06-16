// Daily learning tasks for different skills
const tutorContent = {
    "HTML": {
        time: "20 minutes",
        task: "Create a personal portfolio page using HTML."
    },

    "CSS": {
        time: "30 minutes",
        task: "Design a responsive landing page."
    },

    "JavaScript": {
        time: "45 minutes",
        task: "Build a To-Do List application."
    },

    "React": {
        time: "45 minutes",
        task: "Build a React Counter App."
    },

    "Git": {
        time: "20 minutes",
        task: "Create a GitHub repository and push code."
    },

    "Node.js": {
        time: "45 minutes",
        task: "Create a basic REST API using Node.js."
    },

    "Express": {
        time: "40 minutes",
        task: "Build CRUD routes using Express."
    },

    "MongoDB": {
        time: "45 minutes",
        task: "Create a database and perform CRUD operations."
    },

    "API": {
        time: "30 minutes",
        task: "Fetch and display data from a public API."
    },

    "Excel": {
        time: "30 minutes",
        task: "Analyze a sales dataset using formulas and charts."
    },

    "SQL": {
        time: "45 minutes",
        task: "Write 10 SELECT, JOIN, and GROUP BY queries."
    },

    "Python": {
        time: "45 minutes",
        task: "Solve 5 Python programming problems."
    },

    "Power BI": {
        time: "60 minutes",
        task: "Create a sales dashboard using Power BI."
    },

    "Statistics": {
        time: "40 minutes",
        task: "Practice mean, median, mode, and standard deviation problems."
    },

    "Figma": {
        time: "45 minutes",
        task: "Design a mobile app interface in Figma."
    },

    "Wireframing": {
        time: "30 minutes",
        task: "Create wireframes for an e-commerce website."
    },

    "Prototyping": {
        time: "40 minutes",
        task: "Build a clickable prototype in Figma."
    },

    "User Research": {
        time: "35 minutes",
        task: "Prepare a user survey and analyze responses."
    },

    "Design Systems": {
        time: "45 minutes",
        task: "Create reusable UI components and style guides."
    },

    "Machine Learning": {
        time: "60 minutes",
        task: "Train a simple prediction model using Python."
    },

    "Deep Learning": {
        time: "75 minutes",
        task: "Build a basic neural network."
    },

    "TensorFlow": {
        time: "60 minutes",
        task: "Create and train a TensorFlow model."
    },

    "Data Science": {
        time: "60 minutes",
        task: "Analyze and visualize a real-world dataset."
    },

    "Networking": {
        time: "45 minutes",
        task: "Learn OSI and TCP/IP models and create notes."
    },

    "Linux": {
        time: "45 minutes",
        task: "Practice 20 important Linux commands."
    },

    "Ethical Hacking": {
        time: "60 minutes",
        task: "Understand common vulnerabilities in a safe lab environment."
    },

    "Cryptography": {
        time: "50 minutes",
        task: "Study hashing, encryption, and decryption concepts."
    },

    "Security Tools": {
        time: "45 minutes",
        task: "Explore common cybersecurity tools and their purposes."
    }
};

// Get data from localStorage
const missingSkills = JSON.parse(localStorage.getItem("missingSkills")) || [];
const selectedRole = localStorage.getItem("selectedRole");

// Get HTML elements
const roleTitle = document.getElementById("roleTitle");
const skillList = document.getElementById("missingSkillsList");
const roadmap = document.getElementById("roadmap");
const dailyTask = document.getElementById("dailyTask");

// Display role title
roleTitle.innerText = selectedRole
    ? `${selectedRole} AI Tutor`
    : "AI Tutor";

// Display missing skills
if (missingSkills.length > 0) {

    missingSkills.forEach(skill => {
        const li = document.createElement("li");
        li.innerText = skill;
        skillList.appendChild(li);
    });

} else {

    skillList.innerHTML =
        "<li>No missing skills found. You are job-ready! 🚀</li>";

}

// Generate learning roadmap
if (missingSkills.length > 0) {

    missingSkills.forEach((skill, index) => {

        const div = document.createElement("div");

        div.classList.add("roadmap-step");

        div.innerHTML = `
            <h4>Week ${index + 1}</h4>
            <p>Learn ${skill}</p>
        `;

        roadmap.appendChild(div);

    });

} else {

    roadmap.innerHTML =
        "<p>No roadmap required. Keep practicing and applying for jobs! 🎉</p>";

}

// Generate daily task
if (missingSkills.length > 0) {

    const skill = missingSkills[0];

    const lesson = tutorContent[skill] || {
        time: "30 minutes",
        task: `Practice ${skill} through projects and tutorials.`
    };

    dailyTask.innerHTML = `
        <h4>Today's Focus: ${skill}</h4>

        <p>
            <strong>Study Time:</strong>
            ${lesson.time}
        </p>

        <p>
            <strong>Task:</strong>
            ${lesson.task}
        </p>
    `;

} else {

    dailyTask.innerHTML = `
        <h3>You are Job Ready 🚀</h3>
        <p>Continue building projects and preparing for interviews.</p>
    `;

}

// Navigation functions
function goBack() {
    window.location.href = "index.html";
}

function goJobs() {
    window.location.href = "jobs.html";
}