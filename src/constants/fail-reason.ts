export const FailReason = {
  ModuleNotFound: 'Module not found!',
  InternetError: 'Internet error!',
  SubmitHomeworkError: 'Submit homework error!',
  LoginError: 'Fail to login!',
  LogoutError: 'Fail to logout!',
  BadCredentials: 'Bad credentials!',
  InvalidStudentHomeworkID: 'Invalid student homework ID!',
} as const

export default FailReason
