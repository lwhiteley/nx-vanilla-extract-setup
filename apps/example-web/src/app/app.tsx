import { container } from './app.css';
import NxWelcome from './nx-welcome';

export function App() {
  return (
    <div className={container}>
      <NxWelcome title="example-web" />
      <div />
    </div>
  );
}

export default App;
