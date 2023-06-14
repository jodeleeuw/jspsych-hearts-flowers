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
        <p>When you are ready for the instructions, click the button below.</p>
      </div>`,
      choices: ["Continue"],
      button_html:
        '<button class="jspsych-btn instructions-btn">%choice%</button>',
    },
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `<div class="instructions">
        <p>In this task you will use the A and L keys on your keyboard.</p>
        <p>Please rest your left index finger on the A key and your right index finger on the L key.</p>
        <p>Then press either key to continue.</p>
      </div>`,
      choices: ["a", "l"],
    },
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `<div class="instructions">
        <div class="instructions-float">
          <p>In this task, you're going to see a number of hearts and flowers in the box below.</p>
          <p>Press spacebar to continue.</p>
        </div>
        <div class="heart-flower-stim">
        </div>
      </div>`,
      choices: [" "],
    },
    
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `<div class="instructions">
        <div class="instructions-float">
          <p>When you see a heart, press the key that is on the SAME side as the heart.</p>
          <p>Here you should press the A key.</p>
        </div>
        <div class="heart-flower-stim heart-flower-left">
          <img src="img/heart.png" />
        </div>
      </div>`,
      choices: ["a"],
    },
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `<div class="instructions">
        <div class="instructions-float">
          <p>Now you should press the L key.</p>
        </div>
        <div class="heart-flower-stim heart-flower-right">
          <img src="img/heart.png" />
        </div>
      </div>`,
      choices: ["l"],
    },
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `<div class="instructions">
        <div class="instructions-float">
          <p>Very good. Try it a few more times - it goes pretty quickly.</p>
          <p>Press the spacebar to continue.</p>
        </div>
        <div class="heart-flower-stim">
        </div>
      </div>`,
      choices: [" "],
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
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `<div class="instructions">
        <div class="instructions-float">
          <p>Great!</p>
          <p>Press the spacebar to continue.</p>
        </div>
        <div class="heart-flower-stim">
        </div>
      </div>`,
      choices: [" "],
    },
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `<div class="instructions">
        <div class="instructions-float">
          <p>When you see a FLOWER, press the key that is on the OPPOSITE side as the flower.</p>
          <p>Here you should press the L key.</p>
        </div>
        <div class="heart-flower-stim heart-flower-left">
          <img src="img/flower.png" />
        </div>
      </div>`,
      choices: ["l"],
    },
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `<div class="instructions">
        <div class="instructions-float">
          <p>And here you should press the A key.</p>
        </div>
        <div class="heart-flower-stim heart-flower-right">
          <img src="img/flower.png" />
        </div>
      </div>
      `,
      choices: ["a"],
    },
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `<div class="instructions">
        <div class="instructions-float">
          <p>Very good. Try it a few more times - this can be tricky to get the hang of.</p>
          <p>Press the spacebar to continue.</p>
        </div>
        <div class="heart-flower-stim">
        </div>
      </div>`,
      choices: [" "],
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
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `<div class="instructions">
        <p>Great! Now the real activity begins - both HEARTS and FLOWERS will pop up.</p>
        <p>When you see a HEART, press the key that is on the SAME side as the heart.</p>
        <p>When you see a FLOWER, press the key that is on the OPPOSITE side as the flower.</p>
        <p>This will take about three minutes to complete.</p> 
        <p>Press the spacebar to begin. Good luck!</p>
      </div>`,
      choices: [" "],
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
  type: jsPsychHtmlKeyboardResponse,
  stimulus: () => {
    let html = createHeartFlowerStim(
      jsPsych.timelineVariable("icon"),
      jsPsych.timelineVariable("side")
    );
    return html;
  },
  choices: ()=> {
    if(jsPsych.timelineVariable("side") == "left") {
      return ["a"]
    }
    if(jsPsych.timelineVariable("side") == "right") {
      return ["l"]
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
  type: jsPsychHtmlKeyboardResponse,
  stimulus: () => {
    let html = createHeartFlowerStim(
      jsPsych.timelineVariable("icon"),
      jsPsych.timelineVariable("side")
    );
    return html;
  },
  choices: ()=> {
    if(jsPsych.timelineVariable("side") == "right") {
      return ["a"]
    }
    if(jsPsych.timelineVariable("side") == "left") {
      return ["l"]
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
  type: jsPsychHtmlKeyboardResponse,
  stimulus: () => {
    return createHeartFlowerStim(
      jsPsych.timelineVariable("icon"),
      jsPsych.timelineVariable("side")
    );
  },
  choices: ["a", "l"],
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
  stimulus: `<div class="heart-flower-stim"></div>`,
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
  `,
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
      return "a";
    } else {
      return "l";
    }
  } else {
    if (side === "left") {
      return "l";
    } else {
      return "a";
    }
  }
}
