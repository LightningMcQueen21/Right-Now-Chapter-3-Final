import {
  DifficultyLevel,
  EquipmentItem,
  ActionItem,
  GrammarQuestion,
  DetectiveScene,
  GrandChallengeItem,
  Trophy
} from '../types/gameTypes';

export const EQUIPMENT_ITEMS: Record<DifficultyLevel, EquipmentItem[]> = {
  easy: [
    {
      id: 'eq-1',
      name: 'Skateboard',
      sport: 'Skateboarding',
      iconName: 'skateboard',
      description: 'A wooden board on wheels for rolling.',
      color: 'from-emerald-400 to-green-600',
      hint: 'Look for wheels you stand on to ride!'
    },
    {
      id: 'eq-2',
      name: 'Baseball Bat & Ball',
      sport: 'Playing baseball',
      iconName: 'baseball',
      description: 'A wooden bat and red-stitched ball.',
      color: 'from-emerald-400 to-green-600',
      hint: 'You hold the bat to hit the white ball!'
    },
    {
      id: 'eq-3',
      name: 'Table Tennis Racket',
      sport: 'Playing table tennis',
      iconName: 'table_tennis',
      description: 'A red paddle for ping pong.',
      color: 'from-emerald-400 to-green-600',
      hint: 'Used to hit small white balls over a green table!'
    }
  ],
  medium: [
    {
      id: 'eq-1',
      name: 'Skateboard',
      sport: 'Skateboarding',
      iconName: 'skateboard',
      description: 'A wooden deck with wheels used in the park.',
      color: 'from-amber-400 to-orange-600',
      hint: 'Tom is on this board exercising and having fun.'
    },
    {
      id: 'eq-2',
      name: 'Baseball Bat',
      sport: 'Playing baseball',
      iconName: 'baseball',
      description: 'Striking bat used by Jonathan.',
      color: 'from-amber-400 to-orange-600',
      hint: 'He is hitting the ball with this equipment.'
    },
    {
      id: 'eq-3',
      name: 'Table Tennis Racket',
      sport: 'Playing table tennis',
      iconName: 'table_tennis',
      description: 'Red rubber paddle with wooden handle.',
      color: 'from-amber-400 to-orange-600',
      hint: 'Tom and Nancy hold this paddle during their game.'
    },
    {
      id: 'eq-4',
      name: 'Tennis Racket & Ball',
      sport: 'Playing tennis',
      iconName: 'tennis',
      description: 'Stringed racket and neon yellow ball.',
      color: 'from-amber-400 to-orange-600',
      hint: 'Sam and Matt play on a large outdoor court with this.'
    },
    {
      id: 'eq-5',
      name: 'Volleyball & Net',
      sport: 'Playing volleyball',
      iconName: 'volleyball',
      description: 'Light ball hit with bare hands over a high net.',
      color: 'from-amber-400 to-orange-600',
      hint: 'Children hit this ball with their hands over the net.'
    }
  ],
  hard: [
    {
      id: 'eq-1',
      name: 'Skateboard & Safety Helmet',
      sport: 'Skateboarding',
      iconName: 'skateboard',
      description: 'Four-wheeled deck and protective headgear.',
      color: 'from-purple-400 to-indigo-600',
      hint: 'Requires balance and coordination on pavement.'
    },
    {
      id: 'eq-2',
      name: 'Baseball Bat & Leather Glove',
      sport: 'Playing baseball',
      iconName: 'baseball',
      description: 'Equipment for striking and catching flying baseballs.',
      color: 'from-purple-400 to-indigo-600',
      hint: 'Used in team sports on an open diamond field.'
    },
    {
      id: 'eq-3',
      name: 'Table Tennis Paddle & Ping Pong Ball',
      sport: 'Playing table tennis',
      iconName: 'table_tennis',
      description: 'Indoor table sport gear featuring a partitioned net.',
      color: 'from-purple-400 to-indigo-600',
      hint: 'Fast-paced indoor sport played across a green surface.'
    },
    {
      id: 'eq-4',
      name: 'Tennis Racket',
      sport: 'Playing tennis',
      iconName: 'tennis',
      description: 'Tightly strung frame for baseline rallies.',
      color: 'from-purple-400 to-indigo-600',
      hint: 'Requires swift footwork and two-handed grips.'
    },
    {
      id: 'eq-5',
      name: 'Volleyball',
      sport: 'Playing volleyball',
      iconName: 'volleyball',
      description: 'Cushioned leather ball for passing and spiking.',
      color: 'from-purple-400 to-indigo-600',
      hint: 'Players avoid touching the central net when attacking.'
    },
    {
      id: 'eq-6',
      name: 'Gymnastics Floor Mat',
      sport: 'Doing gymnastics',
      iconName: 'gymnastics',
      description: 'Shock-absorbing surface for acrobatic balances and routines.',
      color: 'from-purple-400 to-indigo-600',
      hint: 'Sandy practices handstands and flexibility maneuvers on this.'
    }
  ]
};

