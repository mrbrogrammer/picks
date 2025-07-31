import { render } from "@testing-library/react";
import Filter from "../components/Filter";

describe("Test filter Component", () => {
    it("renders correctly", () => {
        const result = render(<Filter onTextChange={() => {}} />);
        expect(result).toMatchSnapshot();
    });
});