function ServiceError(code: number, message: string): Error {
    return new Error(message); // Simple example, should be your actual implementation
  }

module.exports = { ServiceError };
