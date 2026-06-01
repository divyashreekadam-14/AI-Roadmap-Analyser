console.log("BUTTON CLICKED");

// ROLE SKILLS DATABASE

const roleSkills = {

  frontend:[
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Git"
  ],

  backend:[
    "Node.js",
    "Express",
    "MongoDB",
    "API",
    "Git"
  ],

  fullstack:[
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Git"
  ],

  dataanalyst:[
    "Excel",
    "SQL",
    "Python",
    "Power BI",
    "Statistics"
  ],

  uiux:[
    "Figma",
    "Wireframing",
    "Prototyping",
    "User Research",
    "Design Systems"
  ],

  aiengineer:[
    "Python",
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "Data Science"
  ],

  cybersecurity:[
    "Networking",
    "Linux",
    "Ethical Hacking",
    "Cryptography",
    "Security Tools"
  ]

};


// ROLE TITLES


const roleTitles = {

  frontend:"Frontend Developer",

  backend:"Backend Developer",

  fullstack:"Full Stack Developer",

  dataanalyst:"Data Analyst",

  uiux:"UI/UX Designer",

  aiengineer:"AI Engineer",

  cybersecurity:"Cybersecurity Analyst"

};


// GLOBAL CHART VARIABLE


let skillChart;

// CASE INSENSITIVE HELPER

function normalizeSkill(skill){

  return skill
    .trim()
    .toLowerCase()
    .replace(/\s+/g," ");

}

// AUTOCOMPLETE SUGGESTIONS

document.addEventListener(
"DOMContentLoaded",
function(){

const allSkills = [

...new Set(

Object
.values(roleSkills)
.flat()

)

];

const datalist =
document.getElementById(
"skillSuggestions"
);

if(datalist){

datalist.innerHTML="";

allSkills.forEach(skill=>{

const option =
document.createElement(
"option"
);

option.value = skill;

datalist.appendChild(
option
);

});

}

});

// MAIN ANALYZE FUNCTION


function analyzeSkills(){

// ==========================
// GET INPUTS
// ==========================

const skillsInput =
document
.getElementById("skillsInput")
.value;

const selectedRole =
document
.getElementById("roleSelect")
.value;

// VALIDATION


if(!skillsInput.trim()){

alert("Please enter skills.");

return;

}

// USER SKILLS


const userSkills =

skillsInput

.split(",")

.map(skill=>

normalizeSkill(skill)

)

.filter(skill=>

skill !== ""

);

// REQUIRED SKILLS

const requiredSkills =
roleSkills[selectedRole];



// MISSING SKILLS

const missingSkills =

requiredSkills.filter(skill=>

!userSkills.includes(

normalizeSkill(skill)

)
);
localStorage.setItem(
  "missingSkills",
  JSON.stringify(missingSkills)
);

localStorage.setItem(
  "selectedRole",
  selectedRole
);
window.currentMissingSkills =
missingSkills;

// COMPLETED SKILLS

const completedSkills =

requiredSkills.length
-
missingSkills.length;



// READINESS

const readiness =

Math.round(

(completedSkills /

requiredSkills.length)

*100

);

// SHOW RESULT

document
.getElementById("result")
.classList
.remove("hidden");

// TIMELINE

let timeline = "";

if(missingSkills.length===0){

timeline =
"You are already job-ready! 🚀";

}

else if(
missingSkills.length<=2
){

timeline =
"Estimated learning time: 1-2 months";

}

else if(
missingSkills.length<=4
){

timeline =
"Estimated learning time: 3-4 months";

}

else{

timeline =
"Estimated learning time: 5-6 months";

}

// READINESS DISPLAY

document
.getElementById("readiness")
.innerText =

`You are ${readiness}% ready for ${roleTitles[selectedRole]}`
// TIMELINE DISPLAY

document
.getElementById("timeline")
.innerText =
timeline;
// FLOWCHART

const flowchart =
document.getElementById(
"flowchart"
);

flowchart.innerHTML="";



if(
missingSkills.length===0
){

flowchart.innerHTML =

"<div class='flow-step'>Job Ready 🚀</div>";

}

else{

missingSkills.forEach(
(skill,index)=>{

const step =
document.createElement("div");

step.classList.add(
"flow-step"
);

step.innerText =
skill;

flowchart.appendChild(
step
);



if(
index <
missingSkills.length-1
){

const arrow =
document.createElement("div");

arrow.classList.add(
"arrow"
);

arrow.innerHTML="➜";

flowchart.appendChild(
arrow
);

}

});

}

// RECOMMENDATIONS

const recommendations=[];



for(
const roleName
in roleSkills
){

const skillsForRole =
roleSkills[roleName];



const matchedSkills =

skillsForRole.filter(skill=>

userSkills.includes(

normalizeSkill(skill)

)

);



const matchPercentage =

Math.round(

(matchedSkills.length /

skillsForRole.length)

*100

);



recommendations.push({

role:roleName,

percentage:
matchPercentage

});

}

// SORT RECOMMENDATIONs


recommendations.sort(

(a,b)=>

b.percentage -
a.percentage

);

// DISPLAY TOP 3

const recommendationList =

document.getElementById(
"careerRecommendations"
);

recommendationList.innerHTML="";



recommendations
.slice(0,3)

.forEach(item=>{

const li =
document.createElement("li");

li.innerText =

`${roleTitles[item.role]} - ${item.percentage}% Match`;

recommendationList
.appendChild(li);

});

// DONUT CHART

const canvas =
document.getElementById(
"skillChart"
);


if(skillChart){

skillChart.destroy();

}


canvas.width =
canvas.width;


const ctx =
canvas.getContext("2d");


skillChart =

new Chart(ctx,{

type:"doughnut",

data:{

labels:[

"Completed Skills",

"Missing Skills"

],

datasets:[{

data:[

completedSkills,

missingSkills.length

],

backgroundColor:[

"#00ff99",

"#ff4d4d"

],

borderWidth:2

}]

},

options:{

responsive:true,

plugins:{

legend:{

labels:{

color:"white"

}

}

}

}

});

}                   
            // analyzeSkills ends here

