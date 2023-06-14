// PARAMETERS
const practice_reps_per_side = 1; // 3
const test_reps_per_item = 2; // 20
const fixation_duration = 500;
const blank_duration = 500;
const response_window = 1000;
const too_slow_duration = 1500;

const jsPsych = initJsPsych({});

const timeline = [];

const preload = {
  type: jsPsychPreload,
  images: ["img/heart.png", "img/flower.png"],
  save_trial_parameters: {
    success: false,
    timeout: false,
    failed_images: false,
    failed_video: false,
    failed_audio: false,
  },
};

const heart_instructions = {
  timeline: [
    {
      type: jsPsychHtmlButtonResponse,
      stimulus: `<div class="instructions">
        <p>This is an activity to study attention.</p>
        <p>When you are ready for the instructions, press the button below.</p>
      </div>`,
      choices: ["Continue"],
      button_html:
        '<button class="jspsych-btn instructions-btn">%choice%</button>',
    },
    {
      type: jsPsychHtmlButtonResponse,
      stimulus: `<div class="instructions">
        <p class="instructions-float">In this task, you're going to see a number of hearts and flowers in the box below.</p>
        <div class="heart-flower-stim">
        </div>
      </div>`,
      choices: ["Continue"],
      button_html:
        '<button class="jspsych-btn instructions-btn">%choice%</button>',
    },
    {
      type: jsPsychHtmlButtonResponse,
      stimulus: `<div class="instructions">
        <p class="instructions-float">When you see a heart, press the button at the bottom of screen that is on the SAME side as the heart.</p>
        <div class="heart-flower-stim heart-flower-left">
          <img src="img/heart.png" />
        </div>
      </div>
      <button disabled class="jspsych-btn touch-btn touch-btn-right-fake"></button>`,
      choices: [""],
      button_html: [
        '<button class="jspsych-btn touch-btn touch-btn-left"></button>',
      ],
    },
    {
      type: jsPsychHtmlButtonResponse,
      stimulus: `<div class="instructions">
        <p class="instructions-float">When you see a heart, press the button at the bottom of screen that is on the SAME side as the heart.</p>
        <div class="heart-flower-stim heart-flower-right">
          <img src="img/heart.png" />
        </div>
      </div>
      <button disabled class="jspsych-btn touch-btn touch-btn-left-fake"></button>`,
      choices: [""],
      button_html: [
        '<button class="jspsych-btn touch-btn touch-btn-right"></button>',
      ],
    },
    {
      type: jsPsychHtmlButtonResponse,
      stimulus: `<div class="instructions">
        <p class="instructions-float">Very good. Try it a few more times - it goes pretty quickly.</p>
        <div class="heart-flower-stim">
        </div>
      </div>`,
      choices: ["Continue"],
      button_html:
        '<button class="jspsych-btn instructions-btn">%choice%</button>',
    },
  ],
  save_trial_parameters: {
    stimulus: false,
  },
  data: {
    phase: "heart-instructions",
  },
};

const flower_instructions = {
  timeline: [
    {
      type: jsPsychHtmlButtonResponse,
      stimulus: `<div class="instructions">
        <p class="instructions-float">Great!</p>
        <div class="heart-flower-stim">
        </div>
      </div>`,
      choices: ["Continue"],
      button_html:
        '<button class="jspsych-btn instructions-btn">%choice%</button>',
    },
    {
      type: jsPsychHtmlButtonResponse,
      stimulus: `<div class="instructions">
        <p class="instructions-float">When you see a FLOWER, press the button at the bottom of screen that is on the OPPOSITE side as the flower.</p>
        <div class="heart-flower-stim heart-flower-left">
          <img src="img/flower.png" />
        </div>
      </div>
      <button disabled class="jspsych-btn touch-btn touch-btn-left-fake"></button>
      `,
      choices: [""],
      button_html: [
        '<button class="jspsych-btn touch-btn touch-btn-right"></button>',
      ],
    },
    {
      type: jsPsychHtmlButtonResponse,
      stimulus: `<div class="instructions">
        <p class="instructions-float">When you see a FLOWER, press the button at the bottom of screen that is on the OPPOSITE side as the flower.</p>
        <div class="heart-flower-stim heart-flower-right">
          <img src="img/flower.png" />
        </div>
      </div>
      <button disabled class="jspsych-btn touch-btn touch-btn-right-fake"></button>
      `,
      choices: [""],
      button_html: [
        '<button class="jspsych-btn touch-btn touch-btn-left"></button>',
      ],
    },
    {
      type: jsPsychHtmlButtonResponse,
      stimulus: `<div class="instructions">
        <p class="instructions-float">Very good. Try it a few more times - this can be tricky to get the hang of.</p>
        <div class="heart-flower-stim">
        </div>
      </div>`,
      choices: ["Continue"],
      button_html:
        '<button class="jspsych-btn instructions-btn">%choice%</button>',
    },
  ],
  save_trial_parameters: {
    stimulus: false,
  },
  data: {
    phase: "heart-instructions",
  },
};

