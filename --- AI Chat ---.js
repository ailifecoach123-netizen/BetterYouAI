// --- AI Chat ---
function sendMessage() {
  let input = document.getElementById("userInput").value;
  let messages = document.getElementById("messages");

  let userBubble = document.createElement("div");
  userBubble.className = "user";
  userBubble.innerText = input;
  messages.appendChild(userBubble);

  // Call AI API directly (OpenAI example)
  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY", // replace with your key
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: "You are BetterYou AI, a motivational life coach."},
        {role: "user", content: input}
      ]
    })
  })
  .then(res => res.json())
  .then(data => {
    let aiBubble = document.createElement("div");
    aiBubble.className = "ai";
    aiBubble.innerText = data.choices[0].message.content;
    messages.appendChild(aiBubble);
  });

  document.getElementById("userInput").value = "";
}

// --- Quick Actions ---
function showGoals() {
  fetch("goals.json")
    .then(res => res.json())
    .then(goals => {
      let dashboard = document.getElementById("dashboard");
      dashboard.innerHTML = "<h3>Daily Goals</h3>";
      goals.forEach(goal => {
        dashboard.innerHTML += `
          <div class="goal">
            <b>${goal.name}</b> - ${goal.description} 
            [${goal.difficulty}] XP: ${goal.xp}
          </div>`;
      });
    });
}

function generateGoal() {
  fetch("goals.json")
    .then(res => res.json())
    .then(goals => {
      let random = goals[Math.floor(Math.random() * goals.length)];
      let dashboard = document.getElementById("dashboard");
      dashboard.innerHTML = `<h3>Random Goal</h3>
        <p>${random.name} - XP: ${random.xp}</p>`;
    });
}

function motivateMe() {
  let dashboard = document.getElementById("dashboard");
  dashboard.innerHTML = "<h3>Motivation</h3><p>You’ve got this! Keep pushing 🚀</p>";
}

function weeklyXP() {
  let dashboard = document.getElementById("dashboard");
  dashboard.innerHTML = "<h3>Weekly XP</h3><p>XP Progress: 120/500</p>";
}

function showProfile() {
  let profile = document.getElementById("profile");
  profile.innerHTML = "<h3>Profile</h3><p>Name: User<br>Level: 2<br>Total XP: 250</p>";
}