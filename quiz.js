const QUIZ_QUESTIONS = [
  {
    text: "What's bugging you the most right now?",
    options: [
      { label: "A device or system that's acting up — crashing, slow, or won't connect", category: "troubleshooting" },
      { label: "Security, logins, or \"who can access what\"", category: "software" },
      { label: "Spreadsheets or tracking that have turned into a mess", category: "excel" },
    ],
  },
  {
    text: "Which best describes your setup?",
    options: [
      { label: "A mix of Windows®, Linux, and Android devices that need to play nice together", category: "troubleshooting" },
      { label: "A business handling sensitive data or logins that wants tighter controls", category: "software" },
      { label: "A team buried in manual spreadsheets or ServiceNow® tickets", category: "excel" },
    ],
  },
  {
    text: "What would \"fixed\" actually look like to you?",
    options: [
      { label: "My hardware and software just work, without me thinking about it", category: "troubleshooting" },
      { label: "I know exactly who has access to what, and I'd be alerted if something's off", category: "software" },
      { label: "My data is organized, automated, and easy to report on", category: "excel" },
    ],
  },
  {
    text: "How urgent is this?",
    options: [
      { label: "Something is actively broken right now", category: "troubleshooting" },
      { label: "Nothing's on fire, but I want to get ahead of a security gap", category: "software" },
      { label: "It's more of an ongoing time-sink than an emergency", category: "excel" },
    ],
  },
  {
    text: "Where do you lose the most time?",
    options: [
      { label: "Device settings, BIOS menus, or troubleshooting steps", category: "troubleshooting" },
      { label: "Microsoft® admin centers, SIEM dashboards, or permission settings", category: "software" },
      { label: "Excel or ServiceNow®", category: "excel" },
    ],
  },
  {
    text: "Which best describes you?",
    options: [
      { label: "Individual or home user dealing with device problems", category: "troubleshooting" },
      { label: "Small business owner or IT lead worried about security", category: "software" },
      { label: "Office manager or team lead buried in spreadsheets or tickets", category: "excel" },
    ],
  },
];

const QUIZ_RESULTS = {
  troubleshooting: {
    title: "Troubleshooting Systems",
    icon: "fa-laptop-code",
    desc: "Your biggest headache right now is a device or system that just won't cooperate — slow, crashing, or refusing to connect.",
    reco: "That's squarely in the Troubleshooting Systems lane: hands-on diagnosis and fixes across Android, Windows®, and Linux, covering both hardware and software.",
  },
  software: {
    title: "Software Solutions",
    icon: "fa-shield-halved",
    desc: "You're less worried about one broken device and more about security, access, and visibility across your systems.",
    reco: "That calls for Software Solutions: Microsoft® Suite setup, zero-trust infrastructure, and SIEM monitoring so you know exactly who can access what — before it becomes a problem.",
  },
  excel: {
    title: "Excel & ServiceNow®",
    icon: "fa-table-cells",
    desc: "Your real bottleneck is manual spreadsheets, tracking, or tickets eating up time that should go to actual work.",
    reco: "That's an Excel & ServiceNow® job: custom worksheets, dashboards, account tracking, and ServiceNow® customization to take the busywork off your plate.",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const questionStep = document.getElementById("quiz-question-step");
  if (!questionStep) return;

  const questionText = document.getElementById("quiz-question-text");
  const optionsContainer = document.getElementById("quiz-options");
  const progressFill = document.getElementById("quiz-progress-fill");
  const progressLabel = document.getElementById("quiz-progress-label");
  const leadStep = document.getElementById("quiz-lead-step");
  const resultStep = document.getElementById("quiz-result-step");
  const leadForm = document.getElementById("quiz-lead-form");
  const resultField = document.getElementById("quiz-result-field");
  const resultIcon = document.getElementById("quiz-result-icon");
  const resultTitle = document.getElementById("quiz-result-title");
  const resultDesc = document.getElementById("quiz-result-desc");
  const resultReco = document.getElementById("quiz-result-reco");
  const retakeBtn = document.getElementById("quiz-retake");

  const scores = { troubleshooting: 0, software: 0, excel: 0 };
  let currentQuestion = 0;

  function showStep(step) {
    [questionStep, leadStep, resultStep].forEach((el) => el.classList.remove("active"));
    step.classList.add("active");
  }

  function renderQuestion() {
    const question = QUIZ_QUESTIONS[currentQuestion];
    questionText.textContent = question.text;
    progressFill.style.width = `${(currentQuestion / QUIZ_QUESTIONS.length) * 100}%`;
    progressLabel.textContent = `Question ${currentQuestion + 1} of ${QUIZ_QUESTIONS.length}`;

    optionsContainer.innerHTML = "";
    question.options.forEach((option) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-option";
      btn.textContent = option.label;
      btn.addEventListener("click", () => selectOption(option.category));
      optionsContainer.appendChild(btn);
    });
  }

  function selectOption(category) {
    scores[category] += 1;
    currentQuestion += 1;

    if (currentQuestion < QUIZ_QUESTIONS.length) {
      renderQuestion();
    } else {
      progressFill.style.width = "100%";
      progressLabel.textContent = "Almost done";
      showStep(leadStep);
    }
  }

  function getWinningCategory() {
    return Object.keys(scores).reduce(
      (best, category) => (scores[category] > scores[best] ? category : best),
      "troubleshooting"
    );
  }

  function showResult() {
    const result = QUIZ_RESULTS[getWinningCategory()];

    resultIcon.className = `quiz-result-icon fas ${result.icon}`;
    resultTitle.textContent = `You need: ${result.title}`;
    resultDesc.textContent = result.desc;
    resultReco.textContent = result.reco;

    showStep(resultStep);
  }

  if (leadForm) {
    leadForm.addEventListener("submit", (event) => {
      event.preventDefault();
      resultField.value = QUIZ_RESULTS[getWinningCategory()].title;

      const formData = new FormData(leadForm);
      fetch(window.location.pathname, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
        .catch((error) => console.error("quiz-leads submission error:", error))
        .finally(() => showResult());
    });
  }

  if (retakeBtn) {
    retakeBtn.addEventListener("click", () => {
      currentQuestion = 0;
      scores.troubleshooting = 0;
      scores.software = 0;
      scores.excel = 0;
      leadForm.reset();
      renderQuestion();
      showStep(questionStep);
    });
  }

  renderQuestion();
});
