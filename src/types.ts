import type { MaybePromise } from 'elysia/types'
import type { HomeworkGradeLevel } from '@/constants'

// #region type utils
export type FirstKey<T> = T extends Record<infer K, any> ? K : never

// export type FirstValue<T> = T[FirstKey<T>]

export type UseConfig<T extends object = any> = MaybePromise<Partial<T>>
// #endregion

// #region urls
export type UrlLike = string | URL

export type ReqLike = Request | UrlLike

export type Language = 'zh' | 'en'
// TODO: Add transition rules
export type WebsiteShowLanguage = 'zh_CN' | 'en_US'

export type IdentityType = 'student' | 'teacher'

export type StudentType = 'graduate' | 'undergraduate'

/**
 * Register form parameters for query
 */
export const RegisterFormBody = {
  appId: 'appId',
} as const
// #endregion

// #region response
/**
 * Base response type
 * @param T - The data type of the response, wrapped as `Partial<T>` by default
 *
 * @example
 * ```ts
 * // { status: boolean, data: { foo?: sting }, message: string }
 * type Response = BaseResponse<{ foo: string }>
 * ```
 */
export interface BaseResponse<T extends string | object = never> {
  status: boolean
  data?: Partial<T>
  message: string
}

/**
 * Unwrapped response type
 *
 * @example
 * ```ts
 * // { foo: string }
 * type ResponseType = ResponseType<BaseResponse<{ foo: string }>>
 * ```
 */
export type ResponseType<T extends BaseResponse<any>> = Exclude<T['data'], undefined>

export interface Recv<T extends object> {
  query: T
  store?: any
}

export type ResultStatus = 'success' | 'error'

export interface FailReasonMap {
  [key: string]: string
}
// #endregion

// #region data
export interface UserInfo {
  name: string
  department: string
}

export type SemesterType = 'spring' | 'autumn' | 'summer' | 'unknown'

export interface SemesterInfo {
  id: string
  startDate: Date
  endDate: Date
  startYear: number | string
  endYear: number | string
  type: SemesterType
}

export interface CourseInfo {
  id: string | number
  name: string
  chineseName: string
  englishName: string
  timeAndLocation: string[]
  url: string | URL
  teacherName: string
  teacherNumber: string | number
  courseNumber: string | number
  courseIndex: string | number
  identityType: IdentityType
}

export interface RemoteFile {
  id: string | number
  name: string
  downloadUrl: string | URL
  previewUrl: string | URL
  size: string | number
}

export interface NotificationDetail {
  attachment?: RemoteFile
}

export interface Notification extends NotificationDetail {
  id: string | number
  title: string
  content: string
  hasRead: boolean
  url: string | URL
  markedImportant: boolean
  publishTime: Date
  publisher: string
}

export interface File {
  id: string | number
  /** size in byte */
  rawSize: number
  /** inaccurate size description (like '1M') */
  size: string | number
  title: string
  description: string
  uploadTime: Date
  /** for teachers, this url will not initiate download directly */
  downloadUrl: string | URL
  /** preview is not supported on all types of files, check before use */
  previewUrl: string | URL
  isNew: boolean
  markedImportant: boolean
  visitCount: number
  downloadCount: number
  fileType: string
  /** for compatibility */
  remoteFile: RemoteFile
}

export interface HomeworkStatus {
  submitted: boolean
  graded: boolean
}

export interface HomeworkBase extends HomeworkStatus {
  id: string | number
  stuHomeworkId: string | number
  title: string
  deadline: Date
  url: string | URL
  submitUrl: string | URL
  submitTime?: Date
  grade?: number
  /** some homework has levels but not grades, like A/B/.../F */
  gradeLevel?: keyof typeof HomeworkGradeLevel
  gradeTime?: Date
  graderName?: string
  gradeContent?: string
}

export interface HomeworkDetail {
  description?: string
  /** attachment from teacher */
  attachment?: RemoteFile
  /** answer from teacher */
  answerContent?: string
  answerAttachment?: RemoteFile
  /** submitted content from student */
  submittedContent?: string
  submittedAttachment?: RemoteFile
  /** grade from teacher */
  gradeAttachment?: RemoteFile
}

export type Homework = HomeworkStatus & HomeworkDetail

export type HomeworkCompletionType = 'individual' | 'group'

export type HomeworkSubmissionType = 'offline' | 'webLearning'

export interface IHomeworkTA {
  id: string
  index: number
  title: string
  description: string
  publisherId: string
  publishTime: Date
  startTime: Date
  deadline: Date
  url: string
  completionType: HomeworkCompletionType
  submissionType: HomeworkSubmissionType
  gradedCount: number
  submittedCount: number
  unsubmittedCount: number
}

export interface HomeworkSubmitAttachment {
  filename: string
  content: Blob
}

// TODO: Add transition rules
export interface HomeworkSubmitResult {
  result: ResultStatus
  message: string
  object: unknown
}

export interface DiscussionBase {
  id: string | number
  title: string
  publisherName: string
  publishTime: Date
  lastReplierName: string
  lastReplyTime: Date
  visitCount: number
  replyCount: number
}

export interface Discussion extends DiscussionBase {
  url: string | URL
  boardId: string | number
}

export interface Question extends DiscussionBase {
  url: string | URL
  question: string
}

export interface ContentMap {
  notification: Notification
  file: File
  homework: HomeworkStatus
  discussion: Discussion
  question: Question
  unknown: unknown
}

export type ContentType = keyof ContentMap

export interface CourseContent<T extends ContentType> {
  [id: string | number]: ContentMap[T][]
}

export interface Calendar {
  location: string
  status: string
  startTime: string
  endTime: string
  date: string | Date
  courseName: string
}
// #endregion
