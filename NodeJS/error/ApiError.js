class ApiError extends Error {
  constructor(message, status) {
    super(message);

    this.status = status;

    Error.captureStackTrace(this, this.constructor); // Таким чином робимо captureStackTrace
    // для того щоб бачити в якому місці падає помилка і що за чим падає
  }
}

module.exports = ApiError;