export const ACTION_ITEMS: Record<DifficultyLevel, ActionItem[]> = {
  easy: [
    // 3 actions, guided sentence building with word banks & picture clues
    {
      id: 'act-1',
      action: 'skateboarding',
      verb: 'skateboarding',
      subject: 'Tom',
      fullSentence: 'Tom is skateboarding.',
      iconName: 'skateboarding',
      hint: 'Picture clue: Look at the skateboard under his feet!',
      options: ['skateboarding', 'sleeping'],
      missingWord: 'skateboarding',
      scrambledWords: ['Tom', 'is', 'skateboarding.']
    },
    {
      id: 'act-2',
      action: 'playing baseball',
      verb: 'playing',
      subject: 'Jonathan',
      fullSentence: 'Jonathan is playing baseball.',
      iconName: 'baseball',
      hint: 'Picture clue: Jonathan is holding a baseball bat!',
      options: ['playing baseball', 'eating lunch'],
      missingWord: 'playing baseball',
      scrambledWords: ['Jonathan', 'is', 'playing', 'baseball.']
    },
    {
      id: 'act-3',
      action: 'doing gymnastics',
      verb: 'doing',
      subject: 'Sandy',
      fullSentence: 'Sandy is doing gymnastics.',
      iconName: 'gymnastics',
      hint: 'Picture clue: Sandy is doing a handstand on the blue mat!',
      options: ['doing gymnastics', 'brushing teeth'],
      missingWord: 'doing gymnastics',
      scrambledWords: ['Sandy', 'is', 'doing', 'gymnastics.']
    }
  ],
  medium: [
    // 5 actions, semi-guided with missing verb inflection & short explanations
    {
      id: 'act-1',
      action: 'hitting the ball',
      verb: 'hitting',
      subject: 'Jonathan',
      fullSentence: 'Jonathan is hitting the ball with his bat.',
      iconName: 'hitting',
      hint: 'Form the verb: hit + ting = hitting (double t).',
      options: ['hitting', 'watering', 'eating'],
      missingWord: 'hitting',
      scrambledWords: ['Jonathan', 'is', 'hitting', 'the ball.']
    },
    {
      id: 'act-2',
      action: 'playing table tennis',
      verb: 'playing',
      subject: 'May and Jin',
      fullSentence: 'May and Jin are playing table tennis.',
      iconName: 'table_tennis',
      hint: 'Plural subject (May and Jin = They) takes "are playing".',
      options: ['playing', 'singing', 'driving'],
      missingWord: 'playing',
      scrambledWords: ['May and Jin', 'are', 'playing', 'table tennis.']
    },
    {
      id: 'act-3',
      action: 'doing gymnastics',
      verb: 'doing',
      subject: 'Sandy',
      fullSentence: 'Sandy is doing gymnastics on the mat.',
      iconName: 'gymnastics',
      hint: 'Collocation: we say "doing gymnastics", not "playing gymnastics".',
      options: ['doing', 'taking', 'making'],
      missingWord: 'doing',
      scrambledWords: ['Sandy', 'is', 'doing', 'gymnastics.']
    },
    {
      id: 'act-4',
      action: 'playing volleyball',
      verb: 'playing',
      subject: 'The children',
      fullSentence: 'The children are playing volleyball together.',
      iconName: 'volleyball',
      hint: 'Multiple children hit the ball across the net.',
      options: ['playing', 'drawing', 'watching'],
      missingWord: 'playing',
      scrambledWords: ['They', 'are', 'playing', 'volleyball.']
    },
    {
      id: 'act-5',
      action: 'throwing the ball',
      verb: 'throwing',
      subject: 'Tom',
      fullSentence: 'Tom is throwing the ball to Nancy.',
      iconName: 'throwing',
      hint: 'Tom releases the ball from his hand toward Nancy.',
      options: ['throwing', 'reading', 'sleeping'],
      missingWord: 'throwing',
      scrambledWords: ['Tom', 'is', 'throwing', 'the ball.']
    }
  ],
  hard: [
    // 6 actions, independent sentence building + independent explanation requirement
    {
      id: 'act-1',
      action: 'skateboarding',
      verb: 'skateboarding',
      subject: 'Tom',
      fullSentence: 'Look at Tom! He is skateboarding.',
      iconName: 'skateboarding',
      hint: 'Form the complete sentence independently.',
      scrambledWords: ['Look', 'at', 'Tom!', 'He', 'is', 'skateboarding.'],
      explanationPrompt: 'Explain why "is" is used instead of "are":',
      explanationOptions: [
        'Because "He" is a singular third-person subject.',
        'Because "He" refers to multiple children.',
        'Because skateboarding always requires plural verbs.'
      ],
      correctExplanation: 'Because "He" is a singular third-person subject.'
    },
    {
      id: 'act-2',
      action: 'hitting the ball with his baseball bat',
      verb: 'hitting',
      subject: 'Jonathan',
      fullSentence: 'Jonathan is hitting the ball with his baseball bat.',
      iconName: 'hitting',
      hint: 'Construct sentence independently with spelling rule awareness.',
      scrambledWords: ['Jonathan', 'is', 'hitting', 'the ball', 'with his bat.'],
      explanationPrompt: 'Explain the spelling change in the verb "hit":',
      explanationOptions: [
        'Single vowel + consonant doubles the final letter ("hit" -> "hitting").',
        'Drop the letter "t" before adding "-ing".',
        'Add "-ed" then "-ing" to the base form.'
      ],
      correctExplanation: 'Single vowel + consonant doubles the final letter ("hit" -> "hitting").'
    },
    {
      id: 'act-3',
      action: 'doing gymnastics',
      verb: 'doing',
      subject: 'Sandy',
      fullSentence: "Sandy isn't playing a sport; she is doing gymnastics.",
      iconName: 'gymnastics',
      hint: 'Construct sentence balancing negative and affirmative clauses.',
      scrambledWords: ['Sandy', 'is', 'doing', 'gymnastics', 'on the mat.'],
      explanationPrompt: 'Explain why gymnastics uses the verb "do":',
      explanationOptions: [
        'Gymnastics is a non-team physical exercise without a ball.',
        'Gymnastics is played with a racket and court.',
        'Gymnastics can only be used with "play".'
      ],
      correctExplanation: 'Gymnastics is a non-team physical exercise without a ball.'
    },
    {
      id: 'act-4',
      action: 'playing table tennis',
      verb: 'playing',
      subject: 'May and Jin',
      fullSentence: 'May and Jin are exercising and playing table tennis.',
      iconName: 'table_tennis',
      hint: 'Two subjects require plural auxiliary agreement.',
      scrambledWords: ['May and Jin', 'are', 'playing', 'table tennis.'],
      explanationPrompt: 'Explain why "are" is used with May and Jin:',
      explanationOptions: [
        'Two or more people form a plural compound subject (They).',
        'Names always take "is" in English.',
        '"Are" is only used for female subjects.'
      ],
      correctExplanation: 'Two or more people form a plural compound subject (They).'
    },
    {
      id: 'act-5',
      action: 'watering the plants',
      verb: 'watering',
      subject: 'Mrs Clark',
      fullSentence: 'Mrs Clark is watering the plants in the garden.',
      iconName: 'watering',
      hint: 'Subject is singular female (Mrs Clark = She).',
      scrambledWords: ['Mrs Clark', 'is', 'watering', 'the plants.'],
      explanationPrompt: 'Explain why "watering" ends in "-ing":',
      explanationOptions: [
        'It describes an ongoing action happening at the moment of speaking.',
        'It expresses an action that happened last week in the past.',
        'It is a noun indicating equipment.'
      ],
      correctExplanation: 'It describes an ongoing action happening at the moment of speaking.'
    },
    {
      id: 'act-6',
      action: 'running back with the ball',
      verb: 'running',
      subject: 'Tom',
      fullSentence: 'Tom is running back to Nancy with the ball.',
      iconName: 'running',
      hint: 'Spelling rule: run -> double n -> running.',
      scrambledWords: ['Tom', 'is', 'running', 'back to', 'Nancy.'],
      explanationPrompt: 'Explain why "run" doubles its consonant to "running":',
      explanationOptions: [
        'Short vowel "u" followed by single consonant "n" doubles the "n".',
        'All verbs ending in "n" must double in English.',
        'It indicates fast movement.'
      ],
      correctExplanation: 'Short vowel "u" followed by single consonant "n" doubles the "n".'
    }
  ]
};

