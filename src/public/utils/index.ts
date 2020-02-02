/**
 * 延迟执行
 * @param func 
 * @param timeout 
 */
export function delay(timeout: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  })
}