package com.edutech.exception;

/** User defined business exception (400 by default; 404 not found; 409 conflict). */
public class UserException extends Exception {
    private final int status;

    public UserException(String message) { this(message, 400); }

    public UserException(String message, int status) {
        super(message);
        this.status = status;
    }

    public int getStatus() { return status; }
}
