const roleSkills = {

  frontend: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Git"
  ],

  backend: [
    "Node.js",
    "Express",
    "MongoDB",
    "API",
    "Git"
  ],

  fullstack: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Git"
  ],
  dataAnalyst: [
    "Excel",
    "SQL",
    "Python",
    "Power BI",
    "Statistics",
  ],
  uiux: [
    "Figma",
    "Wireframing",
    "Prototyping",
    "User Research",
    "Design Systems",
  ],

  aiengineer: [
    "Python",
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "Data Science"
  ],

  cybersecurity: [
    "Networking",
    "Linux",
    "Ethical Hacking",
    "Cryptography",
    "Security Tools"
  ]
};

let skillChart;

function analyzeSkills() {

  const skillsInput = document
    .getElementById("skillsInput")
    .value;

  const role = document
    .getElementById("roleSelect")
    .value;

  // Convert user input into clean array
  const userSkills = [...new Set(
    skillsInput
      .split(",")
      .map(skill =>
        skill.trim().toLowerCase()
      )
  )];

  const requiredSkills = roleSkills[role];

  // Find missing skills
  const missingSkills = requiredSkills.filter(
    skill =>
      !userSkills.includes(
        skill.toLowerCase()
      )
  );

  // Calculate completed skills
  const completedSkills =
    requiredSkills.length -
    missingSkills.length;

  // Calculate readiness %
  const readiness =
    (completedSkills /
      requiredSkills.length) * 100;

  // Show result section
  document
    .getElementById("result")
    .classList.remove("hidden");

  // Show readiness %
  document.getElementById(
    "readiness"
  ).innerText =
    `Job Readiness: ${readiness.toFixed(0)}%`;

  // Missing skills list
  const missingSkillsList =
    document.getElementById(
      "missingSkills"
    );

  missingSkillsList.innerHTML = "";

  missingSkills.forEach(skill => {

    const li =
      document.createElement("li");

    li.innerText = skill;

    missingSkillsList.appendChild(li);

  });

  // Roadmap section
  const roadmapList =
    document.getElementById(
      "roadmap"
    );

  roadmapList.innerHTML = "";

  missingSkills.forEach(skill => {

    const li =
      document.createElement("li");

    li.innerText = `Learn ${skill}`;

    roadmapList.appendChild(li);

  });

  // Chart section
  const ctx = document
    .getElementById("skillChart")
    .getContext("2d");

  // Destroy old chart
  if (skillChart) {
    skillChart.destroy();
  }

  // Create new chart
  skillChart = new Chart(ctx, {

    type: "doughnut",

    data: {

      labels: [
        "Completed Skills",
        "Missing Skills"
      ],

      datasets: [{
        data: [
          completedSkills,
          missingSkills.length
        ],

        backgroundColor: [
          "#22c55e",
          "#ef4444"
        ],

        borderWidth: 1
      }]
    },

    options: {

      responsive: true,

      plugins: {
        legend: {
          labels: {
            color: "white"
          }
        }
      }
    }
  });

}