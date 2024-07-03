import { ID_PREFIX, LEARN_PREFIX, REGISTRAR_PREFIX } from './common'
import { MAX_SIZE } from '@/constants'
import type { IdentityType, Language, WebsiteShowLanguage } from '@/types'

/**
 * Login
 */
export const Login = `${ID_PREFIX}/do/off/ui/auth/login/post/bb5df85216504820be7bba2b0ae1535b/0?/login.do`

/**
 * Learn Auth
 * @param ticket for query
 */
export const LearnAuth = (ticket: string) => `${LEARN_PREFIX}/b/j_spring_security_thauth_roaming_entry?ticket=${ticket}`

/**
 * Learn Login
 * @param ticket for query
 */
export const LearnLogin = (ticket: string) => `${LEARN_PREFIX}/f/login.do?status=SUCCESS&ticket=${ticket}`

/**
 * Logout form Learn website
 */
export const Logout = `${LEARN_PREFIX}/f/j_spring_security_logout`

/**
 * home page for learn website
 * if you are a student, you can get your course list
 * @param identityType - default 'student' as {@link IdentityType}
 */
export const HomePage = (identityType: IdentityType = 'student') => `${LEARN_PREFIX}/f/wlxt/index/course/${identityType}/`

/**
 * Semester List
 */
export const SemesterList = `${LEARN_PREFIX}/b/wlxt/kc/v_wlkc_xs_xktjb_coassb/queryxnxq`

/**
 * Current Semester
 */
export const CurrentSemester = `${LEARN_PREFIX}/b/kc/zhjw_v_code_xnxq/getCurrentAndNextSemester`

/**
 * Student Course List
 * @param semester
 * @param lang - default 'zh' as {@link Language}
 */
export const StuCoursesList = (semester: string, lang: Language = 'zh') => `${LEARN_PREFIX}/b/wlxt/kc/v_wlkc_xs_xkb_kcb_extend/student/loadCourseBySemesterId/${semester}/${lang}`

/**
 * Teacher Course List
 * @param semester
 */
export const TeaCoursesList = (semester: string) => `${LEARN_PREFIX}/b/kc/v_wlkc_kcb/queryAsorCoCourseList/${semester}/0`

/**
 * Course Page
 * @param courseId
 * @param identityType
 */
export const CoursePage = (courseId: string | number, identityType: IdentityType) => `${LEARN_PREFIX}/f/wlxt/index/course/${identityType}/course?wlkcid=${courseId}`

/**
 * Course Time
 * @param courseId
 */
export const CourseTime = (courseId: string | number) => `${LEARN_PREFIX}/b/kc/v_wlkc_xk_sjddb/detail?id=${courseId}`

/**
 * Student File List
 * @param courseId
 * @param maxSize default {@link MAX_SIZE}
 */
export const StuFileList = (courseId: string | number, maxSize = MAX_SIZE) => `${LEARN_PREFIX}/b/wlxt/kj/wlkc_kjxxb/student/kjxxbByWlkcidAndSizeForStudent?wlkcid=${courseId}&size=${maxSize}`

/**
 * Student file download
 * @param fileId
 */
export const StuFileDownload = (fileId: string | number) => `${LEARN_PREFIX}/b/wlxt/kj/wlkc_kjxxb/student/downloadFile?sfgk=0&wjid=${fileId}`

/**
 * Teacher File List
 * @param courseId
 * @param maxSize default {@link MAX_SIZE}
 */
export const TeaFileList = (courseId: string | number, maxSize = MAX_SIZE) => `${LEARN_PREFIX}/b/wlxt/kj/v_kjxxb_wjwjb/teacher/queryByWlkcid?wlkcid=${courseId}&size=${maxSize}`

/**
 * Teacher file download
 * @param fileId
 * @param courseId
 */
export const TeaFileDownload = (fileId: string | number, courseId: string | number) => `${LEARN_PREFIX}/f/wlxt/kj/wlkc_kjxxb/teacher/beforeView?id=${fileId}&wlkcid=${courseId}`

// ! TODO
// export function LEARN_FILE_PREVIEW(type: ContentType, fileID: string, identityType: identityType, firstPageOnly = false) {
//   return `${LEARN_PREFIX}/f/wlxt/kc/wj_wjb/${identityType}/beforePlay?wjid=${fileID}&mk=${getMkFromType(
//     type,
//   )}&browser=-1&sfgk=0&pageType=${firstPageOnly ? 'first' : 'all'}`
// }

// export const FilePreview = (type: identityType, fileId: string | number, identityType: identityType, firstPageOnly = false) => `${LEARN_PREFIX}/f/wlxt/kc/wj_wjb/${identityType}/beforePlay?wjid=${fileID}&mk=${getMkFromType(
//     type,
//   )}&browser=-1&sfgk=0&pageType=${firstPageOnly ? 'first' : 'all'}`

