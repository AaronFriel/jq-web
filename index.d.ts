/**
 * Processes JSON data using a jq filter and returns the result as JavaScript objects.
 * @param json The input JSON data as a JavaScript object.
 * @param filter The jq filter to apply.
 * @returns The filtered result as a JavaScript object or array of objects.
 */
export async function json(json: any, filter: string): Promise<any>;

/**
 * Processes a JSON string using a jq filter and returns the result as a string.
 * @param jsonstring The input JSON data as a string.
 * @param filter The jq filter to apply.
 * @param flags Optional array of command-line flags for jq.
 * @returns The filtered result as a string.
 * @throws Will throw an error if jq encounters an error or returns a non-zero exit code.
 */
export async function raw(jsonstring: string, filter: string, flags?: string[]): Promise<string>;

export namespace promised {
  /**
   * Processes JSON data using a jq filter and returns the result as JavaScript objects.
   * @param json The input JSON data as a JavaScript object.
   * @param filter The jq filter to apply.
   * @returns The filtered result as a JavaScript object or array of objects.
   */
  export async function json(json: any, filter: string): Promise<any>;

  /**
   * Processes a JSON string using a jq filter and returns the result as a string.
   * @param jsonstring The input JSON data as a string.
   * @param filter The jq filter to apply.
   * @param flags Optional array of command-line flags for jq.
   * @returns The filtered result as a string.
   * @throws Will throw an error if jq encounters an error or returns a non-zero exit code.
   */
  export async function raw(jsonstring: string, filter: string, flags?: string[]): Promise<string>;
}