export const GRAMMAR_QUESTIONS: Record<DifficultyLevel, GrammarQuestion[]> = {
  easy: [
    // Basic grammar, NO explanation required (instant celebration!)
    {
      id: 'g-e1',
      prompt: 'Complete the sentence:',
      sentenceWithBlank: 'She ___ playing baseball.',
      options: ['am', 'is', 'are'],
      correctAnswer: 'is',
      ruleHint: 'One girl (She) = IS',
      type: 'auxiliary'
    },
    {
      id: 'g-e2',
      prompt: 'Pick the correct word:',
      sentenceWithBlank: "He ___ skateboarding today.",
      options: ["isn't", "aren't", "am not"],
      correctAnswer: "isn't",
      ruleHint: "One boy (He) = isn't",
      type: 'negative'
    },
    {
      id: 'g-e3',
      prompt: 'Complete the sentence:',
      sentenceWithBlank: 'They ___ playing table tennis.',
      options: ['is', 'are', 'am'],
      correctAnswer: 'are',
      ruleHint: 'More than one (They) = ARE',
      type: 'plural'
    }
  ],
  medium: [
    // Intermediate grammar with SHORT ANSWERS
    {
      id: 'g-m1',
      prompt: 'Choose the correct auxiliary verb:',
      sentenceWithBlank: 'Jonathan ___ hitting the ball with his bat.',
      options: ['is', 'are', 'am'],
      correctAnswer: 'is',
      shortExplanation: 'Jonathan is one person (He), so we use "is hitting".',
      ruleHint: 'Singular subject (He/Jonathan) takes "is".',
      type: 'auxiliary'
    },
    {
      id: 'g-m2',
      prompt: 'Choose the correct negative word:',
      sentenceWithBlank: "May and Jin ___ doing gymnastics. They are exercising.",
      options: ["aren't", "isn't", "not"],
      correctAnswer: "aren't",
      shortExplanation: 'May and Jin are two people (They). Plural negative is "aren\'t".',
      ruleHint: 'Plural subject (They) takes "aren\'t".',
      type: 'negative'
    },
    {
      id: 'g-m3',
      prompt: 'Choose the correct question word:',
      sentenceWithBlank: '___ Tom playing table tennis?',
      options: ['Is', 'Are', 'Do'],
      correctAnswer: 'Is',
      shortExplanation: 'Tom is singular (He), so the question starts with "Is Tom...?"',
      ruleHint: 'Singular question: Is + subject + verb-ing?',
      type: 'question'
    },
    {
      id: 'g-m4',
      prompt: 'Select the correct short answer:',
      sentenceWithBlank: 'Is Nancy hitting the ball? No, she ___.',
      options: ["isn't", "aren't", "doesn't"],
      correctAnswer: "isn't",
      shortExplanation: 'Short negative answer for She: "No, she isn\'t."',
      ruleHint: 'Short answer: No, she isn\'t.',
      type: 'negative'
    },
    {
      id: 'g-m5',
      prompt: 'Complete the sentence with "I":',
      sentenceWithBlank: 'I ___ exercising in the park right now.',
      options: ['am', 'is', 'are'],
      correctAnswer: 'am',
      shortExplanation: 'Pronoun "I" always pairs with "am" (I am).',
      ruleHint: 'Subject "I" always takes "am".',
      type: 'auxiliary'
    }
  ],
  hard: [
    // Advanced grammar with INDEPENDENT EXPLANATION required
    {
      id: 'g-h1',
      prompt: 'Form the interrogative sentence correctly:',
      sentenceWithBlank: '___ the girls playing volleyball over the net?',
      options: ['Are', 'Is', 'Am', 'Do'],
      correctAnswer: 'Are',
      ruleHint: 'Plural subject (the girls) requires "Are".',
      type: 'question',
      explanationPrompt: 'Explain independently why "Are" is the only correct answer:',
      explanationOptions: [
        '"The girls" is a plural noun phrase equivalent to "They", which requires "Are".',
        '"Is" should be used because girls is feminine.',
        '"Do" is used for actions happening right now.'
      ],
      correctExplanation: '"The girls" is a plural noun phrase equivalent to "They", which requires "Are".'
    },
    {
      id: 'g-h2',
      prompt: 'Identify the correct auxiliary in this compound sentence:',
      sentenceWithBlank: "Sandy isn't playing a sport. She ___ doing gymnastics.",
      options: ['is', 'are', 'was', 'am'],
      correctAnswer: 'is',
      ruleHint: 'Subject "She" requires "is" in Present Continuous.',
      type: 'auxiliary',
      explanationPrompt: 'Explain why "is" maintains grammatical parallelism here:',
      explanationOptions: [
        'The first clause establishes present tense ("isn\'t"), so the second clause requires "is".',
        '"Was" would be better because gymnastics was finished.',
        '"Are" agrees with the word gymnastics because it ends in s.'
      ],
      correctExplanation: 'The first clause establishes present tense ("isn\'t"), so the second clause requires "is".'
    },
    {
      id: 'g-h3',
      prompt: 'Identify the correctly spelled present continuous form:',
      sentenceWithBlank: 'Tom is ___ back to Nancy with the ball.',
      options: ['running', 'runing', 'runed', 'run'],
      correctAnswer: 'running',
      ruleHint: 'C-V-C doubling: r-u-n -> r-u-n-n-i-n-g.',
      type: 'auxiliary',
      explanationPrompt: 'Explain the orthographic rule applied to the base verb "run":',
      explanationOptions: [
        'A single syllable verb ending in consonant-vowel-consonant doubles the final consonant.',
        'All verbs ending in vowels drop the vowel before "-ing".',
        'Verbs describing physical exercise always end with double letters.'
      ],
      correctExplanation: 'A single syllable verb ending in consonant-vowel-consonant doubles the final consonant.'
    },
    {
      id: 'g-h4',
      prompt: 'Complete the short response:',
      sentenceWithBlank: 'Are they skateboarding in the park? Yes, they ___.',
      options: ['are', 'is', 'do', 'can'],
      correctAnswer: 'are',
      ruleHint: 'Question with "Are they" echoes "they are" in response.',
      type: 'question',
      explanationPrompt: 'Explain how short answers echo the question auxiliary:',
      explanationOptions: [
        'In English, short answers echo the auxiliary verb of the question ("Are they...?" -> "they are").',
        'Short answers must always switch to the verb "do".',
        'Any auxiliary can be chosen freely in casual speech.'
      ],
      correctExplanation: 'In English, short answers echo the auxiliary verb of the question ("Are they...?" -> "they are").'
    },
    {
      id: 'g-h5',
      prompt: 'Spot and fix the grammatical error in this dialogue:',
      sentenceWithBlank: 'It isn\'t raining. Mrs Clark ___ watering the plants.',
      options: ['is', 'are', 'am', 'be'],
      correctAnswer: 'is',
      ruleHint: 'Mrs Clark (singular female) = is',
      type: 'auxiliary',
      explanationPrompt: 'Explain the relationship between the two clauses:',
      explanationOptions: [
        'The negative clause clarifies the condition, while the affirmative clause specifies the exact action.',
        'Both clauses must always be negative.',
        'Mrs Clark is plural because she has plants.'
      ],
      correctExplanation: 'The negative clause clarifies the condition, while the affirmative clause specifies the exact action.'
    },
    {
      id: 'g-h6',
      prompt: 'Spot the mistake: "The children is playing tennis."',
      sentenceWithBlank: 'To make this sentence correct, "is" must be changed to: ___',
      options: ['are', 'am', 'was', 'be'],
      correctAnswer: 'are',
      ruleHint: 'Irregular plural: child -> children -> ARE.',
      type: 'plural',
      explanationPrompt: 'Explain why "children" takes "are":',
      explanationOptions: [
        '"Children" is the irregular plural form of "child", representing multiple individuals.',
        '"Children" is a singular collective noun that takes singular verbs.',
        'Tennis is a game played by two, so it always requires "are".'
      ],
      correctExplanation: '"Children" is the irregular plural form of "child", representing multiple individuals.'
    }
  ]
};