/**
 * Student Notification List
 * @param courseId
 * @param maxSize default {@link MAX_SIZE}
 */
export const StuNotificationList = (courseId: string | number, maxSize = MAX_SIZE) => `${LEARN_PREFIX}/b/wlxt/kcgg/wlkc_ggb/student/kcggListXs?wlkcid=${courseId}&size=${maxSize}`

/**
 * Teacher Notification List
 * @param courseId
 * @param maxSize default {@link MAX_SIZE}
 */
export const TeaNotificationList = (courseId: string | number, maxSize = MAX_SIZE) => `${LEARN_PREFIX}/b/wlxt/kcgg/wlkc_ggb/teacher/kcggList?wlkcid=${courseId}&size=${maxSize}`

/**
 * Student Notification Detail
 * @param courseId
 * @param notificationId
 */
export const StuNotificationDetail = (courseId: string | number, notificationId: string | number) => `${LEARN_PREFIX}/f/wlxt/kcgg/wlkc_ggb/student/beforeViewXs?wlkcid=${courseId}&id=${notificationId}`

/**
 * Teacher Notification Detail
 * @param courseId
 * @param notificationId
 */
export const TeaNotificationDetail = (courseId: string | number, notificationId: string | number) => `${LEARN_PREFIX}/f/wlxt/kcgg/wlkc_ggb/teacher/beforeViewJs?wlkcid=${courseId}&id=${notificationId}`

/**
 * Notification Edit
 */
export const NotificationEdit = (identityType: IdentityType) => `${LEARN_PREFIX}/b/wlxt/kcgg/wlkc_ggb/${identityType}/editKcgg`

// ! TODO
// export function LEARN_HOMEWORK_LIST_SOURCE(courseID: string) {
//   return [
//     {
//       url: LEARN_HOMEWORK_LIST_NEW(courseID),
//       status: {
//         submitted: false,
//         graded: false,
//       },
//     },
//     {
//       url: LEARN_HOMEWORK_LIST_SUBMITTED(courseID),
//       status: {
//         submitted: true,
//         graded: false,
//       },
//     },
//     {
//       url: LEARN_HOMEWORK_LIST_GRADED(courseID),
//       status: {
//         submitted: true,
//         graded: true,
//       },
//     },
//   ]
// }
// LEARN_HOMEWORK_LIST_SOURCE

/**
 * Student Homework List New
 * @param courseId
 * @param maxSize default {@link MAX_SIZE}
 */
export const StuHomeworkListNew = (courseId: string | number, maxSize = MAX_SIZE) => `${LEARN_PREFIX}/b/wlxt/kczy/zy/student/index/zyListWj?wlkcid=${courseId}&size=${maxSize}`

/**
 * Student Homework List Submitted
 * @param courseId
 * @param maxSize default {@link MAX_SIZE}
 */
export const StuHomeworkListSubmitted = (courseId: string | number, maxSize = MAX_SIZE) => `${LEARN_PREFIX}/b/wlxt/kczy/zy/student/index/zyListYjwg?wlkcid=${courseId}&size=${maxSize}`

/**
 * Student Homework List Graded
 * @param courseId
 * @param maxSize default {@link MAX_SIZE}
 */
export const StuHomeworkListGraded = (courseId: string | number, maxSize = MAX_SIZE) => `${LEARN_PREFIX}/b/wlxt/kczy/zy/student/index/zyListYpg?wlkcid=${courseId}&size=${maxSize}`

/**
 * Student Homework Detail
 * @param courseId
 * @param homeworkId
 * @param stuHomeworkId
 */
export const StuHomeworkDetail = (courseId: string | number, homeworkId: string | number, stuHomeworkId: string | number) => `${LEARN_PREFIX}/f/wlxt/kczy/zy/student/viewCj?wlkcid=${courseId}&zyid=${homeworkId}&xszyid=${stuHomeworkId}`

/**
 * Student Homework download
 * @param courseId
 * @param attachmentId
 */
export const StuHomeworkDownload = (courseId: string | number, attachmentId: string | number) => `${LEARN_PREFIX}/b/wlxt/kczy/zy/student/downloadFile/${courseId}/${attachmentId}`

/**
 * Student Homework submit page
 * @param courseId
 * @param stuHomeworkId
 */
export const StuHomeworkSubmit = (courseId: string | number, stuHomeworkId: string | number) => `${LEARN_PREFIX}/f/wlxt/kczy/zy/student/tijiao?wlkcid=${courseId}&xszyid=${stuHomeworkId}`

