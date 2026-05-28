console.log("BUTTON CLICKED");

console.log(
document.getElementById("skillsInput").value
);

console.log(
document.getElementById("roleSelect").value
);
// ==========================
// ROLE SKILLS DATABASE
// ==========================

const roleSkills = {

  frontend: [
    "HTML","CSS","JavaScript","React","Git"
  ],

  backend: [
    "Node.js","Express","MongoDB","API","Git"
  ],

  fullstack: [
    "HTML","CSS","JavaScript","React",
    "Node.js","Express","MongoDB","Git"
  ],

  dataanalyst: [
    "Excel","SQL","Python",
    "Power BI","Statistics"
  ],

  uiux: [
    "Figma","Wireframing",
    "Prototyping","User Research",
    "Design Systems"
  ],

  aiengineer: [
    "Python","Machine Learning",
    "Deep Learning","TensorFlow",
    "Data Science"
  ],

  cybersecurity: [
    "Networking","Linux",
    "Ethical Hacking",
    "Cryptography",
    "Security Tools"
  ]
};


// ==========================
// ROLE TITLES
// ==========================

const roleTitles = {

  frontend: "Frontend Developer",

  backend: "Backend Developer",

  fullstack: "Full Stack Developer",

  dataanalyst: "Data Analyst",

  uiux: "UI/UX Designer",

  aiengineer: "AI Engineer",

  cybersecurity: "Cybersecurity Analyst"
};


// ==========================
// GLOBAL CHART VARIABLE
// ==========================

let skillChart;


// ==========================
// MAIN FUNCTION
// ==========================

function analyzeSkills() {

  // --------------------------
  // GET INPUTS
  // --------------------------

  const skillsInput =
    document
      .getElementById("skillsInput")
      .value;

  const selectedRole =
    document
      .getElementById("roleSelect")
      .value;



  // --------------------------
  // VALIDATION
  // --------------------------

  if (!skillsInput.trim()) {

    alert("Please enter skills.");

    return;

  }

  if (!roleSkills[selectedRole]) {

    alert("Please select a role.");

    return;

  }



  // --------------------------
  // CONVERT USER SKILLS
  // --------------------------

  const userSkills =
    skillsInput
      .split(",")
      .map(skill =>
        skill.trim().toLowerCase()
      )
      .filter(skill =>
        skill !== ""
      );



  // --------------------------
  // REQUIRED SKILLS
  // --------------------------

  const requiredSkills =
    roleSkills[selectedRole];



  // --------------------------
  // FIND MISSING SKILLS
  // --------------------------

  const missingSkills =
    requiredSkills.filter(skill =>

      !userSkills.includes(
        skill.toLowerCase()
      )

    );



  // --------------------------
  // COMPLETED SKILLS
  // --------------------------

  const completedSkills =
    requiredSkills.length -
    missingSkills.length;



  // --------------------------
  // READINESS %
  // --------------------------

  const readiness =
    Math.round(

      (completedSkills /
        requiredSkills.length) * 100

    );



  // --------------------------
  // SHOW RESULT SECTION
  // --------------------------

  document
    .getElementById("result")
    .classList.remove("hidden");



  // ==========================
  // LEARNING TIMELINE
  // ==========================

  let timeline = "";

  if (missingSkills.length === 0) {

    timeline =
      "You are already job-ready! 🚀";

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
    .innerText =
    timeline;



  // ==========================
  // MISSING SKILLS
  // ==========================

  const missingSkillsList =
    document.getElementById(
      "missingSkills"
    );

  // CLEAR OLD DATA

  missingSkillsList.innerHTML = "";



  if (missingSkills.length === 0) {

    missingSkillsList.innerHTML =
      "<li>No missing skills 🎉</li>";

  }

  else {

    missingSkills.forEach(skill => {

      const li =
        document.createElement("li");

      li.innerText = skill;

      missingSkillsList
        .appendChild(li);

    });

  }



  // ==========================
  // PERSONALIZED FLOWCHART
  // ==========================

  const flowchart =
    document.getElementById(
      "flowchart"
    );

  // CLEAR OLD FLOWCHART

  flowchart.innerHTML = "";



  if (missingSkills.length === 0) {

    const step =
      document.createElement("div");

    step.classList.add(
      "flow-step"
    );

    step.innerText =
      "Job Ready 🚀";

    flowchart
      .appendChild(step);

  }

  else {

    missingSkills.forEach(
      (skill, index) => {

        const step =
          document.createElement("div");

        step.classList.add(
          "flow-step"
        );

        step.innerText =
          skill;

        flowchart
          .appendChild(step);



        if (
          index <
          missingSkills.length - 1
        ) {

          const arrow =
            document.createElement("div");

          arrow.classList.add(
            "arrow"
          );

          arrow.innerHTML =
            "➜";

          flowchart
            .appendChild(arrow);

        }

      });

  }



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
      Math.round(

        (matchedSkills.length /
          skillsForRole.length) * 100

      );



    recommendations.push({

      role: roleName,

      percentage: matchPercentage

    });

  }



  // SORT DESCENDING

  recommendations.sort(
    (a, b) =>
      b.percentage -
      a.percentage
  );



  // DISPLAY TOP 3

  const recommendationList =
    document.getElementById(
      "careerRecommendations"
    );

  recommendationList.innerHTML =
    "";



  recommendations
    .slice(0,3)
    .forEach(item => {

      const li =
        document.createElement("li");

      li.innerText =

        `${roleTitles[item.role]} - ${item.percentage}% Match`;

      recommendationList
        .appendChild(li);

    });



  // ==========================
  // DOUGHNUT CHART
  // ==========================

  const ctx =
    document
      .getElementById("skillChart")
      .getContext("2d");



  // DESTROY OLD CHART

  if (skillChart) {

    skillChart.destroy();

  }



  // CREATE NEW CHART

  skillChart =
    new Chart(ctx, {

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