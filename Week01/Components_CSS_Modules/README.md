# External Libraries: CSS Modules and Material Design Icons

Today we wilk be creating a simple recipe card with JSX, breaking it down into atomic components, and passing our content in via data and props. Before we move on, let's take a few minutes together to sync up on our recipe cards and styling.

### In Class Exercise 1: Applying vanilla CSS.

- Review project boilerplatee
- Review figma design
- Apply styles and elements to match the card design together

## CSS Modules

We have created a relatively simple project but we already have quite a few files to keep track of. Naming things, whether they be variables, components, or class names is always a bear. In order to keep things scoped and keep our lives a little easier we can use [CSS Modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/) (already installed via `create-react-app`).

Wow, this is great! We can avoid long rambling class names and still target the desired elements while ignoring the others. No more naming clash!

### Converting our stylesheet to CSS Modules

- Update our stylesheet file names
- Add global styles
- Add css variable for commonly used colors, fonts, spacing, etc

This may seem overkill for a small sandbox project like our recipe card, but we can imagine how scoping our CSS can help with larger projects (like the documentation example `.error`). Variables will also help facilitate a design conversation and allow for less tedious sitewide changes. For example: what if we discovered our main color blue that we use across the website is not colorblind safe and we need to overhaul and replace all instances of them? Changing one line of one file sure beats finding and replacing across an entire code ecosystem.


## Hello State: Updating our content based on user input and events

Now we can start looking into what makes react really shine. Dynamic content updates based on events and state changes. In this next in class coding exercise we will add a rating system to our recipe card.

**State** is data that changes when the user interacts with the app. When there is a change in state React will automatically update the content on the screen.We are going to use state everywhere as we progress. The point of react is to update content on the screen based on user interactions!

**useState** defines pieces of state. we need to define a default value for each peice of state.

**setState** updates pieces of state when a user does something.

We can update our screen based on our updates in state! React re-renders the component, _not_ the entire page.

- Discuss [events and handlers](https://react.dev/learn/responding-to-events#adding-event-handlers)
  - heart variable starting at 0
  - add 1 to heart when a user clicks +, subtract 1 to heart when a user clicks -
  - update the content on the screen after a user click
- Build out our JSX rating component
  - plus/minus buttons with event handlers
  - an empty space to render the heart count
  - some sort of heart icon to render
- A quick pass at styling
- Add a state object to our <UserRating /> component
- Add/Remove stars based on user interaction

Now that we have our hearts rendering as HTML entities, lets install material design icons and use those svgs as well!

To install Material Design Icons: `npm install @material-design-icons/svg@latest`
To Use:

```jsx
import {ReactComponent as Heart} from '@material-design-icons/svg/filled/favorite.svg'
...
<Heart />
```

### Homework / In Class Continued

#### Current Project:

- Hide/Show [+] and [-] buttons based on current count. For example if we have 5 stars, hide the [+] button since we cannot add any more
- Update the styling so that the hearts and button locations do not jump as things hide/show
- Add a header and wrapper element to the page to make it look more like an app or webpage
- Make sure you are up to date with your assignments and understand class notes and exercises up until this point before next week. Next week we will play a little more with State before diving in to Redux!