/**
 * Student Homework submit
 */
export const StuHomeworkSubmitPost = `${LEARN_PREFIX}/b/wlxt/kczy/zy/student/tjzy`

// ! TODO
// export function LEARN_HOMEWORK_SUBMIT_FORM_DATA(studentHomeworkID: string, content = '', attachment?: IHomeworkSubmitAttachment, removeAttachment = false) {
//   const form = new FormData()
//   form.append('xszyid', studentHomeworkID)
//   form.append('zynr', content ?? '')
//   if (attachment)
//     form.append('fileupload', attachment.content, attachment.filename)
//   else form.append('fileupload', 'undefined')
//   if (removeAttachment)
//     form.append('isDeleted', '1')
//   else form.append('isDeleted', '0')
//   return form
// }

/**
 * Teacher Homework List
 * @param courseId
 * @param maxSize default {@link MAX_SIZE}
 */
export const TeaHomeworkList = (courseId: string | number, maxSize = MAX_SIZE) => `${LEARN_PREFIX}/b/wlxt/kczy/zy/teacher/index/pageList?wlkcid=${courseId}&size=${maxSize}`

/**
 * Teacher Homework Detail
 * @param courseId
 * @param homeworkId
 */
export const TeaHomeworkDetail = (courseId: string | number, homeworkId: string | number) => `${LEARN_PREFIX}/f/wlxt/kczy/xszy/teacher/beforePageList?zyid=${homeworkId}&wlkcid=${courseId}`

/**
 * Discussion List
 * @param courseId
 * @param maxSize default {@link MAX_SIZE}
 * @param identityType
 */
export const DiscussionList = (courseId: string | number, maxSize = MAX_SIZE, identityType: IdentityType) => `${LEARN_PREFIX}/b/wlxt/bbs/bbs_tltb/${identityType}/kctlList?wlkcid=${courseId}&size=${maxSize}`

/**
 * Discussion Detail
 * @param courseId
 * @param boardId
 * @param discussionId
 * @param identityType
 * @param tabId
 */
export const DiscussionDetail = (courseId: string | number, boardId: string | number, discussionId: string | number, identityType: IdentityType, tabId: string | number = 1) => `${LEARN_PREFIX}/f/wlxt/bbs/bbs_tltb/${identityType}/viewTlById?wlkcid=${courseId}&id=${discussionId}&tabbh=${tabId}&bqid=${boardId}`

/**
 * Question List Answered
 * @param courseId
 * @param identityType
 * @param maxSize default {@link MAX_SIZE}
 */
export const QuestionListAnswered = (courseId: string | number, identityType: IdentityType, maxSize = MAX_SIZE) => `${LEARN_PREFIX}/b/wlxt/bbs/bbs_tltb/${identityType}/kcdyList?wlkcid=${courseId}&size=${maxSize}`

/**
 * Student Question Detail
 * @param courseId
 * @param questionId
 */
export const StuQuestionDetail = (courseId: string | number, questionId: string | number) => `${LEARN_PREFIX}/f/wlxt/bbs/bbs_kcdy/student/viewDyById?wlkcid=${courseId}&id=${questionId}`

/**
 * Teacher Question Detail
 * @param courseId
 * @param questionId
 */
export const TeaQuestionDetail = (courseId: string | number, questionId: string | number) => `${LEARN_PREFIX}/f/wlxt/bbs/bbs_kcdy/teacher/beforeEditDy?wlkcid=${courseId}&id=${questionId}`

/**
 * Website Show Language
 * @param lang default 'zh_CN' as {@link WebsiteShowLanguage}
 */
export const WebsiteShowLang = (lang: WebsiteShowLanguage = 'zh_CN') => `${LEARN_PREFIX}/f/wlxt/common/language?websiteShowLanguage=${lang}`

/**
 * Registrar Ticket
 */
export const RegistrarTicket = `${LEARN_PREFIX}/b/wlxt/common/auth/gnt`

/**
 * Registrar Auth
 * @param ticket for query
 */
export const RegistrarAuth = (ticket: string) => `${REGISTRAR_PREFIX}/j_acegi_login.do?url=/&ticket=${ticket}`

// ! TODO
// export function REGISTRAR_TICKET_FORM_DATA() {
//   const form = new FormData()
//   form.append('appId', 'ALL_ZHJW')
//   return form
// }

// export function REGISTRAR_CALENDAR(startDate: string, endDate: string, graduate = false, callbackName = 'unknown') {
//   return `${REGISTRAR_PREFIX}/jxmh_out.do?m=${
//     graduate ? 'yjs' : 'bks'
//   }_jxrl_all&p_start_date=${startDate}&p_end_date=${endDate}&jsoncallback=${callbackName}`
// }