export const DETECTIVE_SCENES: DetectiveScene[] = [
  {
    id: 'det-1',
    sceneNumber: 1,
    sceneTitle: 'Saturday Morning on the Court',
    storyContext: "It's Saturday morning. Tom and Nancy are playing table tennis. Nancy misses the shot as the ball flies away into the bushes.",
    dialogueQuote: '"What are you doing Nancy? Hit the ball!" — "I can\'t. Oh, no! Where is it?"',
    character: 'Nancy & Tom',
    action: 'Playing table tennis',
    question: 'Is Tom playing table tennis on Saturday morning?',
    correctAnswer: 'Yes',
    followUpSentence: 'Yes, he is. Tom and Nancy are playing table tennis on Saturday morning.',
    clueHint: 'Look at the green table, red rackets, and table tennis net.',
    evidenceType: 'Court Equipment Evidence',
    sceneIllustration: 'table_tennis_court'
  },
  {
    id: 'det-2',
    sceneNumber: 2,
    sceneTitle: 'The Garden Mystery Rain',
    storyContext: "Tom is going to get the ball. He's looking in the plants. Suddenly, water sprays all over him!",
    dialogueQuote: '"Oh, no! It\'s raining." — "Oh! Sorry, Tom! It isn\'t raining. I\'m watering the plants."',
    character: 'Mrs Clark',
    action: 'Watering the plants',
    question: 'Is it really raining in the garden?',
    correctAnswer: 'No',
    followUpSentence: "No, it isn't raining. Mrs Clark is watering the plants with her hose!",
    clueHint: 'Notice Mrs Clark holding the green water hose near her flower pots.',
    evidenceType: 'Garden Hose Evidence',
    sceneIllustration: 'mrs_clark_watering'
  },
  {
    id: 'det-3',
    sceneNumber: 3,
    sceneTitle: 'The Discovery Under the Leaves',
    storyContext: "Tom is happy now. He reaches under the green leaves and finds a white oval object.",
    dialogueQuote: '"Tom, what are you doing?" — "I\'m coming! I\'ve got the ball!"',
    character: 'Tom',
    action: 'Running back to Nancy',
    question: 'Is Tom running back to Nancy?',
    correctAnswer: 'Yes',
    followUpSentence: "Yes, he is! Tom is running back shouting, 'I've got the ball!'",
    clueHint: 'Notice Tom running fast with a big smile holding an oval white item.',
    evidenceType: 'Eyewitness Movement',
    sceneIllustration: 'tom_running_ball'
  },
  {
    id: 'det-4',
    sceneNumber: 4,
    sceneTitle: 'The Yucky Surprise!',
    storyContext: "Tom throws the object to Nancy. Nancy swings her red racket and hits it firmly... SPLAT!",
    dialogueQuote: '"Oh, no! ... Yuck! This isn\'t a ball. It\'s an egg!"',
    character: 'Nancy & Tom',
    action: 'Hitting an egg',
    question: 'Are Tom and Nancy playing baseball with a wooden bat?',
    correctAnswer: 'No',
    followUpSentence: "No, they aren't! They were playing table tennis, but hit an egg by mistake!",
    clueHint: 'Yellow yolk is splattered on the window! Value: Don\'t make hasty judgements.',
    evidenceType: 'Egg Splat Evidence',
    sceneIllustration: 'yucky_egg_splat'
  }
];

