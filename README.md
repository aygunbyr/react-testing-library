# React Testing Tutorial Notes

## Useful Links

[Expect - Jest](https://jestjs.io/docs/expect)

[ByRole | Testing Library](https://testing-library.com/docs/queries/byrole/)

[Document conformance requirements for use of ARIA attributes in HTML](https://www.w3.org/TR/html-aria/#docconformance)

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
