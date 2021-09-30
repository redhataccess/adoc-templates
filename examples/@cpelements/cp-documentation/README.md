# PatternFly Element for Red Hat Customer Portal | Documentation element
Encapsulate customer portal documentation content, styles it in a way that doesn't get contaminated from the parent DOM styles, and the content may be loaded dynamically from an API (this feature is in alpha, waiting for the FCC project to make assemblies API).

## Usage
Intended use is to wrap the body of documentation content that should be styled by rhdocs.css.

```html
<cp-documentation>
    <!-- Default slot -->
    <h2>Documentation content compiled from AsciiDoc.</h2>
</cp-documentation>
```

## Public Methods

`cpDocumentation.loadData()`
Tells component to load data from the pfe-endpoint URL.

`cpDocumentation.getData()`
Returns the module data from the endpoint.

## Slots
This element takes all content inside of it, does NOT put it into a slot, and copies it into the shadow DOM to protect it from outside styles.

## Attributes

- `pfe-loaded`: @todo ALPHA Used to indicate that the correct content has already been loaded (dynamically from an endpoint, or server side)
- `pfe-endpoint`: @todo ALPHA The URL to get the content from, the component makes assumptions about how the response is structured.
- `pfe-css`: The URL of CSS that should be inserted into the shadow DOM.

## Events
Events have not been implemented yet.

### cp-documentation:change
@todo

### cp-documentation:loaded
@todo

### Accessibility
This wraps content, it doesn't do anything that enhances or gets in the way of accessibility.

## Dependencies
None

## Dev

    `npm start`

## Test

    `npm run test`

## Build

    `npm run build`

## Demo

From the PFElements root directory, run:

    `npm run demo`

## Code style

Documentation (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
