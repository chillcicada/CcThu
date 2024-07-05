// #region constant values
export const MAX_SIZE = 200

export const MAX_RETRY = 3
export const DEFAULT_RETRY_INTERVAL = 1000 // ms
export const DEFAULT_TIMEOUT = 3000 // ms
// #endregion

// #region error messages
export const APIError = {

} as const
// #endregion

// #region constant objects
export const HomeworkGradeLevel = {
  CHECKED: 'checked',
  DISTINCTION: 'distinction',
  EXEMPTED_COURSE: 'exempted course',
  EX: 'EX',
  EXEMPTION: 'exemption',

  A_PLUS: 'A+',
  A: 'A',
  A_MINUS: 'A-',
  B_PLUS: 'B+',
  B: 'B',
  B_MINUS: 'B-',
  C_PLUS: 'C+',
  C: 'C',
  C_MINUS: 'C-',
  G: 'G',
  D_PLUS: 'D+',
  D: 'D',
  P: 'P',
  F: 'F',

  PASS: 'pass',
  FAILURE: 'failure',
  W: 'W',
  I: 'I',
  INCOMPLETE: 'incomplete',
  NA: 'NA',
} as const
// #endregion

// #region constant modules
export * from './fail-reason'
export * from './special-modules'
// #endregion
