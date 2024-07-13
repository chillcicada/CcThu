import type { BaseResponse, HomeworkSubmitAttachment, UseConfig } from '@/types'
import { StuHomeworkSubmitPost } from '@/urls/learn'
import { fetchWithRetry, useError, useFail } from '@/utils'

/**
 * Homework submit parameters for query
 */
const HomeworkSubmitFormBody = {
  studentHomeworkID: 'xszyid',
  content: 'zynr',
  attachment: 'fileupload',
  removeAttachment: 'isDeleted',
} as const

/**
 * Homework submit configuration
 * @param attachment - The attachment to submit
 * @param removeAttachment - The flag to remove the attachment
 * @param content - The content to submit
 * @param studentHomeworkID - The student homework ID to submit
 */
export interface HomeworkSubmitConfig {
  attachment: HomeworkSubmitAttachment
  removeAttachment: boolean
  content: string
  studentHomeworkID: string
}

/**
 *
 */
export default async function submitHomework(cfg: UseConfig<HomeworkSubmitConfig> = {}): Promise<BaseResponse> {
  try {
    if (cfg instanceof Promise)
      cfg = await cfg

    const {
      attachment,
      removeAttachment = false,
      content = '',
      studentHomeworkID,
    } = cfg

    if (!studentHomeworkID)
      return useFail('Fail to get calendar!')

    const form = new FormData()

    form.append(HomeworkSubmitFormBody.studentHomeworkID, studentHomeworkID)
    form.append(HomeworkSubmitFormBody.content, content)
    attachment
      ? form.append(HomeworkSubmitFormBody.attachment, attachment.content, attachment.filename)
      : form.append(HomeworkSubmitFormBody.attachment, 'undefined')
    form.append(HomeworkSubmitFormBody.removeAttachment, removeAttachment ? '1' : '0')

    const res = await fetchWithRetry(StuHomeworkSubmitPost, {
      method: 'POST',
      body: form,
    }).then(res => res.json())

    return {
      status: true,
      data: res,
      message: 'Homework submitted successfully',
    }
  }
  catch (e) { return useError(e, 'Submit homework error!') }
}

export { submitHomework }
