/**
 * This function is only for testing purposes
 */
export default async function test() {
  return {
    message: 'Test Successfully',
    data: new Date().toISOString(),
    status: true,
  }
}

export { test }
