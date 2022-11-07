/**
 * 
 * @param message {string} Ex. INTERNAL_SERVER_ERROR, SUCCESS...
 * @param data {any} Ex. {name : 'Joh Doe', age : 21}...
 * @returns {message: string | null; data: any;}
 */
export function sendOutput(message, data = null) {
  return {
    message: message,
    data: data
  }
}