export const GRAND_CHALLENGES: Record<DifficultyLevel, GrandChallengeItem[]> = {
  easy: [
    // 3 items for weak learners, guided, no explanation required
    {
      id: 'gc-e1',
      type: 'describe_action',
      title: 'Action Investigator',
      instruction: 'Look at the boy on the board. What is he doing?',
      contextText: 'A boy is on a board with four wheels.',
      visualCue: 'skateboarding',
      options: ['He is skateboarding.', 'He is sleeping in bed.', 'He is washing dishes.'],
      correctAnswer: 'He is skateboarding.',
      explanation: 'He is skateboarding.'
    },
    {
      id: 'gc-e2',
      type: 'fix_error',
      title: 'Referee Flag: Choose the Correct Sentence',
      instruction: 'Which sentence is grammatically correct?',
      contextText: 'Notice Jonathan is one person.',
      visualCue: 'baseball',
      options: ['Jonathan is hitting the ball.', 'Jonathan are hitting the ball.', 'Jonathan am hitting the ball.'],
      correctAnswer: 'Jonathan is hitting the ball.',
      explanation: 'Jonathan is one boy (He), so we say "Jonathan is hitting the ball."'
    },
    {
      id: 'gc-e3',
      type: 'form_question',
      title: 'Question Builder',
      instruction: 'Arrange the words to form a question:',
      contextText: 'Ask what the children are doing:',
      visualCue: 'table_tennis',
      wordsToOrder: ['Are', 'they', 'playing', 'table tennis?'],
      correctAnswer: ['Are', 'they', 'playing', 'table tennis?'],
      explanation: 'Question: "Are they playing table tennis?"'
    }
  ],
  medium: [
    // 5 items for intermediate learners, semi-guided, short answers
    {
      id: 'gc-m1',
      type: 'describe_action',
      title: 'Scene Analysis',
      instruction: 'Describe what Sandy is doing on the mat:',
      contextText: 'Sandy is balancing upside down on the gymnastics mat.',
      visualCue: 'gymnastics',
      options: [
        'Sandy is doing gymnastics.',
        'Sandy is playing table tennis.',
        'Sandy is skateboarding in the street.'
      ],
      correctAnswer: 'Sandy is doing gymnastics.',
      explanation: 'Sandy is practicing acrobatic balance: "Sandy is doing gymnastics."'
    },
    {
      id: 'gc-m2',
      type: 'fix_error',
      title: "Referee's Red Card: Fix the Error!",
      instruction: 'Which sentence correctly fixes: "May and Jin is playing volleyball"?',
      contextText: 'Error: May and Jin are two people, so "is" is incorrect.',
      visualCue: 'volleyball',
      options: [
        'May and Jin are playing volleyball.',
        'May and Jin am playing volleyball.',
        'May and Jin is playing volleyball.'
      ],
      correctAnswer: 'May and Jin are playing volleyball.',
      explanation: 'Two people (They) require the plural auxiliary "are".'
    },
    {
      id: 'gc-m3',
      type: 'form_question',
      title: 'Question Formulator',
      instruction: 'Arrange these words to form an Is/Are question:',
      contextText: 'Ask about Tom searching in the garden:',
      visualCue: 'detective',
      wordsToOrder: ['Is', 'Tom', 'looking', 'for', 'the ball?'],
      correctAnswer: ['Is', 'Tom', 'looking', 'for', 'the ball?'],
      explanation: 'Singular question order: Is + Tom + looking + for + the ball?'
    },
    {
      id: 'gc-m4',
      type: 'complete_dialogue',
      title: 'Story Climax Dialogue',
      instruction: 'What did Nancy scream when she hit the mystery item?',
      contextText: 'Yellow yolk splatters on the window!',
      visualCue: 'egg',
      options: [
        '"Yuck! This isn\'t a ball. It\'s an egg!"',
        '"Hurray! We won the table tennis match!"',
        '"Look! It is raining outside!"'
      ],
      correctAnswer: '"Yuck! This isn\'t a ball. It\'s an egg!"',
      explanation: 'Nancy hit an egg that Tom found under the plants.'
    },
    {
      id: 'gc-m5',
      type: 'describe_action',
      title: 'Negative & Affirmative Balance',
      instruction: 'Which sentence accurately explains the garden situation?',
      contextText: 'Water is spraying, but the sky is clear and sunny.',
      visualCue: 'watering',
      options: [
        "It isn't raining. Mrs Clark is watering the plants.",
        'It is raining cats and dogs outside.',
        "Mrs Clark isn't watering the plants."
      ],
      correctAnswer: "It isn't raining. Mrs Clark is watering the plants.",
      explanation: 'Mrs Clark explains to Tom: "It isn\'t raining. I\'m watering the plants."'
    }
  ],
  hard: [
    // 6 items for advanced learners, independent construction + explain independently
    {
      id: 'gc-h1',
      type: 'describe_action',
      title: 'Master Action Formulation',
      instruction: 'Examine the sports scene. Which sentence uses the Present Continuous Tense with absolute precision?',
      contextText: 'Jonathan strikes the baseball with his wooden bat.',
      visualCue: 'baseball',
      options: [
        'Jonathan is hitting the ball with his baseball bat.',
        'Jonathan are hitting the ball with his baseball bat.',
        'Jonathan is hit the ball with his baseball bat.',
        'Jonathan hits the ball right now.'
      ],
      correctAnswer: 'Jonathan is hitting the ball with his baseball bat.',
      explanation: 'Singular subject (Jonathan) + is + verb-ing with doubled consonant (hitting).',
      explanationOptions: [
        'Jonathan is singular (He), and "hit" doubles its final consonant in continuous tense.',
        'Jonathan is plural because he has a bat and a ball.',
        '"Hits" is the only correct form for ongoing sports.'
      ],
      correctExplanation: 'Jonathan is singular (He), and "hit" doubles its final consonant in continuous tense.'
    },
    {
      id: 'gc-h2',
      type: 'fix_error',
      title: 'Advanced Grammatical Audit',
      instruction: 'Identify the sentence that has ZERO grammatical errors:',
      contextText: 'Audit compound subjects and negative auxiliary forms:',
      visualCue: 'table_tennis',
      options: [
        "May and Jin aren't doing gymnastics; they are playing table tennis.",
        "May and Jin isn't doing gymnastics; they are playing table tennis.",
        "May and Jin aren't doing gymnastics; they is playing table tennis.",
        "May and Jin aren't do gymnastics; they are playing table tennis."
      ],
      correctAnswer: "May and Jin aren't doing gymnastics; they are playing table tennis.",
      explanation: 'Both clauses properly agree with the plural subject using "aren\'t" and "are".',
      explanationOptions: [
        'Both "May and Jin" and "they" are plural subjects that demand "aren\'t" and "are".',
        'Gymnastics requires a singular verb in both halves.',
        'Only the second half of the sentence needs subject-verb agreement.'
      ],
      correctExplanation: 'Both "May and Jin" and "they" are plural subjects that demand "aren\'t" and "are".'
    },
    {
      id: 'gc-h3',
      type: 'form_question',
      title: 'Complex Question Construction',
      instruction: 'Assemble all tiles into an interrogative Present Continuous sentence:',
      contextText: 'Ask about Sam and Matt playing tennis on the court:',
      visualCue: 'tennis',
      wordsToOrder: ['Are', 'Sam', 'and', 'Matt', 'playing', 'tennis', 'together?'],
      correctAnswer: ['Are', 'Sam', 'and', 'Matt', 'playing', 'tennis', 'together?'],
      explanation: 'Compound subject question order: Are + Sam and Matt + playing + tennis + together?'
    },
    {
      id: 'gc-h4',
      type: 'complete_dialogue',
      title: 'Moral Philosophy in Literature',
      instruction: 'What critical moral value does the table tennis egg mishap teach pupils?',
      contextText: 'Tom rushed back assuming the egg was a ball without verifying.',
      visualCue: 'value',
      options: [
        "Don't make hasty judgements.",
        'Practice makes perfect.',
        'Never play sports with friends.',
        'Always play outside when it rains.'
      ],
      correctAnswer: "Don't make hasty judgements.",
      explanation: 'Get Smart Plus 3 (page 33) highlights: "Value: Don\'t make hasty judgements."'
    },
    {
      id: 'gc-h5',
      type: 'describe_action',
      title: 'Phonological & Orthographic Rule',
      instruction: 'Which pair of present continuous verbs correctly follows the consonant-doubling spelling rule?',
      contextText: 'Evaluate base verbs: run, hit, skate, play',
      visualCue: 'running',
      options: [
        'running and hitting',
        'runing and hiting',
        'running and hiting',
        'runing and hitting'
      ],
      correctAnswer: 'running and hitting',
      explanation: 'Both "run" and "hit" are C-V-C monosyllables that double their final consonant.',
      explanationOptions: [
        'Both run and hit have a single short vowel before a final consonant, doubling the consonant.',
        'Only verbs ending in t double their consonants.',
        'Doubling is optional depending on speech speed.'
      ],
      correctExplanation: 'Both run and hit have a single short vowel before a final consonant, doubling the consonant.'
    },
    {
      id: 'gc-h6',
      type: 'fix_error',
      title: 'Grand Championship Synthesis',
      instruction: 'Select the comprehensive, fully accurate description of Tom and Nancy’s sport:',
      contextText: 'Combine subject, sport action, and equipment:',
      visualCue: 'trophy',
      options: [
        'Tom and Nancy are playing table tennis with paddles and a net.',
        'Tom and Nancy is playing table tennis with bat and ball.',
        'Tom and Nancy are skateboarding in the gym.',
        'Tom and Nancy does table tennis right now.'
      ],
      correctAnswer: 'Tom and Nancy are playing table tennis with paddles and a net.',
      explanation: 'Plural subject takes "are playing", and table tennis gear (paddles and net) is named accurately.'
    }
  ]
};