const mixed_instructions = {
  timeline: [
    {
      type: jsPsychHtmlButtonResponse,
      stimulus: `<div class="instructions">
        <p>Great! Now the real activity begins - both HEARTS and FLOWERS will pop up.</p>
        <p>When you see a HEART, tap the button that is on the SAME side as the heart.</p>
        <p>When you see a FLOWER, tap the button that is on the OPPOSITE side as the flower.</p>
        <p>This will take about three minutes to complete.</p> 
        <p>Good luck!</p>
      </div>`,
      choices: ["Begin"],
      button_html:
        '<button class="jspsych-btn instructions-btn">%choice%</button>',
    },
  ],
  save_trial_parameters: {
    stimulus: false,
  },
  data: {
    phase: "test-instructions",
  },
};

const heart_practice_trials = [
  { icon: "heart", side: "left" },
  { icon: "heart", side: "right" },
];

const flower_practice_trials = [
  { icon: "flower", side: "left" },
  { icon: "flower", side: "right" },
];

const trials = [
  { icon: "heart", side: "left" },
  { icon: "heart", side: "right" },
  { icon: "flower", side: "left" },
  { icon: "flower", side: "right" },
];

const heart_practice_trial = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => {
    let html = createHeartFlowerStim(
      jsPsych.timelineVariable("icon"),
      jsPsych.timelineVariable("side")
    );
    if (jsPsych.timelineVariable("side") == "left") {
      html +=
        '<button disabled class="jspsych-btn touch-btn touch-btn-right-fake"></button>';
    }
    if (jsPsych.timelineVariable("side") == "right") {
      html +=
        '<button disabled class="jspsych-btn touch-btn touch-btn-left-fake"></button>';
    }
    return html;
  },
  choices: [""],
  button_html: () => {
    if (jsPsych.timelineVariable("side") == "left") {
      return '<button class="jspsych-btn touch-btn touch-btn-left"></button>';
    }
    if (jsPsych.timelineVariable("side") == "right") {
      return '<button class="jspsych-btn touch-btn touch-btn-right"></button>';
    }
  },
  data: {
    task: "response",
    icon: jsPsych.timelineVariable("icon"),
    side: jsPsych.timelineVariable("side"),
    correct_response: () => {
      return getCorrectResponse(
        jsPsych.timelineVariable("icon"),
        jsPsych.timelineVariable("side")
      );
    },
  },
  save_trial_parameters: {
    stimulus: false,
  },
};

const flower_practice_trial = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => {
    let html = createHeartFlowerStim(
      jsPsych.timelineVariable("icon"),
      jsPsych.timelineVariable("side")
    );
    if (jsPsych.timelineVariable("side") == "left") {
      html +=
        '<button disabled class="jspsych-btn touch-btn touch-btn-left-fake"></button>';
    }
    if (jsPsych.timelineVariable("side") == "right") {
      html +=
        '<button disabled class="jspsych-btn touch-btn touch-btn-right-fake"></button>';
    }
    return html;
  },
  choices: [""],
  button_html: () => {
    if (jsPsych.timelineVariable("side") == "left") {
      return '<button class="jspsych-btn touch-btn touch-btn-right"></button>';
    }
    if (jsPsych.timelineVariable("side") == "right") {
      return '<button class="jspsych-btn touch-btn touch-btn-left"></button>';
    }
  },
  data: {
    task: "response",
    icon: jsPsych.timelineVariable("icon"),
    side: jsPsych.timelineVariable("side"),
    correct_response: () => {
      return getCorrectResponse(
        jsPsych.timelineVariable("icon"),
        jsPsych.timelineVariable("side")
      );
    },
  },
  save_trial_parameters: {
    stimulus: false,
  },
};

