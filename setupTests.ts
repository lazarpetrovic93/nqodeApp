import "@testing-library/jest-dom";

global.crypto = {
    ...crypto,
    randomUUID: () => "mocked-uuid",
};