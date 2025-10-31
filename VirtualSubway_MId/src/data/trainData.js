import icon4 from '../assets/4.png'
import icon5 from '../assets/5.png'
import icon6 from '../assets/6.png'

const TRAIN_DATA = {
  4: {
    lineNumber: 4,
    icon: icon4,
    title: 'Lexington Avenue Express',
    description: "Running from the Bronx all the way down to Brooklyn, the 4 train feels like time in motion. It speeds along the city's spine, through light, tunnels, and the pulse of countless commuters. Direct and restless, it carries the rhythm of New York itself.",
    route: 'Woodlawn (Bronx) → Crown Heights–Utica Av (Brooklyn)',
    mood: "The city's heartbeat — fast, urgent, unstoppable"
  },
  5: {
    lineNumber: 5,
    icon: icon5,
    title: 'Lexington Avenue Express',
    description: "The 5 train runs the same rails every day, the same sounds, the same rhythm, yet no two mornings ever feel alike. It's the train of routine and return, carrying workers, students, and fragments of stories that shift with each rush hour. There's order here, but also warmth, the quiet pulse of repetition.",
    route: 'Dyre Av (Bronx) or East Chester–241 St → Bowling Green or Flatbush Av–Brooklyn College',
    mood: "The commuter's train — structured, familiar, quietly human"
  },
  6: {
    lineNumber: 6,
    icon: icon6,
    title: 'Lexington Avenue Local',
    description: "Closer to the street and sky, the 6 train moves at its own pace. It glides through the East Side and the Bronx, offering glimpses of light between tunnels and windows. It's the observer's line, steady, patient, never in a rush to arrive.",
    route: 'Pelham Bay Park (Bronx) → Brooklyn Bridge–City Hall (Manhattan)',
    mood: "The quiet line — reflective, slower, softly human"
  }
}

export { TRAIN_DATA }   