const heart_flower_trial = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => {
    return createHeartFlowerStim(
      jsPsych.timelineVariable("icon"),
      jsPsych.timelineVariable("side")
    );
  },
  choices: ["", ""],
  button_html: [
    '<button class="jspsych-btn touch-btn touch-btn-left"></button>',
    '<button class="jspsych-btn touch-btn touch-btn-right"></button>',
  ],
  data: {
    task: "response",
    icon: jsPsych.timelineVariable("icon"),
    side: jsPsych.timelineVariable("side"),
    correct_response: () => {
      return getCorrectResponse(
        jsPsych.timelineVariable("icon"),
        jsPsych.timelineVariable("side")
      );
    },
  },
  save_trial_parameters: {
    stimulus: false,
  },
  on_start: (trial) => {
    if (trial.data.phase == "test") {
      trial.trial_duration = response_window;
    }
  },
  on_finish: (data) => {
    data.correct = data.response == data.correct_response;
    if (data.phase == "test") {
      const test_data = jsPsych.data
        .get()
        .filter({ phase: "test", task: "response" });
      if (test_data.count() == 1) {
        data.switch = false;
      }
      if (test_data.count() > 1) {
        const last_trial = test_data.last(2).values()[0]; // need last(2) because last(1) is this trial.
        data.switch = last_trial.icon != data.icon;
      }
    }
  },
};

const heart_flower_gap = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<div class="heart-flower-stim"></div>
    <button disabled class="jspsych-btn touch-btn touch-btn-left-fake"></button>
    <button disabled class="jspsych-btn touch-btn touch-btn-right-fake"></button>`,
  choices: "NO_KEYS",
  trial_duration: blank_duration,
  save_trial_parameters: {
    stimulus: false,
  },
  data: {
    task: "blank",
  },
};

const heart_flower_fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<div class="heart-flower-stim heart-flower-fixation">
    <p>+</p>
    </div>
    <button disabled class="jspsych-btn touch-btn touch-btn-left-fake"></button>
    <button disabled class="jspsych-btn touch-btn touch-btn-right-fake"></button>`,
  choices: "NO_KEYS",
  trial_duration: fixation_duration,
  save_trial_parameters: {
    stimulus: false,
  },
  data: {
    task: "fixation",
  },
};

const too_slow = {
  timeline: [
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `<div class="heart-flower-stim heart-flower-feedback">
        <p>Try to respond faster</p>
      </div>`,
      choices: "NO_KEYS",
      trial_duration: too_slow_duration,
      save_trial_parameters: {
        stimulus: false,
      },
      data: {
        task: "too_slow",
      },
    },
  ],
  conditional_function: () => {
    const last_trial = jsPsych.data
      .get()
      .filter({ task: "response" })
      .last(1)
      .values()[0];
    if (last_trial.rt === null) {
      return true;
    }
    return false;
  },
};

const heart_practice_timeline = {
  timeline: [heart_flower_fixation, heart_flower_gap, heart_practice_trial],
  timeline_variables: heart_practice_trials,
  sample: {
    type: "fixed-repetitions",
    size: practice_reps_per_side,
  },
  data: {
    phase: "heart-practice",
  },
};

const flower_practice_timeline = {
  timeline: [heart_flower_fixation, heart_flower_gap, flower_practice_trial],
  timeline_variables: flower_practice_trials,
  sample: {
    type: "fixed-repetitions",
    size: practice_reps_per_side,
  },
  data: {
    phase: "flower-practice",
  },
};

const heart_flower_timeline = {
  timeline: [
    heart_flower_fixation,
    heart_flower_gap,
    heart_flower_trial,
    too_slow,
  ],
  timeline_variables: trials,
  sample: {
    type: "fixed-repetitions",
    size: test_reps_per_item,
  },
  data: {
    phase: "test",
  },
};

const end_screen = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<div class="instructions">
    <p>This task is complete.</p>
  </div>`,
  choices: ["End experiment"],
  button_html: '<button class="jspsych-btn instructions-btn">%choice%</button>',
  save_trial_parameters: {
    stimulus: false,
  },
};

timeline.push(preload);
timeline.push(heart_instructions);
timeline.push(heart_practice_timeline);
timeline.push(flower_instructions);
timeline.push(flower_practice_timeline);
timeline.push(mixed_instructions);
timeline.push(heart_flower_timeline);
timeline.push(end_screen);

jsPsych.run(timeline);

function createHeartFlowerStim(icon, side) {
  let html = `<div class="heart-flower-stim heart-flower-${side}">
    <img src="img/${icon}.png" />
  </div>`;
  return html;
}

function getCorrectResponse(icon, side) {
  if (icon === "heart") {
    if (side === "left") {
      return 0;
    } else {
      return 1;
    }
  } else {
    if (side === "left") {
      return 1;
    } else {
      return 0;
    }
  }
}
