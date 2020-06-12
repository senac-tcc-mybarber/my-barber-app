import {Namer} from "../namer";

describe("Namer getName function return value", () => {
    it("Should be define.", () => {
        const namer = new Namer();
        expect(namer.getName()).toBeDefined("The function getName() should be defined.");
    });

    it("Should't return blank.", () => {
        const namer = new Namer();
        expect(namer.getName()).not.toEqual("", "The function getName() should return the name.");
    });

    it("Should return 'MyName'.", () => {
        const namer = new Namer();
        expect(namer.getName()).toMatch("MyName");
    });
})