export const INITIAL_TROPHIES: Trophy[] = [
  {
    id: 'tr-1',
    title: 'Equipment Scout Badge',
    subtitle: 'Mastered Sports Gear & Equipment Matching (Stage 1)',
    stageRequired: 1,
    icon: 'medal',
    color: 'from-emerald-400 to-green-600',
    unlocked: false,
    scoreRequired: 200
  },
  {
    id: 'tr-2',
    title: 'Action Arena Star',
    subtitle: 'Identified Sports Actions & Built Sentences (Stage 2)',
    stageRequired: 2,
    icon: 'zap',
    color: 'from-blue-400 to-indigo-600',
    unlocked: false,
    scoreRequired: 450
  },
  {
    id: 'tr-3',
    title: 'Grammar Showdown Cup',
    subtitle: 'Conquered Auxiliaries & Negative Sentences (Stage 3)',
    stageRequired: 3,
    icon: 'award',
    color: 'from-amber-400 to-orange-600',
    unlocked: false,
    scoreRequired: 700
  },
  {
    id: 'tr-4',
    title: 'Table Tennis Detective Badge',
    subtitle: 'Solved the Yucky Table Tennis Mystery (Stage 4)',
    stageRequired: 4,
    icon: 'search',
    color: 'from-teal-400 to-cyan-600',
    unlocked: false,
    scoreRequired: 950
  },
  {
    id: 'tr-5',
    title: 'Grand Championship Trophy',
    subtitle: 'Supreme Year 3 English Sports Mania Champion (Stage 5)',
    stageRequired: 5,
    icon: 'trophy',
    color: 'from-yellow-300 via-amber-400 to-yellow-600',
    unlocked: false,
    scoreRequired: 1200
  }
];
