/**
 * @jest-environment jsdom
 */


import { handleSubmit } from "../formHandler";


describe("Test: 'handleSubmit()' from formHandler", () => {
    test('Should be defined', () => {
        expect(handleSubmit).toBeDefined();
    });

    test('Should be a function', () => {
        expect(typeof handleSubmit).toBe("function");
    });
});
