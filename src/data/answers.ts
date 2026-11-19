// Every answer-shaped heading on the page, in page order: one list for
// llms.txt, the structured data and the tests. The copy itself lives with each
// section's data; this file only gathers it.
import { approachCopy, evidenceCopy, differencesCopy } from './approach';
import { sectionCopy as aiNativeCopy } from './aiNative';
import { frameworkAnswer, activatorsAnswer, changeAnswer } from './playbookAnswers';

export interface PageAnswer {
  /** Section anchor the answer sits in */
  anchor: string;
  question: string;
  answer: string;
}

export const pageAnswers: PageAnswer[] = [
  { anchor: 'approach', question: approachCopy.heading, answer: approachCopy.answer },
  { anchor: 'approach', question: evidenceCopy.heading, answer: evidenceCopy.answer },
  { anchor: 'differences', question: differencesCopy.heading, answer: differencesCopy.answer },
  { anchor: 'framework', question: frameworkAnswer.heading, answer: frameworkAnswer.answer },
  { anchor: 'activators', question: activatorsAnswer.heading, answer: activatorsAnswer.answer },
  { anchor: 'change-levers', question: changeAnswer.heading, answer: changeAnswer.answer },
  { anchor: 'ai-native', question: aiNativeCopy.heading, answer: aiNativeCopy.answer },
];
