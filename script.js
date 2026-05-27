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

  dataanalyst: [
    "Excel",
    "SQL",
    "Python",
    "Power BI",
    "Statistics"
  ],

  uiux: [
    "Figma",
    "Wireframing",
    "Prototyping",
    "User Research",
    "Design Systems"
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



// Career titles
const roleTitles = {

  frontend: "Frontend Developer",

  backend: "Backend Developer",

  fullstack: "Full Stack Developer",

  dataanalyst: "Data Analyst",

  uiux: "UI/UX Designer",

  aiengineer: "AI Engineer",

  cybersecurity: "Cybersecurity Analyst"
};



// Global chart variable
let skillChart;



function analyzeSkills() {

  // Get user input
  const skillsInput =
    document
      .getElementById("skillsInput")
      .value;

  const selectedRole =
    document
      .getElementById("roleSelect")
      .value;



  // Convert skills into array
  const userSkills =
    skillsInput
      .split(",")
      .map(skill =>
        skill.trim().toLowerCase()
      );



  // Get required skills
  const requiredSkills =
    roleSkills[selectedRole];



  // Missing skills
  const missingSkills =
    requiredSkills.filter(skill =>
      !userSkills.includes(
        skill.toLowerCase()
      )
    );



  // Completed skills
  const completedSkills =
    requiredSkills.length -
    missingSkills.length;



  // Readiness percentage
  const readiness =
    Math.round(
      (completedSkills /
        requiredSkills.length) * 100
    );
// Show result section
document
  .getElementById("result")
  .classList.remove("hidden");



// ==========================
// LEARNING TIMELINE
// ==========================

let timeline = "";

if (missingSkills.length === 0) {

  timeline =
    "You are already job-ready!";

}

else if (missingSkills.length <= 2) {

  timeline =
    "Estimated learning time: 1-2 months";

}

else if (missingSkills.length <= 4) {

  timeline =
    "Estimated learning time: 3-4 months";

}

else {

  timeline =
    "Estimated learning time: 5-6 months";

}



// ==========================
// SHOW READINESS
// ==========================

document
  .getElementById("readiness")
  .innerText =

  `You are ${readiness}% ready for ${roleTitles[selectedRole]}`;





// ==========================
// SHOW TIMELINE
// ==========================

document
  .getElementById("timeline")
  .innerText = timeline;





// ==========================
// SHOW MISSING SKILLS
// ==========================

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

// ==========================
// PERSONALIZED FLOWCHART
// ==========================

const flowchart =
  document.getElementById(
    "flowchart"
  );



// Clear old flowchart
flowchart.innerHTML = "";



// Create flow steps
missingSkills.forEach(
  (skill, index) => {

    // Skill box
    const step =
      document.createElement("div");

    step.classList.add(
      "flow-step"
    );

    step.innerText = skill;

    flowchart.appendChild(step);



    // Add arrow
    if (
      index <
      missingSkills.length - 1
    ) {

      const arrow =
        document.createElement("div");

      arrow.classList.add(
        "arrow"
      );

      arrow.innerHTML = "➜";

      flowchart.appendChild(
        arrow
      );
    }
});


  // ==========================
  // CAREER RECOMMENDATIONS
  // ==========================

  const recommendations = [];



  for (const roleName in roleSkills) {

    const skillsForRole =
      roleSkills[roleName];



    const matchedSkills =
      skillsForRole.filter(skill =>
        userSkills.includes(
          skill.toLowerCase()
        )
      );



    const matchPercentage =
      (matchedSkills.length /
        skillsForRole.length) * 100;



    recommendations.push({

      role: roleName,

      percentage: matchPercentage

    });
  }



  // Sort by highest match
  recommendations.sort(
    (a, b) =>
      b.percentage - a.percentage
  );



  // Display recommendations
  const recommendationList =
    document.getElementById(
      "careerRecommendations"
    );

  recommendationList.innerHTML = "";



  recommendations
    .slice(0, 3)
    .forEach(item => {

      const li =
        document.createElement("li");

      li.innerText =

        `${roleTitles[item.role]} - ${item.percentage.toFixed(0)}% Match`;

      recommendationList.appendChild(li);

    });




  // ==========================
  // DOUGHNUT CHART
  // ==========================

  const ctx =
    document
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
          "#00ff99",
          "#ff4d4d"
        ],

        borderWidth: 2

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