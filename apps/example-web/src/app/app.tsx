import { Components } from '@vanilla/components';
import { container } from './app.css';
import NxWelcome from './nx-welcome';

export function App() {
  return (
    <div className={container}>
      <NxWelcome title="example-web" />
      <Components />
      <div />
    </div>
  );
}

export default App;
