# React Testing Tutorial Notes

## Useful Links

[Expect - Jest](https://jestjs.io/docs/expect)

[ByRole | Testing Library](https://testing-library.com/docs/queries/byrole/)

[Document conformance requirements for use of ARIA attributes in HTML](https://www.w3.org/TR/html-aria/#docconformance)

[Cheatsheet | Testing Library](https://testing-library.com/docs/react-testing-library/cheatsheet/)

## What to test ?

- Test component renders
- Test component renders with props
- Test component renders in different states
- Test component reacts to events

## What not to test ?

- Implementation details
- Third party code
- Code that is not important from a user point of view

## Priority Order for Queries

"Your test should resemble how users interact with your code (component, page, etc.) as much as possible"

1. getByRole (you can filter elements by name)
2. getByLabelText (good for form fields)
3. getByPlaceholderText
4. getByText (for non-interactive elements; div, span, paragraphs)
5. getByDisplayValue (current value of a form element)
6. getByAltText (image, area, input)
7. getByTitle
8. getByTestId

## queryBy and queryAllBy

### queryBy

- Returns the matching node for a query, and return null if no elements match
- Useful for asserting an element that is not present
- Throws an error if more than one match is found

### queryAllBy

- Returns an array of all matching nodes for a query, and return an empty array if no elements match

## findBy and findAllBy

### findBy

- Returns a Promise which resolves when an element is found which matches the given query
- The promise is rejected if no element is found or if more than one element is found after a default timeout of 1000ms

### findAllBy

- Returns a promise which resolves to an array of elements when any elements are found which match the given query
- The promise is rejected if no elements are found after a default timeout of 1000ms