// FETCH LIVE JOBS
async function fetchJobs() {

    const roleMap = {
        frontend: "Frontend Developer",
        backend: "Backend Developer",
        fullstack: "Full Stack Developer",
        dataanalyst: "Data Analyst",
        uiux: "UI UX Designer",
        aiengineer: "AI Engineer",
        cybersecurity: "Cybersecurity Analyst"
    };

    const selectedRole =
localStorage.getItem(
    "selectedRole"
) || "frontend";

const role =
roleMap[selectedRole];

    const jobResults =
    document.getElementById("jobResults");

    jobResults.innerHTML =
    "Fetching live jobs...";

    try {

        const APP_ID = "dcd24e6a";
        const API_KEY = "8d074d70e3d330621ae1eccc1a42f50a";

        const url =
        `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${APP_ID}&app_key=${API_KEY}&results_per_page=5&what=${encodeURIComponent(role)}&content-type=application/json`;

        const response =
        await fetch(url);

        const data =
        await response.json();

        let jobsHTML = "";

        if (!data.results || data.results.length === 0) {

            jobsHTML =
            "<p>No jobs found.</p>";

        } else {

            data.results.forEach(job => {

                jobsHTML += `
                <div class="job-card">

                    <h3>${job.title}</h3>

                    <p>
                    <strong>Company:</strong>
                    ${job.company.display_name}
                    </p>

                    <p>
                    <strong>Location:</strong>
                    ${job.location.display_name}
                    </p>

                    <a href="${job.redirect_url}"
                       target="_blank">
                       Apply Now
                    </a>

                </div>
                `;

            });

        }

        jobResults.innerHTML =
        jobsHTML;

    }

    catch(error) {

        console.error(error);

        jobResults.innerHTML =
        "<p>Unable to fetch jobs. API or browser security restriction detected.</p>";
    }

}
function openJobsPage() {
  const role=
  document.getElementById("roleSelect").value;
  localStorage.setItem(
    "selectedRole",
    role
  );
    window.location.href = "jobs.html";
}

function openAITutor() {

    if (
        !window.currentMissingSkills
    ) {

        alert(
            "Please analyze your skills first."
        );

        return;
    }

    window.location.href =
    "ai-tutor.html";

}
document.addEventListener(
"DOMContentLoaded",
function(){

    const roleMap = {
        frontend:"Frontend Developer",
        backend:"Backend Developer",
        fullstack:"Full Stack Developer",
        dataanalyst:"Data Analyst",
        uiux:"UI/UX Designer",
        aiengineer:"AI Engineer",
        cybersecurity:"Cybersecurity Analyst"
    };

    const role =
    localStorage.getItem(
        "selectedRole"
    );

    const display =
    document.getElementById(
        "selectedRoleDisplay"
    );

    if(display && role){

        display.innerHTML =
        `<strong>Selected Role:</strong> ${roleMap[role]}`;

    }

});
// CUSTOM SKILL AUTOCOMPLETE

document.addEventListener("DOMContentLoaded", () => {

    const skillsInput =
    document.getElementById("skillsInput");

    const autocompleteList =
    document.getElementById("autocomplete-list");

    const allSkills = [
        ...new Set(
            Object.values(roleSkills).flat()
        )
    ];

    skillsInput.addEventListener("input", () => {

        const inputValue =
        skillsInput.value;

        const skills =
        inputValue.split(",");

        const currentSkill =
        skills[skills.length - 1]
        .trim()
        .toLowerCase();

        autocompleteList.innerHTML = "";

        if (!currentSkill) return;

        const matches =
        allSkills.filter(skill =>
            skill.toLowerCase()
            .startsWith(currentSkill)
        );

        matches.forEach(skill => {

            const item =
            document.createElement("div");

            item.classList.add(
                "autocomplete-item"
            );

            item.textContent =
            skill;

            item.addEventListener(
            "click",
            () => {

                skills[skills.length - 1] =
                " " + skill;

                skillsInput.value =
                skills.join(",");

                autocompleteList.innerHTML =
                "";

            });

            autocompleteList.appendChild(
                item
            );

        });

    });

    document.addEventListener(
    "click",
    (e) => {

        if (
            e.target !== skillsInput
        ) {

            autocompleteList.innerHTML =
            "";

        }

    });

});