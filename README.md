# React Testing Tutorial Notes

These notes have been taken while following React Testing Tutorial. I have been just taking notes that I need. It may not be helpful for you.

## Useful Links

[React Testing Tutorial - YouTube](https://www.youtube.com/playlist?list=PLC3y8-rFHvwirqe1KHFCHJ0RqNuN61SJd)

[Expect - Jest](https://jestjs.io/docs/expect)

[ByRole | Testing Library](https://testing-library.com/docs/queries/byrole/)

[Document conformance requirements for use of ARIA attributes in HTML](https://www.w3.org/TR/html-aria/#docconformance)

[Cheatsheet | Testing Library](https://testing-library.com/docs/react-testing-library/cheatsheet/)

[Testing Playground Chrome Extension](https://chrome.google.com/webstore/detail/testing-playground/hejbmebodbijjdhflfknehhcgaklhano)

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

## User Interactions

A click using a mouse or a keypress using a keyboard

Software has to respond to such interactions

Test should ensure the interactions are handled as expected

### user-event

A companion library for Testing Library that simulates user interactions by dispatching the events that would happen if the interaction took place in a browser

It is the recommended way to test user interactions with RTL

### fireEvent vs user-event

fireEvent is a method from RTL which is used to dispatch DOM events

user-event simulates full interactions, which may fire multiple events and do additional checks along the way

For example, we can dispatch the change event on an input field using fireEvent

When a user types into a text box, the element has to be focused, and then keyboard and input events are fired and the selection and value on the element are manipulated as they type

user-event allows you to describe a user interaction instead of a concrete event. It adds visibility and intractability checks along the way and manipulates the DOM just like a user interaction in the browser would. It factors in that the browser e.g. wouldn't let a user click a hidden element or type in a disabled text box

### Update the package @testing-library/user-event

CRA installs user-event but needs upgrading

userEvent.setup() was introduced in v14.

```
npm install @testing-library/user-event@latest
```

### Pointer Interactions

#### Convenience APIs (much easier to read and write)

- click()
- dblClick()
- tripleClick()
- hover()
- unhover()

#### Pointer APIs

- pointer({keys: '[MouseLeft]'})
- pointer({keys: '[MouseLeft][Mouseright]'})
- pointer('[MouseLeft][Mouseright]')
- pointer('[MouseLeft>]') (without releasing button)
- pointer('[/MouseLeft]') (releasing previously pressed button)

### Keyboard Interactions

#### Utility API

- clear()

```js
test('clear', async () => {
  render(<textarea defaultValue="Hello, World!" />);
  await userEvent.clear(screen.getByRole('textbox'));
  expect(screen.getByRole('textbox')).toHaveValue('');
});
```

- selectOptions()

```js
test('selectOptions', async () => {
  render(
    <select multiple>
      <option value="1">A</option>
      <option value="2">B</option>
      <option value="3">C</option>
    </select>
  );
  await userEvent.selectOptions(screen.getByRole('listbox'), ['1', 'C']);
  expect(screen.getByRole('option', { name: 'A' }).selected).toBe(true);
  expect(screen.getByRole('option', { name: 'B' }).selected).toBe(false);
  expect(screen.getByRole('option', { name: 'C' }).selected).toBe(true);
});
```

- deselectOptions()

```js
test('deselectOptions', async () => {
  render(
    <select multiple>
      <option value="1">A</option>
      <option value="2" selected>
        B
      </option>
      <option value="3">C</option>
    </select>
  );
  await userEvent.deselectOptions(screen.getByRole('listbox'), '2');
  expect(screen.getByText('B').selected).toBe(false);
});
```

- upload()

```js
test('upload file', async () => {
  render(
    <div>
      <label htmlFor="file-uploader">Upload file:</label>
      <input id="file-uploader" type="file" />
    </div>
  );
  const file = new File(['hello'], 'hello.png', { type: 'image/png}' });
  const input = screen.getByLabelText(/upload file/i);
  await userEvent.upload(input, file);
  expect(input.files[0].toBe(file));
  expect(input.files.item(0)).toBe(file);
  expect(input.files).toHaveLength(1);
});
```

#### Clipboard APIs

- copy()
- cut()
- paste()

#### Keyboard API

- keyboard('foo') // translates to: f, o, o
- keyboard('{Shift>}A{/Shift}') // translates to: Shift(down), A, Shift(up)
